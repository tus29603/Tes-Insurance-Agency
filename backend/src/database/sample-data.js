import dbConnection from './connection.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// Simple UUID generator (fallback if uuid package is not available)
function generateUUID() {
  return crypto.randomUUID ? crypto.randomUUID() : 
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

class SampleDataGenerator {
  constructor() {
    this.db = dbConnection.getConnection();
  }

  // Generate sample users
  async generateUsers() {
    const users = [
      {
        email: 'admin@tesinsurance.com',
        password_hash: await bcrypt.hash('admin123', 10),
        first_name: 'John',
        last_name: 'Admin',
        role: 'admin',
        is_active: 1
      },
      {
        email: 'agent@tesinsurance.com',
        password_hash: await bcrypt.hash('agent123', 10),
        first_name: 'Sarah',
        last_name: 'Agent',
        role: 'agent',
        is_active: 1
      },
      {
        email: 'manager@tesinsurance.com',
        password_hash: await bcrypt.hash('manager123', 10),
        first_name: 'Mike',
        last_name: 'Manager',
        role: 'manager',
        is_active: 1
      }
    ];

    const insertUser = this.db.prepare(`
      INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const user of users) {
      try {
        await insertUser.run(
          user.email,
          user.password_hash,
          user.first_name,
          user.last_name,
          user.role,
          user.is_active
        );
        console.log(`✅ Created user: ${user.email}`);
      } catch (error) {
        console.log(`⚠️  User ${user.email} already exists or error: ${error.message}`);
      }
    }
  }

  // Generate sample carriers
  generateCarriers() {
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

    const insertCarrier = this.db.prepare(`
      INSERT INTO carriers (name, logo_url, website, phone, email, products, api_enabled, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    carriers.forEach(carrier => {
      try {
        insertCarrier.run(
          carrier.name,
          carrier.logo_url,
          carrier.website,
          carrier.phone,
          carrier.email,
          carrier.products,
          carrier.api_enabled,
          carrier.is_active
        );
        console.log(`✅ Created carrier: ${carrier.name}`);
      } catch (error) {
        console.log(`⚠️  Carrier ${carrier.name} already exists or error: ${error.message}`);
      }
    });
  }

  // Generate sample leads
  generateLeads() {
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

    const insertLead = this.db.prepare(`
      INSERT INTO leads (lead_id, name, email, phone, zip_code, coverage_type, status, source, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    leads.forEach(lead => {
      try {
        insertLead.run(
          lead.lead_id,
          lead.name,
          lead.email,
          lead.phone,
          lead.zip_code,
          lead.coverage_type,
          lead.status,
          lead.source,
          lead.notes
        );
        console.log(`✅ Created lead: ${lead.name}`);
      } catch (error) {
        console.log(`⚠️  Lead ${lead.name} already exists or error: ${error.message}`);
      }
    });

    return leads;
  }

  // Generate sample lead details
  generateLeadDetails(leads) {
    const leadDetails = [
      {
        lead_id: leads[0].lead_id,
        date_of_birth: '1985-03-15',
        gender: 'Male',
        marital_status: 'Married',
        occupation: 'Software Engineer',
        street_address: '123 Main St',
        city: 'Beverly Hills',
        state: 'CA',
        license_number: 'D1234567',
        years_licensed: 15,
        violations: 'None in last 5 years',
        accidents: 'Minor fender bender in 2020',
        vehicle_year: '2020',
        vehicle_make: 'Toyota',
        vehicle_model: 'Camry',
        vin: '1HGBH41JXMN109186',
        mileage: '25000',
        vehicle_usage: 'Personal',
        garaging_address: '123 Main St, Beverly Hills, CA 90210',
        coverage_limits: '100/300/100',
        deductible: '$500',
        payment_method: 'Monthly',
        billing_cycle: 'Monthly',
        emergency_name: 'Jane Smith',
        emergency_phone: '555-0106',
        emergency_relationship: 'Spouse'
      },
      {
        lead_id: leads[1].lead_id,
        date_of_birth: '1990-07-22',
        gender: 'Female',
        marital_status: 'Single',
        occupation: 'Teacher',
        street_address: '456 Oak Ave',
        city: 'New York',
        state: 'NY',
        property_address: '456 Oak Ave, New York, NY 10001',
        year_built: '2015',
        coverage_limits: 'Dwelling: $300,000, Personal Property: $150,000',
        deductible: '$1,000',
        payment_method: 'Annual',
        billing_cycle: 'Annual',
        emergency_name: 'David Johnson',
        emergency_phone: '555-0107',
        emergency_relationship: 'Brother'
      },
      {
        lead_id: leads[2].lead_id,
        date_of_birth: '1978-11-08',
        gender: 'Male',
        marital_status: 'Married',
        occupation: 'Business Owner',
        street_address: '789 Business Blvd',
        city: 'Chicago',
        state: 'IL',
        business_name: 'Davis Construction LLC',
        dot_number: '1234567',
        num_employees: 12,
        annual_payroll: 750000.00,
        operations: 'General construction and remodeling',
        coverage_limits: 'General Liability: $1M, Commercial Auto: $500K',
        deductible: '$2,500',
        payment_method: 'Quarterly',
        billing_cycle: 'Quarterly',
        emergency_name: 'Lisa Davis',
        emergency_phone: '555-0108',
        emergency_relationship: 'Spouse'
      }
    ];

    const insertLeadDetail = this.db.prepare(`
      INSERT INTO lead_details (
        lead_id, date_of_birth, gender, marital_status, occupation,
        street_address, city, state, license_number, years_licensed,
        violations, accidents, vehicle_year, vehicle_make, vehicle_model,
        vin, mileage, vehicle_usage, garaging_address, property_address,
        year_built, business_name, dot_number, num_employees, annual_payroll,
        operations, coverage_limits, deductible, payment_method,
        billing_cycle, emergency_name, emergency_phone, emergency_relationship
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    leadDetails.forEach(detail => {
      try {
        insertLeadDetail.run(
          detail.lead_id,
          detail.date_of_birth,
          detail.gender,
          detail.marital_status,
          detail.occupation,
          detail.street_address,
          detail.city,
          detail.state,
          detail.license_number,
          detail.years_licensed,
          detail.violations,
          detail.accidents,
          detail.vehicle_year,
          detail.vehicle_make,
          detail.vehicle_model,
          detail.vin,
          detail.mileage,
          detail.vehicle_usage,
          detail.garaging_address,
          detail.property_address,
          detail.year_built,
          detail.business_name,
          detail.dot_number,
          detail.num_employees,
          detail.annual_payroll,
          detail.operations,
          detail.coverage_limits,
          detail.deductible,
          detail.payment_method,
          detail.billing_cycle,
          detail.emergency_name,
          detail.emergency_phone,
          detail.emergency_relationship
        );
        console.log(`✅ Created lead details for: ${detail.lead_id}`);
      } catch (error) {
        console.log(`⚠️  Lead details for ${detail.lead_id} already exists or error: ${error.message}`);
      }
    });
  }

  // Generate sample quotes
  generateQuotes(leads) {
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

    const insertQuote = this.db.prepare(`
      INSERT INTO quotes (quote_id, lead_id, carrier_name, premium, coverage_limits, deductibles, effective_date, expiration_date, status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    quotes.forEach(quote => {
      try {
        insertQuote.run(
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
        );
        console.log(`✅ Created quote: ${quote.quote_id}`);
      } catch (error) {
        console.log(`⚠️  Quote ${quote.quote_id} already exists or error: ${error.message}`);
      }
    });

    return quotes;
  }

  // Generate sample policies
  generatePolicies(quotes, leads) {
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

    const insertPolicy = this.db.prepare(`
      INSERT INTO policies (policy_id, quote_id, lead_id, carrier_name, policy_number, premium, effective_date, expiration_date, status, documents)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    policies.forEach(policy => {
      try {
        insertPolicy.run(
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
        );
        console.log(`✅ Created policy: ${policy.policy_number}`);
      } catch (error) {
        console.log(`⚠️  Policy ${policy.policy_number} already exists or error: ${error.message}`);
      }
    });
  }

  // Generate sample contact messages
  generateContactMessages() {
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

    const insertMessage = this.db.prepare(`
      INSERT INTO contact_messages (message_id, name, email, subject, message, status, priority, assigned_to, response)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    messages.forEach(message => {
      try {
        insertMessage.run(
          message.message_id,
          message.name,
          message.email,
          message.subject,
          message.message,
          message.status,
          message.priority,
          message.assigned_to,
          message.response
        );
        console.log(`✅ Created contact message: ${message.subject}`);
      } catch (error) {
        console.log(`⚠️  Contact message ${message.subject} already exists or error: ${error.message}`);
      }
    });
  }

  // Generate sample analytics events
  generateAnalyticsEvents() {
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

    const insertEvent = this.db.prepare(`
      INSERT INTO analytics_events (event_id, event_type, event_category, event_label, event_value, user_agent, ip_address, referrer, page_url, session_id, custom_data)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    events.forEach(event => {
      try {
        insertEvent.run(
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
        );
        console.log(`✅ Created analytics event: ${event.event_type}`);
      } catch (error) {
        console.log(`⚠️  Analytics event ${event.event_type} already exists or error: ${error.message}`);
      }
    });
  }

  // Generate sample audit logs
  generateAuditLogs() {
    const auditLogs = [
      {
        log_id: generateUUID(),
        user_id: 1,
        action: 'CREATE',
        entity_type: 'lead',
        entity_id: 'lead_001',
        old_values: null,
        new_values: JSON.stringify({
          name: 'John Smith',
          email: 'john.smith@email.com',
          status: 'new'
        }),
        ip_address: '192.168.1.100',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      {
        log_id: generateUUID(),
        user_id: 1,
        action: 'UPDATE',
        entity_type: 'lead',
        entity_id: 'lead_001',
        old_values: JSON.stringify({
          status: 'new'
        }),
        new_values: JSON.stringify({
          status: 'contacted'
        }),
        ip_address: '192.168.1.100',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      {
        log_id: generateUUID(),
        user_id: 2,
        action: 'CREATE',
        entity_type: 'quote',
        entity_id: 'quote_001',
        old_values: null,
        new_values: JSON.stringify({
          carrier_name: 'State Farm',
          premium: 1250.00,
          status: 'pending'
        }),
        ip_address: '192.168.1.101',
        user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    ];

    const insertAuditLog = this.db.prepare(`
      INSERT INTO audit_logs (log_id, user_id, action, entity_type, entity_id, old_values, new_values, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    auditLogs.forEach(log => {
      try {
        insertAuditLog.run(
          log.log_id,
          log.user_id,
          log.action,
          log.entity_type,
          log.entity_id,
          log.old_values,
          log.new_values,
          log.ip_address,
          log.user_agent
        );
        console.log(`✅ Created audit log: ${log.action} ${log.entity_type}`);
      } catch (error) {
        console.log(`⚠️  Audit log ${log.action} ${log.entity_type} already exists or error: ${error.message}`);
      }
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
      this.generateCarriers();
      console.log('');

      // Generate leads and their details
      console.log('📋 Generating leads...');
      const leads = this.generateLeads();
      console.log('');

      console.log('📝 Generating lead details...');
      this.generateLeadDetails(leads);
      console.log('');

      // Generate quotes
      console.log('💰 Generating quotes...');
      const quotes = this.generateQuotes(leads);
      console.log('');

      // Generate policies
      console.log('📄 Generating policies...');
      this.generatePolicies(quotes, leads);
      console.log('');

      // Generate contact messages
      console.log('📧 Generating contact messages...');
      this.generateContactMessages();
      console.log('');

      // Generate analytics events
      console.log('📊 Generating analytics events...');
      this.generateAnalyticsEvents();
      console.log('');

      // Generate audit logs
      console.log('📝 Generating audit logs...');
      this.generateAuditLogs();
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
      console.log('- 3 Audit Log Entries');

    } catch (error) {
      console.error('❌ Error generating sample data:', error);
      throw error;
    }
  }

  // Method to clear all sample data
  clearAllSampleData() {
    console.log('🧹 Clearing all sample data...');

    const tables = [
      'audit_logs',
      'analytics_events',
      'contact_messages',
      'policies',
      'quotes',
      'lead_details',
      'leads',
      'carriers',
      'users'
    ];

    tables.forEach(table => {
      try {
        const result = this.db.prepare(`DELETE FROM ${table}`).run();
        console.log(`✅ Cleared ${result.changes} records from ${table}`);
      } catch (error) {
        console.log(`⚠️  Error clearing ${table}: ${error.message}`);
      }
    });

    console.log('✅ Sample data cleared successfully!');
  }

  // Method to display data summary
  displayDataSummary() {
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

    tables.forEach(table => {
      try {
        const result = this.db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get();
        console.log(`- ${table}: ${result.count} records`);
      } catch (error) {
        console.log(`- ${table}: Error reading count - ${error.message}`);
      }
    });
  }
}

export default SampleDataGenerator;
