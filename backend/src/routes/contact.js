import express from 'express';
import crypto from 'crypto';
import dbConnection from '../database/connection.js';
import { validateContactMessage } from '../middleware/validation.js';
import { auditLog } from '../middleware/auditLog.js';

const router = express.Router();

// Get all contact messages
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, search } = req.query;
    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE 1=1';
    const params = [];
    
    if (status) {
      whereClause += ' AND status = ?';
      params.push(status);
    }
    
    if (priority) {
      whereClause += ' AND priority = ?';
      params.push(priority);
    }
    
    if (search) {
      whereClause += ' AND (name LIKE ? OR email LIKE ? OR subject LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM contact_messages 
      ${whereClause}
    `;
    const totalResult = dbConnection.prepare(countQuery).get(...params);
    const total = totalResult.total;
    
    // Get messages
    const messagesQuery = `
      SELECT 
        message_id,
        name,
        email,
        subject,
        message,
        status,
        priority,
        assigned_to,
        response,
        created_at,
        updated_at
      FROM contact_messages
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const messages = dbConnection.prepare(messagesQuery).all(...params, limit, offset);
    
    res.json({
      success: true,
      data: messages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact messages'
    });
  }
});

// Get single contact message
router.get('/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params;
    
    const messageQuery = `
      SELECT * FROM contact_messages 
      WHERE message_id = ?
    `;
    
    const message = dbConnection.prepare(messageQuery).get(messageId);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
    
    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Error fetching contact message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact message'
    });
  }
});

// Create new contact message
router.post('/', validateContactMessage, async (req, res) => {
  try {
    const messageId = crypto.randomUUID();
    const { name, email, subject, message, priority = 'normal' } = req.body;
    
    const insertMessage = dbConnection.prepare(`
      INSERT INTO contact_messages (
        message_id, name, email, subject, message, priority, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    insertMessage.run(
      messageId,
      name,
      email,
      subject || null,
      message,
      priority,
      'new'
    );
    
    // Log the creation
    await auditLog({
      action: 'create',
      entity_type: 'contact_message',
      entity_id: messageId,
      new_values: { name, email, subject, message, priority }
    });
    
    res.status(201).json({
      success: true,
      data: {
        message_id: messageId,
        message: 'Contact message created successfully'
      }
    });
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create contact message'
    });
  }
});

// Update message status
router.patch('/:messageId/status', async (req, res) => {
  try {
    const { messageId } = req.params;
    const { status, assigned_to, response } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }
    
    const updateQuery = dbConnection.prepare(`
      UPDATE contact_messages 
      SET status = ?, assigned_to = ?, response = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE message_id = ?
    `);
    
    const result = updateQuery.run(
      status,
      assigned_to || null,
      response || null,
      messageId
    );
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
    
    // Log the update
    await auditLog({
      action: 'update',
      entity_type: 'contact_message',
      entity_id: messageId,
      new_values: { status, assigned_to, response }
    });
    
    res.json({
      success: true,
      message: 'Message status updated successfully'
    });
  } catch (error) {
    console.error('Error updating message status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update message status'
    });
  }
});

// Delete message
router.delete('/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params;
    
    const deleteQuery = dbConnection.prepare(`
      DELETE FROM contact_messages 
      WHERE message_id = ?
    `);
    
    const result = deleteQuery.run(messageId);
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
    
    // Log the deletion
    await auditLog({
      action: 'delete',
      entity_type: 'contact_message',
      entity_id: messageId
    });
    
    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete message'
    });
  }
});

export default router;
