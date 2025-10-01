import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import crypto from 'crypto';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Simple UUID generator
function generateUUID() {
  return crypto.randomUUID ? crypto.randomUUID() : 
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

// Database setup
let db;
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    // Ensure data directory exists
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dbPath = process.env.DATABASE_URL || path.join(dataDir, 'insurance.db');
    db = new sqlite3.Database(dbPath);
    
    console.log(`📊 Connected to database: ${dbPath}`);
    
    // Create tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lead_id VARCHAR(36) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        zip_code VARCHAR(10) NOT NULL,
        coverage_type VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        source VARCHAR(100) DEFAULT 'website',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quote_id VARCHAR(36) UNIQUE NOT NULL,
        lead_id VARCHAR(36) NOT NULL,
        carrier_name VARCHAR(100) NOT NULL,
        premium DECIMAL(10,2) NOT NULL,
        coverage_limits TEXT,
        deductibles TEXT,
        effective_date DATE,
        expiration_date DATE,
        status VARCHAR(50) DEFAULT 'pending',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message_id VARCHAR(36) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        priority VARCHAR(20) DEFAULT 'normal',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `, (err) => {
      if (err) {
        console.error('❌ Database initialization failed:', err);
        reject(err);
      } else {
        console.log('✅ Database tables created');
        seedDatabase().then(resolve).catch(reject);
      }
    });
  });
}

// Seed database with sample data
function seedDatabase() {
  return new Promise((resolve) => {
    // Check if data already exists
    db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
      if (err || row.count > 0) {
        console.log('✅ Database already has data');
        resolve();
        return;
      }

      console.log('🌱 Seeding database with sample data...');
      
      // Insert sample users
      const users = [
        ['admin@tesinsurance.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Admin', 'admin'],
        ['agent@tesinsurance.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Sarah', 'Agent', 'agent'],
        ['manager@tesinsurance.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Mike', 'Manager', 'manager']
      ];

      let completed = 0;
      users.forEach(user => {
        db.run('INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)', user, (err) => {
          if (!err) console.log(`✅ Created user: ${user[0]}`);
          completed++;
          if (completed === users.length) {
            console.log('✅ Sample data seeded successfully');
            resolve();
          }
        });
      });
    });
  });
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
  }
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: db ? 'connected' : 'disconnected'
  });
});

// API Routes

// Get all leads
app.get('/api/leads', (req, res) => {
  const { page = 1, limit = 10, status, coverage_type } = req.query;
  const offset = (page - 1) * limit;
  
  let whereClause = 'WHERE 1=1';
  const params = [];
  
  if (status) {
    whereClause += ' AND status = ?';
    params.push(status);
  }
  
  if (coverage_type) {
    whereClause += ' AND coverage_type = ?';
    params.push(coverage_type);
  }
  
  const query = `
    SELECT * FROM leads 
    ${whereClause}
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `;
  
  db.all(query, [...params, limit, offset], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    
    db.get(`SELECT COUNT(*) as total FROM leads ${whereClause}`, params, (err, count) => {
      if (err) {
        res.status(500).json({ error: 'Database error', details: err.message });
        return;
      }
      
      res.json({
        leads: rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count.total,
          pages: Math.ceil(count.total / limit)
        }
      });
    });
  });
});

// Create new lead
app.post('/api/leads', (req, res) => {
  const { name, email, phone, zip_code, coverage_type, notes } = req.body;
  
  if (!name || !email || !phone || !zip_code || !coverage_type) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  
  const leadId = generateUUID();
  const query = `
    INSERT INTO leads (lead_id, name, email, phone, zip_code, coverage_type, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.run(query, [leadId, name, email, phone, zip_code, coverage_type, notes || ''], function(err) {
    if (err) {
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    
    res.status(201).json({
      message: 'Lead created successfully',
      lead_id: leadId,
      id: this.lastID
    });
  });
});

// Get all quotes
app.get('/api/quotes', (req, res) => {
  const query = `
    SELECT q.*, l.name as lead_name, l.email as lead_email
    FROM quotes q
    JOIN leads l ON q.lead_id = l.lead_id
    ORDER BY q.created_at DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    
    res.json({ quotes: rows });
  });
});

// Create new quote
app.post('/api/quotes', (req, res) => {
  const { lead_id, carrier_name, premium, coverage_limits, deductibles, effective_date, expiration_date, notes } = req.body;
  
  if (!lead_id || !carrier_name || !premium) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  
  const quoteId = generateUUID();
  const query = `
    INSERT INTO quotes (quote_id, lead_id, carrier_name, premium, coverage_limits, deductibles, effective_date, expiration_date, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.run(query, [
    quoteId, lead_id, carrier_name, premium,
    JSON.stringify(coverage_limits || {}),
    JSON.stringify(deductibles || {}),
    effective_date, expiration_date, notes || ''
  ], function(err) {
    if (err) {
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    
    res.status(201).json({
      message: 'Quote created successfully',
      quote_id: quoteId,
      id: this.lastID
    });
  });
});

// Get all contact messages
app.get('/api/contact', (req, res) => {
  const query = 'SELECT * FROM contact_messages ORDER BY created_at DESC';
  
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    
    res.json({ messages: rows });
  });
});

// Create new contact message
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message, priority = 'normal' } = req.body;
  
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  
  const messageId = generateUUID();
  const query = `
    INSERT INTO contact_messages (message_id, name, email, subject, message, priority)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  db.run(query, [messageId, name, email, subject || '', message, priority], function(err) {
    if (err) {
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    
    res.status(201).json({
      message: 'Contact message sent successfully',
      message_id: messageId,
      id: this.lastID
    });
  });
});

// Analytics endpoint
app.post('/api/analytics/track', (req, res) => {
  const { event_type, event_category, event_label, event_value, page_url, session_id } = req.body;
  
  if (!event_type) {
    res.status(400).json({ error: 'Missing event_type' });
    return;
  }
  
  res.json({
    message: 'Event tracked successfully',
    event_id: generateUUID()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
    timestamp: new Date().toISOString()
  });
});

// Start server
async function startServer() {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Tes Insurance Backend API running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`📋 API endpoints:`);
      console.log(`   - GET  /health`);
      console.log(`   - GET  /api/leads`);
      console.log(`   - POST /api/leads`);
      console.log(`   - GET  /api/quotes`);
      console.log(`   - POST /api/quotes`);
      console.log(`   - GET  /api/contact`);
      console.log(`   - POST /api/contact`);
      console.log(`   - POST /api/analytics/track`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  if (db) {
    db.close();
  }
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  if (db) {
    db.close();
  }
  process.exit(0);
});

// Start the server
startServer();
