import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DatabaseConnection {
  constructor() {
    this.db = null;
    this.initialize();
  }

  initialize() {
    try {
      // Ensure data directory exists
      const dataDir = path.join(__dirname, '../../data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Connect to database
      const dbPath = process.env.DATABASE_URL || path.join(dataDir, 'insurance.db');
      this.db = new Database(dbPath);
      
      // Enable foreign keys
      this.db.pragma('foreign_keys = ON');
      
      // Enable WAL mode for better concurrency
      this.db.pragma('journal_mode = WAL');
      
      console.log(`📊 Connected to database: ${dbPath}`);
      
      // Initialize schema
      this.initializeSchema();
      
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  initializeSchema() {
    try {
      const schemaPath = path.join(__dirname, 'schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      // Split schema into individual statements
      const statements = schema
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);
      
      // Execute each statement
      statements.forEach(statement => {
        if (statement.trim()) {
          this.db.exec(statement);
        }
      });
      
      console.log('✅ Database schema initialized');
    } catch (error) {
      console.error('❌ Schema initialization failed:', error);
      throw error;
    }
  }

  getConnection() {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }

  // Transaction helper
  transaction(callback) {
    const transaction = this.db.transaction(callback);
    return transaction;
  }

  // Prepared statement helper
  prepare(sql) {
    return this.db.prepare(sql);
  }

  // Close connection
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
      console.log('📊 Database connection closed');
    }
  }

  // Health check
  healthCheck() {
    try {
      const result = this.db.prepare('SELECT 1 as health').get();
      return { status: 'healthy', result };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  }
}

// Singleton instance
const dbConnection = new DatabaseConnection();

export default dbConnection;
