import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple UUID generator
function generateUUID() {
  return crypto.randomUUID ? crypto.randomUUID() : 
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

class SimpleSampleDataGenerator {
  constructor() {
    this.db = null;
    this.initialize();
  }

  initialize() {
    // Ensure data directory exists
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Connect to database
    const dbPath = process.env.DATABASE_URL || path.join(dataDir, 'insurance.db');
    this.db = new sqlite3.Database(dbPath);
    
    console.log(`📊 Connected to database: ${dbPath}`);
    
    // Initialize schema
    this.initializeSchema();
  }

  initializeSchema() {
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
  }

  // Generate sample users
  generateUsers() {
    return new Promise((resolve) => {
      const users = [
        {
          email: 'admin@tesinsurance.com',
          password_hash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
          first_name: 'John',
          last_name: 'Admin',
          role: 'admin',
          is_active: 1
        },
        {
          email: 'agent@tesinsurance.com',
          password_hash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
          first_name: 'Sarah',
          last_name: 'Agent',
          role: 'agent',
          is_active: 1
        },
        {
          email: 'manager@tesinsurance.com',
          password_hash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
          first_name: 'Mike',
          last_name: 'Manager',
          role: 'manager',
          is_active: 1
        }
      ];

      let completed = 0;
      users.forEach(user => {
        const stmt = this.db.prepare(`
          INSERT OR IGNORE INTO users (email, password_hash, first_name, last_name, role, is_active)
          VALUES (?, ?, ?, ?, ?, ?)
        `);
        
        stmt.run([
          user.email,
          user.password_hash,
          user.first_name,
          user.last_name,
          user.role,
          user.is_active
        ], (err) => {
          if (err) {
            console.log(`⚠️  User ${user.email} error: ${err.message}`);
          } else {
            console.log(`✅ Created user: ${user.email}`);
          }
          completed++;
          if (completed === users.length) {
            resolve();
          }
        });
      });
    });
  }

  // Generate sample carriers
  generateCarriers() {
    return new Promise((resolve) => {
      const carriers = [
        {
          name: 'State Farm',
          logo_url: 'https://logos.com/statefarm.png',
          website: 'https://statefarm.com',
          phone: '1-800-STATE-FARM',
          email: 'quotes@statefarm.com',
          products: JSON.stringify(['Auto', 'Home', 'Life', 'Commercial']),
          api_enabled: 1,
          is_active: 1
        },
        {
          name: 'Allstate',
          logo_url: 'https://logos.com/allstate.png',
          website: 'https://allstate.com',
          phone: '1-800-ALLSTATE',
          email: 'quotes@allstate.com',
          products: JSON.stringify(['Auto', 'Home', 'Life', 'Business']),
          api_enabled: 1,
          is_active: 1
        },
        {
          name: 'Progressive',
          logo_url: 'https://logos.com/progressive.png',
          website: 'https://progressive.com',
          phone: '1-800-PROGRESSIVE',
          email: 'quotes@progressive.com',
          products: JSON.stringify(['Auto', 'Home', 'Commercial']),
          api_enabled: 1,
          is_active: 1
        },
        {
          name: 'Geico',
          logo_url: 'https://logos.com/geico.png',
          website: 'https://geico.com',
          phone: '1-800-GEICO',
          email: 'quotes@geico.com',
          products: JSON.stringify(['Auto', 'Home', 'Commercial']),
          api_enabled: 1,
          is_active: 1
        },
        {
          name: 'Farmers Insurance',
          logo_url: 'https://logos.com/farmers.png',
          website: 'https://farmers.com',
          phone: '1-800-FARMERS',
          email: 'quotes@farmers.com',
          products: JSON.stringify(['Auto', 'Home', 'Life', 'Business']),
          api_enabled: 0,
          is_active: 1
        }
      ];

      let completed = 0;
      carriers.forEach(carrier => {
        const stmt = this.db.prepare(`
          INSERT OR IGNORE INTO carriers (name, logo_url, website, phone, email, products, api_enabled, is_active)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        stmt.run([
          carrier.name,
          carrier.logo_url,
          carrier.website,
          carrier.phone,
          carrier.email,
          carrier.products,
          carrier.api_enabled,
          carrier.is_active
        ], (err) => {
          if (err) {
            console.log(`⚠️  Carrier ${carrier.name} error: ${err.message}`);
          } else {
            console.log(`✅ Created carrier: ${carrier.name}`);
          }
          completed++;
          if (completed === carriers.length) {
            resolve();
          }
        });
      });
    });
  }

  // Generate sample leads
  generateLeads() {
    return new Promise((resolve) => {
      const leads = [
        {
          lead_id: generateUUID(),
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '555-0101',
          zip_code: '90210',
          coverage_type: 'Auto',
          status: 'new',
          source: 'website',
          notes: 'Looking for comprehensive auto coverage'
        },
        {
          lead_id: generateUUID(),
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '555-0102',
          zip_code: '10001',
          coverage_type: 'Home',
          status: 'contacted',
          source: 'referral',
          notes: 'First-time home buyer, needs guidance'
        },
        {
          lead_id: generateUUID(),
          name: 'Mike Davis',
          email: 'mike.davis@email.com',
          phone: '555-0103',
          zip_code: '60601',
          coverage_type: 'Commercial',
          status: 'quoted',
          source: 'phone',
          notes: 'Small business owner, needs commercial auto and general liability'
        },
        {
          lead_id: generateUUID(),
          name: 'Emily Wilson',
          email: 'emily.wilson@email.com',
          phone: '555-0104',
          zip_code: '33101',
          coverage_type: 'Auto',
          status: 'converted',
          source: 'website',
          notes: 'Converted to policy - very satisfied customer'
        },
        {
          lead_id: generateUUID(),
          name: 'Robert Brown',
          email: 'robert.brown@email.com',
          phone: '555-0105',
          zip_code: '75201',
          coverage_type: 'Home',
          status: 'new',
          source: 'website',
          notes: 'Needs home insurance for new property'
        }
      ];

      let completed = 0;
      leads.forEach(lead => {
        const stmt = this.db.prepare(`
          INSERT OR IGNORE INTO leads (lead_id, name, email, phone, zip_code, coverage_type, status, source, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        stmt.run([
          lead.lead_id,
          lead.name,
          lead.email,
          lead.phone,
          lead.zip_code,
          lead.coverage_type,
          lead.status,
          lead.source,
          lead.notes
        ], (err) => {
          if (err) {
            console.log(`⚠️  Lead ${lead.name} error: ${err.message}`);
          } else {
            console.log(`✅ Created lead: ${lead.name}`);
          }
          completed++;
          if (completed === leads.length) {
            resolve(leads);
          }
        });
      });
    });
  }

  // Generate sample quotes
  generateQuotes(leads) {
    return new Promise((resolve) => {
      const quotes = [
        {
          quote_id: generateUUID(),
          lead_id: leads[0].lead_id,
          carrier_name: 'State Farm',
          premium: 1250.00,
          coverage_limits: JSON.stringify({
            liability: '100/300/100',
            comprehensive: 'Actual Cash Value',
            collision: 'Actual Cash Value'
          }),
          deductibles: JSON.stringify({
            comprehensive: '$500',
            collision: '$500'
          }),
          effective_date: '2024-01-01',
          expiration_date: '2024-12-31',
          status: 'approved',
          notes: 'Best rate available for this driver profile'
        },
        {
          quote_id: generateUUID(),
          lead_id: leads[1].lead_id,
          carrier_name: 'Allstate',
          premium: 1800.00,
          coverage_limits: JSON.stringify({
            dwelling: '$300,000',
            personal_property: '$150,000',
            liability: '$300,000'
          }),
          deductibles: JSON.stringify({
            dwelling: '$1,000',
            personal_property: '$1,000'
          }),
          effective_date: '2024-02-01',
          expiration_date: '2025-01-31',
          status: 'pending',
          notes: 'Waiting for property inspection'
        },
        {
          quote_id: generateUUID(),
          lead_id: leads[2].lead_id,
          carrier_name: 'Progressive',
          premium: 3500.00,
          coverage_limits: JSON.stringify({
            general_liability: '$1,000,000',
            commercial_auto: '$500,000',
            workers_comp: 'Statutory'
          }),
          deductibles: JSON.stringify({
            general_liability: '$2,500',
            commercial_auto: '$2,500'
          }),
          effective_date: '2024-01-15',
          expiration_date: '2024-12-14',
          status: 'approved',
          notes: 'Comprehensive commercial package'
        }
      ];

      let completed = 0;
      quotes.forEach(quote => {
        const stmt = this.db.prepare(`
          INSERT OR IGNORE INTO quotes (quote_id, lead_id, carrier_name, premium, coverage_limits, deductibles, effective_date, expiration_date, status, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        stmt.run([
          quote.quote_id,
          quote.lead_id,
          quote.carrier_name,
          quote.premium,
          quote.coverage_limits,
          quote.deductibles,
          quote.effective_date,
          quote.expiration_date,
          quote.status,
          quote.notes
        ], (err) => {
          if (err) {
            console.log(`⚠️  Quote ${quote.quote_id} error: ${err.message}`);
          } else {
            console.log(`✅ Created quote: ${quote.quote_id}`);
          }
          completed++;
          if (completed === quotes.length) {
            resolve(quotes);
          }
        });
      });
    });
  }

  // Generate sample policies
  generatePolicies(quotes, leads) {
    return new Promise((resolve) => {
      const policies = [
        {
          policy_id: generateUUID(),
          quote_id: quotes[0].quote_id,
          lead_id: leads[0].lead_id,
          carrier_name: 'State Farm',
          policy_number: 'SF-AUTO-2024-001',
          premium: 1250.00,
          effective_date: '2024-01-01',
          expiration_date: '2024-12-31',
          status: 'active',
          documents: JSON.stringify([
            'policy_document.pdf',
            'declarations_page.pdf',
            'id_cards.pdf'
          ])
        },
        {
          policy_id: generateUUID(),
          quote_id: quotes[2].quote_id,
          lead_id: leads[2].lead_id,
          carrier_name: 'Progressive',
          policy_number: 'PROG-COMM-2024-001',
          premium: 3500.00,
          effective_date: '2024-01-15',
          expiration_date: '2024-12-14',
          status: 'active',
          documents: JSON.stringify([
            'commercial_policy.pdf',
            'certificate_of_insurance.pdf',
            'workers_comp_cert.pdf'
          ])
        }
      ];

      let completed = 0;
      policies.forEach(policy => {
        const stmt = this.db.prepare(`
          INSERT OR IGNORE INTO policies (policy_id, quote_id, lead_id, carrier_name, policy_number, premium, effective_date, expiration_date, status, documents)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        stmt.run([
          policy.policy_id,
          policy.quote_id,
          policy.lead_id,
          policy.carrier_name,
          policy.policy_number,
          policy.premium,
          policy.effective_date,
          policy.expiration_date,
          policy.status,
          policy.documents
        ], (err) => {
          if (err) {
            console.log(`⚠️  Policy ${policy.policy_number} error: ${err.message}`);
          } else {
            console.log(`✅ Created policy: ${policy.policy_number}`);
          }
          completed++;
          if (completed === policies.length) {
            resolve();
          }
        });
      });
    });
  }

  // Generate sample contact messages
  generateContactMessages() {
    return new Promise((resolve) => {
      const messages = [
        {
          message_id: generateUUID(),
          name: 'Jennifer Martinez',
          email: 'jennifer.martinez@email.com',
          subject: 'Auto Insurance Quote Request',
          message: 'Hi, I need a quote for auto insurance. I have a 2019 Honda Civic and live in Miami, FL. Please contact me at your earliest convenience.',
          status: 'new',
          priority: 'normal'
        },
        {
          message_id: generateUUID(),
          name: 'David Thompson',
          email: 'david.thompson@email.com',
          subject: 'Home Insurance Question',
          message: 'I recently purchased a home and need to understand what coverage options are available. Can someone call me to discuss?',
          status: 'read',
          priority: 'normal',
          assigned_to: 1,
          response: 'Thank you for your inquiry. I will have one of our agents contact you within 24 hours.'
        },
        {
          message_id: generateUUID(),
          name: 'Lisa Anderson',
          email: 'lisa.anderson@email.com',
          subject: 'URGENT: Policy Cancellation',
          message: 'I need to cancel my policy immediately due to moving out of state. This is urgent!',
          status: 'replied',
          priority: 'urgent',
          assigned_to: 1,
          response: 'I have processed your cancellation request. Your policy will be cancelled effective immediately with a pro-rated refund.'
        }
      ];

      let completed = 0;
      messages.forEach(message => {
        const stmt = this.db.prepare(`
          INSERT OR IGNORE INTO contact_messages (message_id, name, email, subject, message, status, priority, assigned_to, response)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        stmt.run([
          message.message_id,
          message.name,
          message.email,
          message.subject,
          message.message,
          message.status,
          message.priority,
          message.assigned_to,
          message.response
        ], (err) => {
          if (err) {
            console.log(`⚠️  Contact message ${message.subject} error: ${err.message}`);
          } else {
            console.log(`✅ Created contact message: ${message.subject}`);
          }
          completed++;
          if (completed === messages.length) {
            resolve();
          }
        });
      });
    });
  }

  // Generate sample analytics events
  generateAnalyticsEvents() {
    return new Promise((resolve) => {
      const events = [
        {
          event_id: generateUUID(),
          event_type: 'page_view',
          event_category: 'navigation',
          event_label: 'Home Page',
          page_url: 'https://tesinsurance.com/',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          ip_address: '192.168.1.100',
          referrer: 'https://google.com',
          session_id: 'sess_001'
        },
        {
          event_id: generateUUID(),
          event_type: 'cta_click',
          event_category: 'engagement',
          event_label: 'Get Quote Button',
          page_url: 'https://tesinsurance.com/',
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          ip_address: '192.168.1.101',
          session_id: 'sess_002'
        },
        {
          event_id: generateUUID(),
          event_type: 'form_submission',
          event_category: 'conversion',
          event_label: 'Quote Form',
          page_url: 'https://tesinsurance.com/quote',
          user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          ip_address: '192.168.1.102',
          session_id: 'sess_003',
          custom_data: JSON.stringify({
            form_type: 'auto_quote',
            completion_time: 180
          })
        },
        {
          event_id: generateUUID(),
          event_type: 'page_view',
          event_category: 'navigation',
          event_label: 'About Page',
          page_url: 'https://tesinsurance.com/about',
          user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
          ip_address: '192.168.1.103',
          session_id: 'sess_004'
        }
      ];

      let completed = 0;
      events.forEach(event => {
        const stmt = this.db.prepare(`
          INSERT OR IGNORE INTO analytics_events (event_id, event_type, event_category, event_label, event_value, user_agent, ip_address, referrer, page_url, session_id, custom_data)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        stmt.run([
          event.event_id,
          event.event_type,
          event.event_category,
          event.event_label,
          event.event_value || null,
          event.user_agent,
          event.ip_address,
          event.referrer || null,
          event.page_url,
          event.session_id,
          event.custom_data || null
        ], (err) => {
          if (err) {
            console.log(`⚠️  Analytics event ${event.event_type} error: ${err.message}`);
          } else {
            console.log(`✅ Created analytics event: ${event.event_type}`);
          }
          completed++;
          if (completed === events.length) {
            resolve();
          }
        });
      });
    });
  }

  // Main method to generate all sample data
  async generateAllSampleData() {
    console.log('🚀 Starting sample data generation...\n');

    try {
      // Generate users first (required for foreign keys)
      console.log('👥 Generating users...');
      await this.generateUsers();
      console.log('');

      // Generate carriers
      console.log('🏢 Generating carriers...');
      await this.generateCarriers();
      console.log('');

      // Generate leads and their details
      console.log('📋 Generating leads...');
      const leads = await this.generateLeads();
      console.log('');

      // Generate quotes
      console.log('💰 Generating quotes...');
      const quotes = await this.generateQuotes(leads);
      console.log('');

      // Generate policies
      console.log('📄 Generating policies...');
      await this.generatePolicies(quotes, leads);
      console.log('');

      // Generate contact messages
      console.log('📧 Generating contact messages...');
      await this.generateContactMessages();
      console.log('');

      // Generate analytics events
      console.log('📊 Generating analytics events...');
      await this.generateAnalyticsEvents();
      console.log('');

      console.log('✅ Sample data generation completed successfully!');
      console.log('\n📊 Sample Data Summary:');
      console.log('- 3 Users (admin, agent, manager)');
      console.log('- 5 Insurance Carriers');
      console.log('- 5 Leads with detailed information');
      console.log('- 3 Quotes from different carriers');
      console.log('- 2 Active Policies');
      console.log('- 3 Contact Messages');
      console.log('- 4 Analytics Events');

    } catch (error) {
      console.error('❌ Error generating sample data:', error);
      throw error;
    }
  }

  // Method to clear all sample data
  clearAllSampleData() {
    return new Promise((resolve) => {
      const tables = [
        'analytics_events',
        'contact_messages',
        'policies',
        'quotes',
        'lead_details',
        'leads',
        'carriers',
        'users'
      ];

      let completed = 0;
      tables.forEach(table => {
        this.db.run(`DELETE FROM ${table}`, (err) => {
          if (err) {
            console.log(`⚠️  Error clearing ${table}: ${err.message}`);
          } else {
            console.log(`✅ Cleared records from ${table}`);
          }
          completed++;
          if (completed === tables.length) {
            console.log('✅ Sample data cleared successfully!');
            resolve();
          }
        });
      });
    });
  }

  // Method to display data summary
  displayDataSummary() {
    return new Promise((resolve) => {
      console.log('\n📊 Current Database Summary:');
      
      const tables = [
        'users',
        'carriers',
        'leads',
        'lead_details',
        'quotes',
        'policies',
        'contact_messages',
        'analytics_events',
        'audit_logs'
      ];

      let completed = 0;
      tables.forEach(table => {
        this.db.get(`SELECT COUNT(*) as count FROM ${table}`, (err, row) => {
          if (err) {
            console.log(`- ${table}: Error reading count - ${err.message}`);
          } else {
            console.log(`- ${table}: ${row.count} records`);
          }
          completed++;
          if (completed === tables.length) {
            resolve();
          }
        });
      });
    });
  }

  // Close database connection
  close() {
    if (this.db) {
      this.db.close();
      console.log('📊 Database connection closed');
    }
  }
}

export default SimpleSampleDataGenerator;
