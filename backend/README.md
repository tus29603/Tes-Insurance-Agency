# Tes Insurance Agency Backend API

A comprehensive backend API for the Tes Insurance Agency website, built with Node.js, Express, and SQLite.

## Features

- **Lead Management**: Store and manage insurance quote requests
- **Contact System**: Handle contact form submissions
- **Analytics Tracking**: Track user interactions and events
- **Admin Dashboard**: Administrative interface for managing data
- **Audit Logging**: Complete audit trail of all changes
- **Authentication**: JWT-based authentication system
- **Rate Limiting**: Protect against abuse
- **Data Validation**: Comprehensive input validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite with better-sqlite3
- **Authentication**: JWT
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start the server:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Quotes
- `GET /api/quotes` - Get all quotes (with pagination)
- `GET /api/quotes/:leadId` - Get single quote
- `POST /api/quotes` - Create new quote request
- `PATCH /api/quotes/:leadId/status` - Update quote status
- `DELETE /api/quotes/:leadId` - Close quote

### Contact
- `GET /api/contact` - Get all contact messages
- `GET /api/contact/:messageId` - Get single message
- `POST /api/contact` - Create new contact message
- `PATCH /api/contact/:messageId/status` - Update message status
- `DELETE /api/contact/:messageId` - Delete message

### Analytics
- `POST /api/analytics/track` - Track analytics event
- `GET /api/analytics/events` - Get analytics events
- `GET /api/analytics/summary` - Get analytics summary

### Admin
- `POST /api/admin/register` - Register admin user
- `POST /api/admin/login` - Login admin user
- `GET /api/admin/dashboard` - Get dashboard data
- `GET /api/admin/health` - Get system health

## Database Schema

The API uses SQLite with the following main tables:

- **users** - Admin users
- **leads** - Insurance quote requests
- **lead_details** - Extended lead information
- **quotes** - Generated quotes
- **policies** - Active policies
- **contact_messages** - Contact form submissions
- **analytics_events** - User interaction tracking
- **carriers** - Insurance carriers
- **audit_logs** - System audit trail

## Environment Variables

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=./data/insurance.db

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# CORS
CORS_ORIGIN=http://localhost:3000,https://tesinsurance.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Development

### Scripts

```bash
npm run dev      # Start with nodemon
npm start        # Start production server
npm test         # Run tests
npm run migrate  # Run database migrations
npm run seed     # Seed database with sample data
```

### Database Management

The database is automatically initialized on first run. The schema is defined in `src/database/schema.sql`.

### Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent abuse
- **Input Validation**: Comprehensive validation
- **SQL Injection Protection**: Parameterized queries
- **JWT Authentication**: Secure token-based auth
- **Audit Logging**: Complete activity tracking

## Deployment

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### Environment Setup

1. Set up your environment variables
2. Ensure database directory is writable
3. Configure CORS origins for your frontend
4. Set up proper JWT secrets

## Monitoring

- Health check endpoint: `/health`
- Admin health: `/api/admin/health`
- Request logging enabled
- Error tracking and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details
