# Render Deployment Configuration

## Backend Service Configuration

### Build Command
```bash
npm install
```

### Start Command
```bash
npm start
```

### Environment Variables
Set these in your Render dashboard:

#### Required Variables
```
NODE_ENV=production
PORT=10000
```

#### Database Configuration
```
DATABASE_URL=/opt/render/project/src/data/insurance.db
```

#### CORS Configuration
```
CORS_ORIGIN=https://tes-insurance-agency.vercel.app,https://tesinsurance.com
```

#### Rate Limiting
```
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Security
```
JWT_SECRET=your-super-secret-jwt-key-here
BCRYPT_ROUNDS=12
```

#### Email Configuration (Optional)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Render Service Settings
- **Runtime**: Node.js
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free tier (or higher for production)
- **Auto-Deploy**: Yes (from main branch)

### Database Setup
The SQLite database will be automatically created and seeded on first deployment.

### Health Check
The service includes a health check endpoint at `/health` that Render can use for monitoring.

### API Endpoints
- `/api/quotes` - Quote management
- `/api/contact` - Contact form handling
- `/api/analytics` - Analytics tracking
- `/api/admin` - Admin operations
- `/health` - Health check

### Deployment Steps
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Select your repository
4. Configure the settings above
5. Set environment variables
6. Deploy

### Post-Deployment
1. Test the health endpoint: `https://your-service.onrender.com/health`
2. Test API endpoints with sample data
3. Update frontend CORS settings if needed
