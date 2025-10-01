#!/usr/bin/env node

import SimpleSampleDataGenerator from './simple-sample-data.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing database for production...');
    
    const generator = new SimpleSampleDataGenerator();
    
    // Check if database already has data
    const userCount = await new Promise((resolve) => {
      generator.db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
        if (err) {
          console.log('Database not initialized, seeding...');
          resolve(0);
        } else {
          resolve(row.count);
        }
      });
    });
    
    if (userCount === 0) {
      console.log('📊 Database is empty, seeding with sample data...');
      await generator.generateAllSampleData();
      console.log('✅ Database seeded successfully!');
    } else {
      console.log(`✅ Database already has ${userCount} users, skipping seed`);
    }
    
    generator.close();
    console.log('🎉 Database initialization complete!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

// Run initialization
initializeDatabase();
