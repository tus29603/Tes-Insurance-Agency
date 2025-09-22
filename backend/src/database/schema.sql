-- Tes Insurance Agency Database Schema
-- SQLite Database Schema

-- Users table (for admin users)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT 1,
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Leads table (quote requests)
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id VARCHAR(36) UNIQUE NOT NULL, -- UUID
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    coverage_type VARCHAR(50) NOT NULL, -- Auto, Home, Commercial, etc.
    status VARCHAR(50) DEFAULT 'new', -- new, contacted, quoted, converted, closed
    source VARCHAR(100) DEFAULT 'website', -- website, referral, phone, etc.
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Lead details table (extended information)
CREATE TABLE IF NOT EXISTS lead_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id VARCHAR(36) NOT NULL,
    -- Personal Details
    date_of_birth DATE,
    gender VARCHAR(20),
    marital_status VARCHAR(50),
    occupation VARCHAR(100),
    -- Address Details
    street_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    -- Driver Details
    license_number VARCHAR(50),
    years_licensed INTEGER,
    violations TEXT,
    accidents TEXT,
    -- Vehicle Details
    vehicle_year VARCHAR(4),
    vehicle_make VARCHAR(100),
    vehicle_model VARCHAR(100),
    vin VARCHAR(17),
    mileage VARCHAR(20),
    vehicle_usage VARCHAR(100),
    garaging_address VARCHAR(255),
    -- Property Details
    property_address VARCHAR(255),
    year_built VARCHAR(4),
    -- Business Details
    business_name VARCHAR(255),
    dot_number VARCHAR(20),
    num_employees INTEGER,
    annual_payroll DECIMAL(15,2),
    operations TEXT,
    -- Coverage Details
    coverage_limits VARCHAR(100),
    deductible VARCHAR(50),
    -- Payment Details
    payment_method VARCHAR(50),
    billing_cycle VARCHAR(50),
    -- Emergency Contact
    emergency_name VARCHAR(255),
    emergency_phone VARCHAR(20),
    emergency_relationship VARCHAR(100),
    -- Additional Details
    additional_details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(lead_id) ON DELETE CASCADE
);

-- Quotes table
CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quote_id VARCHAR(36) UNIQUE NOT NULL, -- UUID
    lead_id VARCHAR(36) NOT NULL,
    carrier_name VARCHAR(100) NOT NULL,
    premium DECIMAL(10,2) NOT NULL,
    coverage_limits JSON, -- Store as JSON
    deductibles JSON, -- Store as JSON
    effective_date DATE,
    expiration_date DATE,
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, expired
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(lead_id) ON DELETE CASCADE
);

-- Policies table
CREATE TABLE IF NOT EXISTS policies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    policy_id VARCHAR(36) UNIQUE NOT NULL, -- UUID
    quote_id VARCHAR(36) NOT NULL,
    lead_id VARCHAR(36) NOT NULL,
    carrier_name VARCHAR(100) NOT NULL,
    policy_number VARCHAR(100) NOT NULL,
    premium DECIMAL(10,2) NOT NULL,
    effective_date DATE NOT NULL,
    expiration_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active', -- active, cancelled, expired, suspended
    documents JSON, -- Array of document URLs/paths
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quote_id) REFERENCES quotes(quote_id) ON DELETE CASCADE,
    FOREIGN KEY (lead_id) REFERENCES leads(lead_id) ON DELETE CASCADE
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message_id VARCHAR(36) UNIQUE NOT NULL, -- UUID
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new', -- new, read, replied, closed
    priority VARCHAR(20) DEFAULT 'normal', -- low, normal, high, urgent
    assigned_to INTEGER, -- User ID
    response TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
);

-- Analytics events table
CREATE TABLE IF NOT EXISTS analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id VARCHAR(36) UNIQUE NOT NULL, -- UUID
    event_type VARCHAR(100) NOT NULL, -- page_view, cta_click, form_submission, etc.
    event_category VARCHAR(100),
    event_label VARCHAR(255),
    event_value DECIMAL(10,2),
    user_agent TEXT,
    ip_address VARCHAR(45),
    referrer VARCHAR(500),
    page_url VARCHAR(500),
    session_id VARCHAR(100),
    custom_data JSON, -- Additional event data
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Carriers table
CREATE TABLE IF NOT EXISTS carriers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    logo_url VARCHAR(500),
    website VARCHAR(500),
    phone VARCHAR(20),
    email VARCHAR(255),
    products JSON, -- Array of supported products
    api_enabled BOOLEAN DEFAULT 0,
    api_config JSON, -- API configuration
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    log_id VARCHAR(36) UNIQUE NOT NULL, -- UUID
    user_id INTEGER,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL, -- lead, quote, policy, user
    entity_id VARCHAR(36) NOT NULL,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_quotes_lead_id ON quotes(lead_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_policies_lead_id ON policies(lead_id);
CREATE INDEX IF NOT EXISTS idx_policies_status ON policies(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
