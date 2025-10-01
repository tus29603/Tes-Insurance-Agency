import sqlite3 from 'sqlite3';
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
      this.db = new sqlite3.Database(dbPath);
      
      // Enable foreign keys
      this.db.run('PRAGMA foreign_keys = ON');
      
      // Enable WAL mode for better concurrency
      this.db.run('PRAGMA journal_mode = WAL');
      
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
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('BEGIN TRANSACTION');
        callback(this.db)
          .then(() => {
            this.db.run('COMMIT', (err) => {
              if (err) reject(err);
              else resolve();
            });
          })
          .catch((err) => {
            this.db.run('ROLLBACK', () => {
              reject(err);
            });
          });
      });
    });
  }

  // Prepared statement helper
  prepare(sql) {
    return {
      run: (...params) => {
        return new Promise((resolve, reject) => {
          this.db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve({ changes: this.changes, lastID: this.lastID });
          });
        });
      },
      get: (...params) => {
        return new Promise((resolve, reject) => {
          this.db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
          });
        });
      },
      all: (...params) => {
        return new Promise((resolve, reject) => {
          this.db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
        });
      }
    };
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
    return new Promise((resolve) => {
      this.db.get('SELECT 1 as health', (err, row) => {
        if (err) {
          resolve({ status: 'unhealthy', error: err.message });
        } else {
          resolve({ status: 'healthy', result: row });
        }
      });
    });
  }
}

// Singleton instance
const dbConnection = new DatabaseConnection();

export default dbConnection;
