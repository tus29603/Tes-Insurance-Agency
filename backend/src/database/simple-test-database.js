#!/usr/bin/env node

import SimpleSampleDataGenerator from './simple-sample-data.js';

class SimpleDatabaseTester {
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
    return new Promise((resolve) => {
      console.log('\n📋 Testing table structure...');
      
      const expectedTables = [
        'users', 'carriers', 'leads', 'lead_details', 'quotes', 
        'policies', 'contact_messages', 'analytics_events', 'audit_logs'
      ];

      this.db.all(`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
      `, (err, existingTables) => {
        if (err) {
          console.log('❌ Error querying tables:', err.message);
          resolve(false);
          return;
        }

        const tableNames = existingTables.map(table => table.name);
        
        expectedTables.forEach(tableName => {
          if (tableNames.includes(tableName)) {
            console.log(`✅ Table '${tableName}' exists`);
          } else {
            console.log(`❌ Table '${tableName}' is missing`);
          }
        });

        resolve(tableNames.length === expectedTables.length);
      });
    });
  }

  // Test data integrity and relationships
  testDataIntegrity() {
    return new Promise((resolve) => {
      console.log('\n🔍 Testing data integrity...');
      
      // Test foreign key relationships
      this.db.get(`
        SELECT COUNT(*) as count FROM lead_details ld
        LEFT JOIN leads l ON ld.lead_id = l.lead_id
        WHERE l.lead_id IS NULL
      `, (err, result) => {
        if (err) {
          console.log('❌ Data integrity test failed:', err.message);
          resolve(false);
          return;
        }

        if (result.count === 0) {
          console.log('✅ Lead details foreign key integrity is maintained');
        } else {
          console.log(`❌ Found ${result.count} orphaned lead details`);
        }

        // Test quotes foreign key relationships
        this.db.get(`
          SELECT COUNT(*) as count FROM quotes q
          LEFT JOIN leads l ON q.lead_id = l.lead_id
          WHERE l.lead_id IS NULL
        `, (err, result) => {
          if (err) {
            console.log('❌ Data integrity test failed:', err.message);
            resolve(false);
            return;
          }

          if (result.count === 0) {
            console.log('✅ Quotes foreign key integrity is maintained');
          } else {
            console.log(`❌ Found ${result.count} orphaned quotes`);
          }

          // Test policies foreign key relationships
          this.db.get(`
            SELECT COUNT(*) as count FROM policies p
            LEFT JOIN quotes q ON p.quote_id = q.quote_id
            WHERE q.quote_id IS NULL
          `, (err, result) => {
            if (err) {
              console.log('❌ Data integrity test failed:', err.message);
              resolve(false);
              return;
            }

            if (result.count === 0) {
              console.log('✅ Policies foreign key integrity is maintained');
            } else {
              console.log(`❌ Found ${result.count} orphaned policies`);
            }

            resolve(true);
          });
        });
      });
    });
  }

  // Test sample data queries
  testSampleDataQueries() {
    return new Promise((resolve) => {
      console.log('\n📊 Testing sample data queries...');
      
      // Test users query
      this.db.get('SELECT COUNT(*) as count FROM users', (err, result) => {
        if (err) {
          console.log('❌ Sample data query test failed:', err.message);
          resolve(false);
          return;
        }

        console.log(`✅ Found ${result.count} users in database`);

        // Test leads query
        this.db.get('SELECT COUNT(*) as count FROM leads', (err, result) => {
          if (err) {
            console.log('❌ Sample data query test failed:', err.message);
            resolve(false);
            return;
          }

          console.log(`✅ Found ${result.count} leads in database`);

          // Test carriers query
          this.db.get('SELECT COUNT(*) as count FROM carriers', (err, result) => {
            if (err) {
              console.log('❌ Sample data query test failed:', err.message);
              resolve(false);
              return;
            }

            console.log(`✅ Found ${result.count} carriers in database`);

            // Test quotes query
            this.db.get('SELECT COUNT(*) as count FROM quotes', (err, result) => {
              if (err) {
                console.log('❌ Sample data query test failed:', err.message);
                resolve(false);
                return;
              }

              console.log(`✅ Found ${result.count} quotes in database`);

              // Test policies query
              this.db.get('SELECT COUNT(*) as count FROM policies', (err, result) => {
                if (err) {
                  console.log('❌ Sample data query test failed:', err.message);
                  resolve(false);
                  return;
                }

                console.log(`✅ Found ${result.count} policies in database`);

                // Test complex join query
                this.db.all(`
                  SELECT l.name, l.email, l.coverage_type, ld.vehicle_make, ld.vehicle_model
                  FROM leads l
                  LEFT JOIN lead_details ld ON l.lead_id = ld.lead_id
                  WHERE l.coverage_type = 'Auto'
                  LIMIT 3
                `, (err, results) => {
                  if (err) {
                    console.log('❌ Sample data query test failed:', err.message);
                    resolve(false);
                    return;
                  }

                  console.log(`✅ Complex join query returned ${results.length} auto insurance leads`);
                  
                  if (results.length > 0) {
                    console.log('   Sample results:');
                    results.forEach(lead => {
                      console.log(`   - ${lead.name}: ${lead.vehicle_make || 'N/A'} ${lead.vehicle_model || 'N/A'}`);
                    });
                  }

                  resolve(true);
                });
              });
            });
          });
        });
      });
    });
  }

  // Test CRUD operations
  testCRUDOperations() {
    return new Promise((resolve) => {
      console.log('\n🔧 Testing CRUD operations...');
      
      const testLeadId = 'test-lead-' + Date.now();
      const self = this;
      
      // Test INSERT
      this.db.run(`
        INSERT INTO leads (lead_id, name, email, phone, zip_code, coverage_type, status, source)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        testLeadId,
        'Test User',
        'test@example.com',
        '555-TEST',
        '12345',
        'Auto',
        'new',
        'test'
      ], function(err) {
        if (err) {
          console.log('❌ INSERT test failed:', err.message);
          resolve(false);
          return;
        }

        console.log(`✅ INSERT test successful - created lead with ID: ${testLeadId}`);

        // Test SELECT
        self.db.get('SELECT * FROM leads WHERE lead_id = ?', [testLeadId], (err, row) => {
          if (err) {
            console.log('❌ SELECT test failed:', err.message);
            resolve(false);
            return;
          }

          if (row) {
            console.log(`✅ SELECT test successful - retrieved lead: ${row.name}`);
          } else {
            console.log('❌ SELECT test failed - could not retrieve inserted lead');
            resolve(false);
            return;
          }

          // Test UPDATE
          self.db.run('UPDATE leads SET status = ? WHERE lead_id = ?', ['contacted', testLeadId], function(err) {
            if (err) {
              console.log('❌ UPDATE test failed:', err.message);
              resolve(false);
              return;
            }

            if (this.changes === 1) {
              console.log('✅ UPDATE test successful - lead status updated');
            } else {
              console.log('❌ UPDATE test failed - no rows updated');
              resolve(false);
              return;
            }

            // Test DELETE
            self.db.run('DELETE FROM leads WHERE lead_id = ?', [testLeadId], function(err) {
              if (err) {
                console.log('❌ DELETE test failed:', err.message);
                resolve(false);
                return;
              }

              if (this.changes === 1) {
                console.log('✅ DELETE test successful - test lead removed');
                resolve(true);
              } else {
                console.log('❌ DELETE test failed - no rows deleted');
                resolve(false);
              }
            });
          });
        });
      });
    });
  }

  // Test performance with sample queries
  testPerformance() {
    return new Promise((resolve) => {
      console.log('\n⚡ Testing query performance...');
      
      const startTime = Date.now();
      
      // Test complex analytics query
      this.db.all(`
        SELECT 
          event_type,
          COUNT(*) as event_count,
          DATE(created_at) as event_date
        FROM analytics_events 
        GROUP BY event_type, DATE(created_at)
        ORDER BY event_date DESC
      `, (err, results) => {
        if (err) {
          console.log('❌ Performance test failed:', err.message);
          resolve(false);
          return;
        }

        const queryTime = Date.now() - startTime;
        console.log(`✅ Analytics query completed in ${queryTime}ms - returned ${results.length} rows`);

        // Test lead status distribution query
        const statusStartTime = Date.now();
        this.db.all(`
          SELECT 
            status,
            COUNT(*) as count,
            ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM leads), 2) as percentage
          FROM leads 
          GROUP BY status
          ORDER BY count DESC
        `, (err, results) => {
          if (err) {
            console.log('❌ Performance test failed:', err.message);
            resolve(false);
            return;
          }

          const statusQueryTime = Date.now() - statusStartTime;
          console.log(`✅ Lead status query completed in ${statusQueryTime}ms`);
          
          if (results.length > 0) {
            console.log('   Status distribution:');
            results.forEach(status => {
              console.log(`   - ${status.status}: ${status.count} (${status.percentage}%)`);
            });
          }

          resolve(true);
        });
      });
    });
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

    for (const test of tests) {
      try {
        const result = await test.fn();
        if (result) {
          passedTests++;
        }
      } catch (error) {
        console.log(`❌ ${test.name} failed with error: ${error.message}`);
      }
    }

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
    return new Promise((resolve) => {
      console.log('\n📋 Sample Data Preview:');
      console.log('======================');

      // Show sample leads
      console.log('\n👥 Sample Leads:');
      this.db.all(`
        SELECT lead_id, name, email, coverage_type, status, created_at
        FROM leads 
        ORDER BY created_at DESC 
        LIMIT 3
      `, (err, results) => {
        if (err) {
          console.log('Error fetching leads:', err.message);
          resolve();
          return;
        }

        results.forEach(lead => {
          console.log(`- ${lead.name} (${lead.email}) - ${lead.coverage_type} - ${lead.status}`);
        });

        // Show sample quotes
        console.log('\n💰 Sample Quotes:');
        this.db.all(`
          SELECT q.quote_id, l.name, q.carrier_name, q.premium, q.status
          FROM quotes q
          JOIN leads l ON q.lead_id = l.lead_id
          ORDER BY q.created_at DESC
          LIMIT 3
        `, (err, results) => {
          if (err) {
            console.log('Error fetching quotes:', err.message);
            resolve();
            return;
          }

          results.forEach(quote => {
            console.log(`- ${quote.name} - ${quote.carrier_name} - $${quote.premium} - ${quote.status}`);
          });

          // Show sample policies
          console.log('\n📄 Sample Policies:');
          this.db.all(`
            SELECT p.policy_number, l.name, p.carrier_name, p.premium, p.status
            FROM policies p
            JOIN leads l ON p.lead_id = l.lead_id
            ORDER BY p.created_at DESC
            LIMIT 3
          `, (err, results) => {
            if (err) {
              console.log('Error fetching policies:', err.message);
              resolve();
              return;
            }

            results.forEach(policy => {
              console.log(`- ${policy.policy_number} - ${policy.name} - ${policy.carrier_name} - $${policy.premium} - ${policy.status}`);
            });

            resolve();
          });
        });
      });
    });
  }

  // Close database connection
  close() {
    this.generator.close();
  }
}

async function main() {
  const tester = new SimpleDatabaseTester();
  
  try {
    const args = process.argv.slice(2);
    
    if (args.includes('--preview') || args.includes('-p')) {
      await tester.displaySampleData();
    } else {
      const allTestsPassed = await tester.runAllTests();
      
      if (allTestsPassed) {
        await tester.displaySampleData();
      }
    }
    
  } catch (error) {
    console.error('❌ Database testing failed:', error);
    process.exit(1);
  } finally {
    // Close database connection
    tester.close();
  }
}

// Run the script
main();
