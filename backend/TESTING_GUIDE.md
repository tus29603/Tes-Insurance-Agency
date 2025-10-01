# Backend Testing Guide

## 🚀 Quick Start

### 1. Start the Backend Server
```bash
cd backend
npm run dev
```

The server will start on `http://localhost:3001`

### 2. Test Health Check
Open your browser or use curl:
```
http://localhost:3001/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-22T...",
  "uptime": 123.45,
  "environment": "development"
}
```

## 🧪 API Testing Methods

### Method 1: Browser Testing (Simple)
Open these URLs in your browser:

1. **Health Check**: http://localhost:3001/health
2. **API Root**: http://localhost:3001/api/quotes
3. **Contact Messages**: http://localhost:3001/api/contact
4. **Analytics**: http://localhost:3001/api/analytics/events

### Method 2: PowerShell Testing
```powershell
# Test health endpoint
Invoke-RestMethod -Uri "http://localhost:3001/health" -Method GET

# Test quotes endpoint
Invoke-RestMethod -Uri "http://localhost:3001/api/quotes" -Method GET

# Test contact endpoint
Invoke-RestMethod -Uri "http://localhost:3001/api/contact" -Method GET
```

### Method 3: Using Postman/Insomnia
Import these requests:

**GET Health Check**
- URL: `http://localhost:3001/health`
- Method: GET

**GET All Quotes**
- URL: `http://localhost:3001/api/quotes`
- Method: GET

**POST New Contact Message**
- URL: `http://localhost:3001/api/contact`
- Method: POST
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "subject": "Test Message",
  "message": "This is a test message"
}
```

## 📊 Database Testing

### Check Database Connection
```powershell
# Navigate to backend directory
cd backend

# Test database with SQLite
sqlite3 data/insurance.db "SELECT name FROM sqlite_master WHERE type='table';"
```

### View Data
```sql
-- Check leads table
SELECT * FROM leads LIMIT 5;

-- Check contact messages
SELECT * FROM contact_messages LIMIT 5;

-- Check analytics events
SELECT * FROM analytics_events LIMIT 5;
```

## 🔧 Comprehensive Testing Script

Create a test file `test-backend.ps1`:

```powershell
# Backend Testing Script
$baseUrl = "http://localhost:3001"

Write-Host "Testing Tes Insurance Backend API..." -ForegroundColor Green

# Test 1: Health Check
Write-Host "`n1. Testing Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET
    Write-Host "✅ Health Check: $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health Check Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Get Quotes
Write-Host "`n2. Testing Quotes Endpoint..." -ForegroundColor Yellow
try {
    $quotes = Invoke-RestMethod -Uri "$baseUrl/api/quotes" -Method GET
    Write-Host "✅ Quotes Endpoint: Found $($quotes.data.Count) quotes" -ForegroundColor Green
} catch {
    Write-Host "❌ Quotes Endpoint Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Get Contact Messages
Write-Host "`n3. Testing Contact Endpoint..." -ForegroundColor Yellow
try {
    $contacts = Invoke-RestMethod -Uri "$baseUrl/api/contact" -Method GET
    Write-Host "✅ Contact Endpoint: Found $($contacts.data.Count) messages" -ForegroundColor Green
} catch {
    Write-Host "❌ Contact Endpoint Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Post Contact Message
Write-Host "`n4. Testing Contact Form Submission..." -ForegroundColor Yellow
$contactData = @{
    name = "Test User"
    email = "test@example.com"
    subject = "API Test"
    message = "This is a test message from PowerShell"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/contact" -Method POST -Body $contactData -ContentType "application/json"
    Write-Host "✅ Contact Form: Message sent successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Contact Form Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Analytics Events
Write-Host "`n5. Testing Analytics Endpoint..." -ForegroundColor Yellow
try {
    $analytics = Invoke-RestMethod -Uri "$baseUrl/api/analytics/events" -Method GET
    Write-Host "✅ Analytics Endpoint: Found $($analytics.data.Count) events" -ForegroundColor Green
} catch {
    Write-Host "❌ Analytics Endpoint Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nBackend testing completed!" -ForegroundColor Green
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using port 3001
   netstat -ano | findstr :3001
   
   # Kill the process (replace PID)
   taskkill /PID <PID> /F
   ```

2. **Database Not Found**
   ```bash
   # The database will be created automatically on first run
   # Check if data directory exists
   ls backend/data/
   ```

3. **CORS Issues**
   - Check if frontend is running on port 3000
   - Verify CORS_ORIGIN in environment variables

4. **Module Not Found**
   ```bash
   cd backend
   npm install
   ```

### Check Logs
```bash
# Backend logs will show in the terminal where you ran npm run dev
# Look for:
# - Server startup messages
# - Database connection status
# - API request logs
# - Error messages
```

## ✅ Success Indicators

Your backend is working correctly if you see:

1. **Server Startup**:
   ```
   🚀 Tes Insurance Backend API running on port 3001
   📊 Environment: development
   🔗 Health check: http://localhost:3001/health
   ```

2. **Health Check Response**:
   ```json
   {
     "status": "healthy",
     "timestamp": "2025-01-22T...",
     "uptime": 123.45,
     "environment": "development"
   }
   ```

3. **Database Tables Created**:
   - leads
   - lead_details
   - quotes
   - contact_messages
   - analytics_events
   - users
   - audit_logs

## 🚀 Ready for Cloud Deployment

Once all tests pass, your backend is ready for cloud deployment! The backend includes:
- ✅ Database schema
- ✅ API endpoints
- ✅ Error handling
- ✅ Security features
- ✅ Monitoring capabilities

