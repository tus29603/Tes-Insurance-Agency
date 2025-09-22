import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import dbConnection from '../database/connection.js';
import { validateUser } from '../middleware/validation.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Register admin user
router.post('/register', validateUser, async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    
    // Check if user already exists
    const existingUser = dbConnection.prepare(`
      SELECT id FROM users WHERE email = ?
    `).get(email);
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User already exists'
      });
    }
    
    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const insertUser = dbConnection.prepare(`
      INSERT INTO users (email, password_hash, first_name, last_name, role)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = insertUser.run(email, passwordHash, first_name, last_name, 'admin');
    
    res.status(201).json({
      success: true,
      data: {
        user_id: result.lastInsertRowid,
        message: 'Admin user created successfully'
      }
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create admin user'
    });
  }
});

// Login admin user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    // Get user
    const user = dbConnection.prepare(`
      SELECT id, email, password_hash, first_name, last_name, role, is_active
      FROM users WHERE email = ?
    `).get(email);
    
    if (!user || !user.is_active) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Update last login
    const updateLogin = dbConnection.prepare(`
      UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?
    `);
    updateLogin.run(user.id);
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        user_id: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to login'
    });
  }
});

// Get dashboard stats
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    // Get lead counts by status
    const leadStatsQuery = `
      SELECT 
        status,
        COUNT(*) as count
      FROM leads
      GROUP BY status
    `;
    const leadStats = dbConnection.prepare(leadStatsQuery).all();
    
    // Get recent leads
    const recentLeadsQuery = `
      SELECT 
        lead_id,
        name,
        email,
        coverage_type,
        status,
        created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 10
    `;
    const recentLeads = dbConnection.prepare(recentLeadsQuery).all();
    
    // Get contact message counts
    const contactStatsQuery = `
      SELECT 
        status,
        COUNT(*) as count
      FROM contact_messages
      GROUP BY status
    `;
    const contactStats = dbConnection.prepare(contactStatsQuery).all();
    
    // Get analytics summary
    const analyticsQuery = `
      SELECT 
        event_type,
        COUNT(*) as count
      FROM analytics_events
      WHERE created_at >= datetime('now', '-7 days')
      GROUP BY event_type
      ORDER BY count DESC
    `;
    const analyticsStats = dbConnection.prepare(analyticsQuery).all();
    
    res.json({
      success: true,
      data: {
        leads: {
          stats: leadStats,
          recent: recentLeads
        },
        contacts: {
          stats: contactStats
        },
        analytics: analyticsStats
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data'
    });
  }
});

// Get system health
router.get('/health', authMiddleware, async (req, res) => {
  try {
    const dbHealth = dbConnection.healthCheck();
    
    res.json({
      success: true,
      data: {
        database: dbHealth,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error checking system health:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check system health'
    });
  }
});

export default router;
