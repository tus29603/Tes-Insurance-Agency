#!/usr/bin/env node

import SimpleSampleDataGenerator from './simple-sample-data.js';

async function main() {
  const generator = new SimpleSampleDataGenerator();
  
  try {
    console.log('🌱 Tes Insurance Agency - Database Seeding Script');
    console.log('================================================\n');

    // Check if we should clear existing data
    const args = process.argv.slice(2);
    const shouldClear = args.includes('--clear') || args.includes('-c');
    
    if (shouldClear) {
      console.log('⚠️  Clearing existing data...');
      generator.clearAllSampleData();
      console.log('');
    }

    // Generate sample data
    await generator.generateAllSampleData();
    
    // Display summary
    generator.displayDataSummary();
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n💡 Tips:');
    console.log('- Use --clear or -c flag to clear existing data before seeding');
    console.log('- Check the database with: SELECT * FROM leads LIMIT 5;');
    console.log('- Test the API endpoints with the sample data');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  } finally {
    // Close database connection
    generator.close();
  }
}

// Run the script
main();
