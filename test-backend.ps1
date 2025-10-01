# Tes Insurance Backend Testing Script
$baseUrl = "http://localhost:3001"

Write-Host "Testing Tes Insurance Backend API..." -ForegroundColor Green

# Test 1: Health Check
Write-Host "`n1. Testing Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET
    Write-Host "✅ Health Check: $($health.status)" -ForegroundColor Green
    Write-Host "   Uptime: $($health.uptime) seconds" -ForegroundColor Gray
    Write-Host "   Environment: $($health.environment)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Health Check Failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Make sure the backend server is running on port 3001" -ForegroundColor Red
}

# Test 2: Get Quotes
Write-Host "`n2. Testing Quotes Endpoint..." -ForegroundColor Yellow
try {
    $quotes = Invoke-RestMethod -Uri "$baseUrl/api/quotes" -Method GET
    Write-Host "✅ Quotes Endpoint: Found $($quotes.data.Count) quotes" -ForegroundColor Green
    Write-Host "   Total pages: $($quotes.pagination.pages)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Quotes Endpoint Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Get Contact Messages
Write-Host "`n3. Testing Contact Endpoint..." -ForegroundColor Yellow
try {
    $contacts = Invoke-RestMethod -Uri "$baseUrl/api/contact" -Method GET
    Write-Host "✅ Contact Endpoint: Found $($contacts.data.Count) messages" -ForegroundColor Green
    Write-Host "   Total pages: $($contacts.pagination.pages)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Contact Endpoint Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Post Contact Message
Write-Host "`n4. Testing Contact Form Submission..." -ForegroundColor Yellow
$contactData = @{
    name = "Test User"
    email = "test@example.com"
    subject = "API Test"
    message = "This is a test message from PowerShell script"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/contact" -Method POST -Body $contactData -ContentType "application/json"
    Write-Host "✅ Contact Form: Message sent successfully" -ForegroundColor Green
    Write-Host "   Message ID: $($response.data.message_id)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Contact Form Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Analytics Events
Write-Host "`n5. Testing Analytics Endpoint..." -ForegroundColor Yellow
try {
    $analytics = Invoke-RestMethod -Uri "$baseUrl/api/analytics/events" -Method GET
    Write-Host "✅ Analytics Endpoint: Found $($analytics.data.Count) events" -ForegroundColor Green
    Write-Host "   Total pages: $($analytics.pagination.pages)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Analytics Endpoint Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: Post Analytics Event
Write-Host "`n6. Testing Analytics Event Submission..." -ForegroundColor Yellow
$analyticsData = @{
    event_type = "test_event"
    event_category = "testing"
    event_label = "powershell_test"
    event_value = 1
    page_url = "http://localhost:3000"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/analytics/track" -Method POST -Body $analyticsData -ContentType "application/json"
    Write-Host "✅ Analytics Event: Event tracked successfully" -ForegroundColor Green
    Write-Host "   Event ID: $($response.data.event_id)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Analytics Event Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 Backend testing completed!" -ForegroundColor Green
Write-Host "If all tests passed, your backend is ready for cloud deployment!" -ForegroundColor Cyan

