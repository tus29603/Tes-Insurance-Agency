# Tes Insurance Agency - Database Testing Script
# This script helps you test the database with sample data

Write-Host "🏢 Tes Insurance Agency - Database Testing" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "backend/package.json")) {
    Write-Host "❌ Error: Please run this script from the project root directory" -ForegroundColor Red
    Write-Host "   Current directory: $(Get-Location)" -ForegroundColor Yellow
    Write-Host "   Expected: Tes-Insurance-Agency/" -ForegroundColor Yellow
    exit 1
}

# Navigate to backend directory
Set-Location backend

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🌱 Seeding database with sample data..." -ForegroundColor Yellow
npm run seed

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to seed database" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🧪 Running database tests..." -ForegroundColor Yellow
npm run test:db

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Database tests failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Database testing completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Next steps:" -ForegroundColor Cyan
Write-Host "   - Start the backend server: npm run dev" -ForegroundColor White
Write-Host "   - Test API endpoints with the sample data" -ForegroundColor White
Write-Host "   - View sample data: npm run test:db:preview" -ForegroundColor White
Write-Host "   - Clear and reseed: npm run seed:clear" -ForegroundColor White

# Return to project root
Set-Location ..
