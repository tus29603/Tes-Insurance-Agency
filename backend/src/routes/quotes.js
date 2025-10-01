import express from 'express';
import { body, validationResult } from 'express-validator';
import crypto from 'crypto';
import dbConnection from '../database/connection.js';
import { validateLeadData } from '../middleware/validation.js';
import { auditLog } from '../middleware/auditLog.js';

const router = express.Router();

// Get all quotes (with pagination and filtering)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, coverage_type, search } = req.query;
    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE 1=1';
    const params = [];
    
    if (status) {
      whereClause += ' AND l.status = ?';
      params.push(status);
    }
    
    if (coverage_type) {
      whereClause += ' AND l.coverage_type = ?';
      params.push(coverage_type);
    }
    
    if (search) {
      whereClause += ' AND (l.name LIKE ? OR l.email LIKE ? OR l.phone LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM leads l 
      ${whereClause}
    `;
    const totalResult = dbConnection.prepare(countQuery).get(...params);
    const total = totalResult.total;
    
    // Get quotes with details
    const quotesQuery = `
      SELECT 
        l.lead_id,
        l.name,
        l.email,
        l.phone,
        l.zip_code,
        l.coverage_type,
        l.status,
        l.source,
        l.created_at,
        ld.street_address,
        ld.city,
        ld.state,
        ld.vehicle_year,
        ld.vehicle_make,
        ld.vehicle_model,
        ld.business_name
      FROM leads l
      LEFT JOIN lead_details ld ON l.lead_id = ld.lead_id
      ${whereClause}
      ORDER BY l.created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const quotes = dbConnection.prepare(quotesQuery).all(...params, limit, offset);
    
    res.json({
      success: true,
      data: quotes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quotes'
    });
  }
});

// Get single quote by ID
router.get('/:leadId', async (req, res) => {
  try {
    const { leadId } = req.params;
    
    const leadQuery = `
      SELECT 
        l.*,
        ld.*
      FROM leads l
      LEFT JOIN lead_details ld ON l.lead_id = ld.lead_id
      WHERE l.lead_id = ?
    `;
    
    const lead = dbConnection.prepare(leadQuery).get(leadId);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Quote not found'
      });
    }
    
    // Get associated quotes
    const quotesQuery = `
      SELECT * FROM quotes 
      WHERE lead_id = ? 
      ORDER BY created_at DESC
    `;
    const quotes = dbConnection.prepare(quotesQuery).all(leadId);
    
    res.json({
      success: true,
      data: {
        lead,
        quotes
      }
    });
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quote'
    });
  }
});

// Create new quote request
router.post('/', validateLeadData, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }
    
    const leadId = crypto.randomUUID();
    const { leadData, leadDetails } = req.body;
    
    // Insert lead
    const insertLead = dbConnection.prepare(`
      INSERT INTO leads (
        lead_id, name, email, phone, zip_code, coverage_type, 
        status, source, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    insertLead.run(
      leadId,
      leadData.name,
      leadData.email,
      leadData.phone,
      leadData.zip_code,
      leadData.coverage_type,
      leadData.status || 'new',
      leadData.source || 'website',
      leadData.notes || null
    );
    
    // Insert lead details
    const insertDetails = dbConnection.prepare(`
      INSERT INTO lead_details (
        lead_id, date_of_birth, gender, marital_status, occupation,
        street_address, city, state, license_number, years_licensed,
        violations, accidents, vehicle_year, vehicle_make, vehicle_model,
        vin, mileage, vehicle_usage, garaging_address, property_address,
        year_built, business_name, dot_number, num_employees, annual_payroll,
        operations, coverage_limits, deductible, payment_method, billing_cycle,
        emergency_name, emergency_phone, emergency_relationship, additional_details
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    insertDetails.run(
      leadId,
      leadDetails.date_of_birth || null,
      leadDetails.gender || null,
      leadDetails.marital_status || null,
      leadDetails.occupation || null,
      leadDetails.street_address || null,
      leadDetails.city || null,
      leadDetails.state || null,
      leadDetails.license_number || null,
      leadDetails.years_licensed || null,
      leadDetails.violations || null,
      leadDetails.accidents || null,
      leadDetails.vehicle_year || null,
      leadDetails.vehicle_make || null,
      leadDetails.vehicle_model || null,
      leadDetails.vin || null,
      leadDetails.mileage || null,
      leadDetails.vehicle_usage || null,
      leadDetails.garaging_address || null,
      leadDetails.property_address || null,
      leadDetails.year_built || null,
      leadDetails.business_name || null,
      leadDetails.dot_number || null,
      leadDetails.num_employees || null,
      leadDetails.annual_payroll || null,
      leadDetails.operations || null,
      leadDetails.coverage_limits || null,
      leadDetails.deductible || null,
      leadDetails.payment_method || null,
      leadDetails.billing_cycle || null,
      leadDetails.emergency_name || null,
      leadDetails.emergency_phone || null,
      leadDetails.emergency_relationship || null,
      leadDetails.additional_details || null
    );
    
    // Log the creation
    await auditLog({
      action: 'create',
      entity_type: 'lead',
      entity_id: leadId,
      new_values: { leadData, leadDetails }
    });
    
    res.status(201).json({
      success: true,
      data: {
        lead_id: leadId,
        message: 'Quote request created successfully'
      }
    });
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create quote request'
    });
  }
});

// Update quote status
router.patch('/:leadId/status', async (req, res) => {
  try {
    const { leadId } = req.params;
    const { status, notes } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }
    
    const updateQuery = dbConnection.prepare(`
      UPDATE leads 
      SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE lead_id = ?
    `);
    
    const result = updateQuery.run(status, notes || null, leadId);
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        error: 'Quote not found'
      });
    }
    
    // Log the update
    await auditLog({
      action: 'update',
      entity_type: 'lead',
      entity_id: leadId,
      new_values: { status, notes }
    });
    
    res.json({
      success: true,
      message: 'Quote status updated successfully'
    });
  } catch (error) {
    console.error('Error updating quote status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update quote status'
    });
  }
});

// Delete quote (soft delete by changing status)
router.delete('/:leadId', async (req, res) => {
  try {
    const { leadId } = req.params;
    
    const updateQuery = dbConnection.prepare(`
      UPDATE leads 
      SET status = 'closed', updated_at = CURRENT_TIMESTAMP 
      WHERE lead_id = ?
    `);
    
    const result = updateQuery.run(leadId);
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        error: 'Quote not found'
      });
    }
    
    // Log the deletion
    await auditLog({
      action: 'delete',
      entity_type: 'lead',
      entity_id: leadId
    });
    
    res.json({
      success: true,
      message: 'Quote closed successfully'
    });
  } catch (error) {
    console.error('Error closing quote:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to close quote'
    });
  }
});

export default router;
