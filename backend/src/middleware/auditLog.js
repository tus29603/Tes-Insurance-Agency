import { v4 as uuidv4 } from 'uuid';
import dbConnection from '../database/connection.js';

// Audit logging middleware
export const auditLog = async (logData) => {
  try {
    const {
      action,
      entity_type,
      entity_id,
      old_values = null,
      new_values = null,
      user_id = null,
      ip_address = null,
      user_agent = null
    } = logData;
    
    const logId = uuidv4();
    
    const insertAuditLog = dbConnection.prepare(`
      INSERT INTO audit_logs (
        log_id, user_id, action, entity_type, entity_id,
        old_values, new_values, ip_address, user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    insertAuditLog.run(
      logId,
      user_id,
      action,
      entity_type,
      entity_id,
      old_values ? JSON.stringify(old_values) : null,
      new_values ? JSON.stringify(new_values) : null,
      ip_address,
      user_agent
    );
    
    console.log(`📝 Audit log created: ${action} ${entity_type} ${entity_id}`);
  } catch (error) {
    console.error('❌ Failed to create audit log:', error);
    // Don't throw error to avoid breaking the main flow
  }
};
