import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import dbConnection from '../database/connection.js';
import { validateAnalyticsEvent } from '../middleware/validation.js';

const router = express.Router();

// Track analytics event
router.post('/track', validateAnalyticsEvent, async (req, res) => {
  try {
    const eventId = uuidv4();
    const {
      event_type,
      event_category,
      event_label,
      event_value,
      page_url,
      session_id,
      custom_data
    } = req.body;
    
    const insertEvent = dbConnection.prepare(`
      INSERT INTO analytics_events (
        event_id, event_type, event_category, event_label, event_value,
        user_agent, ip_address, referrer, page_url, session_id, custom_data
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    insertEvent.run(
      eventId,
      event_type,
      event_category || null,
      event_label || null,
      event_value || null,
      req.get('User-Agent') || null,
      req.ip,
      req.get('Referer') || null,
      page_url || null,
      session_id || null,
      custom_data ? JSON.stringify(custom_data) : null
    );
    
    res.json({
      success: true,
      data: {
        event_id: eventId,
        message: 'Event tracked successfully'
      }
    });
  } catch (error) {
    console.error('Error tracking analytics event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track event'
    });
  }
});

// Get analytics data
router.get('/events', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      event_type,
      start_date,
      end_date,
      page_url
    } = req.query;
    
    const offset = (page - 1) * limit;
    let whereClause = 'WHERE 1=1';
    const params = [];
    
    if (event_type) {
      whereClause += ' AND event_type = ?';
      params.push(event_type);
    }
    
    if (start_date) {
      whereClause += ' AND created_at >= ?';
      params.push(start_date);
    }
    
    if (end_date) {
      whereClause += ' AND created_at <= ?';
      params.push(end_date);
    }
    
    if (page_url) {
      whereClause += ' AND page_url LIKE ?';
      params.push(`%${page_url}%`);
    }
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM analytics_events 
      ${whereClause}
    `;
    const totalResult = dbConnection.prepare(countQuery).get(...params);
    const total = totalResult.total;
    
    // Get events
    const eventsQuery = `
      SELECT 
        event_id,
        event_type,
        event_category,
        event_label,
        event_value,
        page_url,
        session_id,
        custom_data,
        created_at
      FROM analytics_events
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const events = dbConnection.prepare(eventsQuery).all(...params, limit, offset);
    
    res.json({
      success: true,
      data: events,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching analytics events:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics events'
    });
  }
});

// Get analytics summary
router.get('/summary', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    let whereClause = 'WHERE 1=1';
    const params = [];
    
    if (start_date) {
      whereClause += ' AND created_at >= ?';
      params.push(start_date);
    }
    
    if (end_date) {
      whereClause += ' AND created_at <= ?';
      params.push(end_date);
    }
    
    // Get event counts by type
    const eventTypesQuery = `
      SELECT 
        event_type,
        COUNT(*) as count
      FROM analytics_events
      ${whereClause}
      GROUP BY event_type
      ORDER BY count DESC
    `;
    
    const eventTypes = dbConnection.prepare(eventTypesQuery).all(...params);
    
    // Get page views
    const pageViewsQuery = `
      SELECT 
        page_url,
        COUNT(*) as views
      FROM analytics_events
      ${whereClause}
      AND event_type = 'page_view'
      GROUP BY page_url
      ORDER BY views DESC
      LIMIT 10
    `;
    
    const pageViews = dbConnection.prepare(pageViewsQuery).all(...params);
    
    // Get daily activity
    const dailyActivityQuery = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as events
      FROM analytics_events
      ${whereClause}
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT 30
    `;
    
    const dailyActivity = dbConnection.prepare(dailyActivityQuery).all(...params);
    
    res.json({
      success: true,
      data: {
        event_types: eventTypes,
        page_views: pageViews,
        daily_activity: dailyActivity
      }
    });
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics summary'
    });
  }
});

export default router;
