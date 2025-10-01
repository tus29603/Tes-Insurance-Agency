#!/usr/bin/env node

import SimpleSampleDataGenerator from './simple-sample-data.js';

class DatabaseTester {
  constructor() {
    this.generator = new SimpleSampleDataGenerator();
    this.db = this.generator.db;
  }

  // Test basic database connectivity
  testConnection() {
    return new Promise((resolve) => {
      console.log('🔌 Testing database connection...');
      this.db.get('SELECT 1 as health', (err, row) => {
        if (err) {
          console.log('❌ Database connection test failed:', err.message);
          resolve(false);
        } else {
          console.log('✅ Database connection is healthy');
          resolve(true);
        }
      });
    });
  }

  // Test table existence and structure
  testTableStructure() {
    console.log('\n📋 Testing table structure...');
    
    const expectedTables = [
      'users', 'carriers', 'leads', 'lead_details', 'quotes', 
      'policies', 'contact_messages', 'analytics_events', 'audit_logs'
    ];

    const existingTables = this.db.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `).all();

    const tableNames = existingTables.map(table => table.name);
    
    expectedTables.forEach(tableName => {
      if (tableNames.includes(tableName)) {
        console.log(`✅ Table '${tableName}' exists`);
      } else {
        console.log(`❌ Table '${tableName}' is missing`);
      }
    });

    return tableNames.length === expectedTables.length;
  }

  // Test data integrity and relationships
  testDataIntegrity() {
    console.log('\n🔍 Testing data integrity...');
    
    try {
      // Test foreign key relationships
      const leadDetailsWithoutLeads = this.db.prepare(`
        SELECT COUNT(*) as count FROM lead_details ld
        LEFT JOIN leads l ON ld.lead_id = l.lead_id
        WHERE l.lead_id IS NULL
      `).get();

      if (leadDetailsWithoutLeads.count === 0) {
        console.log('✅ Lead details foreign key integrity is maintained');
      } else {
        console.log(`❌ Found ${leadDetailsWithoutLeads.count} orphaned lead details`);
      }

      // Test quotes foreign key relationships
      const quotesWithoutLeads = this.db.prepare(`
        SELECT COUNT(*) as count FROM quotes q
        LEFT JOIN leads l ON q.lead_id = l.lead_id
        WHERE l.lead_id IS NULL
      `).get();

      if (quotesWithoutLeads.count === 0) {
        console.log('✅ Quotes foreign key integrity is maintained');
      } else {
        console.log(`❌ Found ${quotesWithoutLeads.count} orphaned quotes`);
      }

      // Test policies foreign key relationships
      const policiesWithoutQuotes = this.db.prepare(`
        SELECT COUNT(*) as count FROM policies p
        LEFT JOIN quotes q ON p.quote_id = q.quote_id
        WHERE q.quote_id IS NULL
      `).get();

      if (policiesWithoutQuotes.count === 0) {
        console.log('✅ Policies foreign key integrity is maintained');
      } else {
        console.log(`❌ Found ${policiesWithoutQuotes.count} orphaned policies`);
      }

      return true;
    } catch (error) {
      console.log('❌ Data integrity test failed:', error.message);
      return false;
    }
  }

  // Test sample data queries
  testSampleDataQueries() {
    console.log('\n📊 Testing sample data queries...');
    
    try {
      // Test users query
      const users = this.db.prepare('SELECT COUNT(*) as count FROM users').get();
      console.log(`✅ Found ${users.count} users in database`);

      // Test leads query
      const leads = this.db.prepare('SELECT COUNT(*) as count FROM leads').get();
      console.log(`✅ Found ${leads.count} leads in database`);

      // Test carriers query
      const carriers = this.db.prepare('SELECT COUNT(*) as count FROM carriers').get();
      console.log(`✅ Found ${carriers.count} carriers in database`);

      // Test quotes query
      const quotes = this.db.prepare('SELECT COUNT(*) as count FROM quotes').get();
      console.log(`✅ Found ${quotes.count} quotes in database`);

      // Test policies query
      const policies = this.db.prepare('SELECT COUNT(*) as count FROM policies').get();
      console.log(`✅ Found ${policies.count} policies in database`);

      // Test complex join query
      const leadWithDetails = this.db.prepare(`
        SELECT l.name, l.email, l.coverage_type, ld.vehicle_make, ld.vehicle_model
        FROM leads l
        LEFT JOIN lead_details ld ON l.lead_id = ld.lead_id
        WHERE l.coverage_type = 'Auto'
        LIMIT 3
      `).all();

      console.log(`✅ Complex join query returned ${leadWithDetails.length} auto insurance leads`);
      
      if (leadWithDetails.length > 0) {
        console.log('   Sample results:');
        leadWithDetails.forEach(lead => {
          console.log(`   - ${lead.name}: ${lead.vehicle_make} ${lead.vehicle_model}`);
        });
      }

      return true;
    } catch (error) {
      console.log('❌ Sample data query test failed:', error.message);
      return false;
    }
  }

  // Test CRUD operations
  testCRUDOperations() {
    console.log('\n🔧 Testing CRUD operations...');
    
    try {
      // Test INSERT
      const testLeadId = 'test-lead-' + Date.now();
      const insertStmt = this.db.prepare(`
        INSERT INTO leads (lead_id, name, email, phone, zip_code, coverage_type, status, source)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const insertResult = insertStmt.run(
        testLeadId,
        'Test User',
        'test@example.com',
        '555-TEST',
        '12345',
        'Auto',
        'new',
        'test'
      );
      
      console.log(`✅ INSERT test successful - created lead with ID: ${testLeadId}`);

      // Test SELECT
      const selectStmt = this.db.prepare('SELECT * FROM leads WHERE lead_id = ?');
      const selectedLead = selectStmt.get(testLeadId);
      
      if (selectedLead) {
        console.log(`✅ SELECT test successful - retrieved lead: ${selectedLead.name}`);
      } else {
        console.log('❌ SELECT test failed - could not retrieve inserted lead');
        return false;
      }

      // Test UPDATE
      const updateStmt = this.db.prepare('UPDATE leads SET status = ? WHERE lead_id = ?');
      const updateResult = updateStmt.run('contacted', testLeadId);
      
      if (updateResult.changes === 1) {
        console.log('✅ UPDATE test successful - lead status updated');
      } else {
        console.log('❌ UPDATE test failed - no rows updated');
        return false;
      }

      // Test DELETE
      const deleteStmt = this.db.prepare('DELETE FROM leads WHERE lead_id = ?');
      const deleteResult = deleteStmt.run(testLeadId);
      
      if (deleteResult.changes === 1) {
        console.log('✅ DELETE test successful - test lead removed');
      } else {
        console.log('❌ DELETE test failed - no rows deleted');
        return false;
      }

      return true;
    } catch (error) {
      console.log('❌ CRUD operations test failed:', error.message);
      return false;
    }
  }

  // Test performance with sample queries
  testPerformance() {
    console.log('\n⚡ Testing query performance...');
    
    try {
      const startTime = Date.now();
      
      // Test complex analytics query
      const analyticsQuery = this.db.prepare(`
        SELECT 
          event_type,
          COUNT(*) as event_count,
          DATE(created_at) as event_date
        FROM analytics_events 
        GROUP BY event_type, DATE(created_at)
        ORDER BY event_date DESC
      `).all();
      
      const queryTime = Date.now() - startTime;
      console.log(`✅ Analytics query completed in ${queryTime}ms - returned ${analyticsQuery.length} rows`);

      // Test lead status distribution query
      const statusStartTime = Date.now();
      const statusQuery = this.db.prepare(`
        SELECT 
          status,
          COUNT(*) as count,
          ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM leads), 2) as percentage
        FROM leads 
        GROUP BY status
        ORDER BY count DESC
      `).all();
      
      const statusQueryTime = Date.now() - statusStartTime;
      console.log(`✅ Lead status query completed in ${statusQueryTime}ms`);
      
      if (statusQuery.length > 0) {
        console.log('   Status distribution:');
        statusQuery.forEach(status => {
          console.log(`   - ${status.status}: ${status.count} (${status.percentage}%)`);
        });
      }

      return true;
    } catch (error) {
      console.log('❌ Performance test failed:', error.message);
      return false;
    }
  }

  // Run all tests
  async runAllTests() {
    console.log('🧪 Tes Insurance Agency - Database Testing Suite');
    console.log('================================================\n');

    const tests = [
      { name: 'Connection Test', fn: () => this.testConnection() },
      { name: 'Table Structure Test', fn: () => this.testTableStructure() },
      { name: 'Data Integrity Test', fn: () => this.testDataIntegrity() },
      { name: 'Sample Data Queries Test', fn: () => this.testSampleDataQueries() },
      { name: 'CRUD Operations Test', fn: () => this.testCRUDOperations() },
      { name: 'Performance Test', fn: () => this.testPerformance() }
    ];

    let passedTests = 0;
    let totalTests = tests.length;

    tests.forEach(test => {
      try {
        const result = test.fn();
        if (result) {
          passedTests++;
        }
      } catch (error) {
        console.log(`❌ ${test.name} failed with error: ${error.message}`);
      }
    });

    console.log('\n📊 Test Results Summary:');
    console.log(`✅ Passed: ${passedTests}/${totalTests} tests`);
    console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests} tests`);

    if (passedTests === totalTests) {
      console.log('\n🎉 All tests passed! Database is ready for use.');
    } else {
      console.log('\n⚠️  Some tests failed. Please check the issues above.');
    }

    return passedTests === totalTests;
  }

  // Display sample data for manual inspection
  displaySampleData() {
    console.log('\n📋 Sample Data Preview:');
    console.log('======================');

    // Show sample leads
    console.log('\n👥 Sample Leads:');
    const sampleLeads = this.db.prepare(`
      SELECT lead_id, name, email, coverage_type, status, created_at
      FROM leads 
      ORDER BY created_at DESC 
      LIMIT 3
    `).all();

    sampleLeads.forEach(lead => {
      console.log(`- ${lead.name} (${lead.email}) - ${lead.coverage_type} - ${lead.status}`);
    });

    // Show sample quotes
    console.log('\n💰 Sample Quotes:');
    const sampleQuotes = this.db.prepare(`
      SELECT q.quote_id, l.name, q.carrier_name, q.premium, q.status
      FROM quotes q
      JOIN leads l ON q.lead_id = l.lead_id
      ORDER BY q.created_at DESC
      LIMIT 3
    `).all();

    sampleQuotes.forEach(quote => {
      console.log(`- ${quote.name} - ${quote.carrier_name} - $${quote.premium} - ${quote.status}`);
    });

    // Show sample policies
    console.log('\n📄 Sample Policies:');
    const samplePolicies = this.db.prepare(`
      SELECT p.policy_number, l.name, p.carrier_name, p.premium, p.status
      FROM policies p
      JOIN leads l ON p.lead_id = l.lead_id
      ORDER BY p.created_at DESC
      LIMIT 3
    `).all();

    samplePolicies.forEach(policy => {
      console.log(`- ${policy.policy_number} - ${policy.name} - ${policy.carrier_name} - $${policy.premium} - ${policy.status}`);
    });
  }
}

async function main() {
  const tester = new DatabaseTester();
  
  try {
    const args = process.argv.slice(2);
    
    if (args.includes('--preview') || args.includes('-p')) {
      tester.displaySampleData();
    } else {
      const allTestsPassed = await tester.runAllTests();
      
      if (allTestsPassed) {
        tester.displaySampleData();
      }
    }
    
  } catch (error) {
    console.error('❌ Database testing failed:', error);
    process.exit(1);
  } finally {
    // Close database connection
    dbConnection.close();
  }
}

// Run the script
main();
