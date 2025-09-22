# Infrastructure Documentation

This document describes the infrastructure setup for the Tes Insurance Agency platform.

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │   CDN/Static    │    │   Monitoring    │
│   (Nginx)       │    │   (GitHub Pages)│    │   (Grafana)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
         ┌─────────────────────────────────────────────┐
         │              Application Layer              │
         │  ┌─────────────┐    ┌─────────────────────┐ │
         │  │  Frontend   │    │      Backend API    │ │
         │  │  (React)    │    │    (Node.js/Express)│ │
         │  └─────────────┘    └─────────────────────┘ │
         └─────────────────────────────────────────────┘
                                 │
         ┌─────────────────────────────────────────────┐
         │              Data Layer                     │
         │  ┌─────────────┐    ┌─────────────────────┐ │
         │  │   SQLite    │    │       Redis          │ │
         │  │  Database   │    │      (Cache)         │ │
         │  └─────────────┘    └─────────────────────┘ │
         └─────────────────────────────────────────────┘
```

## Components

### Frontend
- **Technology**: React + Vite
- **Deployment**: GitHub Pages / Vercel
- **CDN**: GitHub Pages CDN
- **Build**: Automated via GitHub Actions

### Backend API
- **Technology**: Node.js + Express
- **Database**: SQLite with better-sqlite3
- **Authentication**: JWT
- **Deployment**: Docker containers

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **Monitoring**: Prometheus + Grafana
- **Caching**: Redis
- **CI/CD**: GitHub Actions

## Deployment Options

### Option 1: Docker Compose (Recommended for VPS)

```bash
# Clone repository
git clone https://github.com/tus29603/Tes-Insurance-Agency.git
cd Tes-Insurance-Agency

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start services
docker-compose up -d

# Check status
docker-compose ps
```

### Option 2: Kubernetes

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get services
```

### Option 3: Cloud Providers

#### AWS
- **Frontend**: S3 + CloudFront
- **Backend**: ECS Fargate
- **Database**: RDS PostgreSQL
- **Monitoring**: CloudWatch

#### Google Cloud
- **Frontend**: Firebase Hosting
- **Backend**: Cloud Run
- **Database**: Cloud SQL
- **Monitoring**: Google Cloud Monitoring

#### Azure
- **Frontend**: Static Web Apps
- **Backend**: Container Instances
- **Database**: Azure Database
- **Monitoring**: Application Insights

## Environment Configuration

### Required Environment Variables

```bash
# Server Configuration
NODE_ENV=production
PORT=3001

# Database
DATABASE_URL=./data/insurance.db

# Security
JWT_SECRET=your-super-secret-jwt-key
BCRYPT_ROUNDS=12

# CORS
CORS_ORIGIN=https://tesinsurance.com,https://www.tesinsurance.com

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Monitoring
GRAFANA_PASSWORD=your-grafana-password
```

## Monitoring Setup

### Prometheus Metrics

The application exposes metrics at `/metrics` endpoint:

- HTTP request metrics
- Database connection metrics
- Custom business metrics
- System resource metrics

### Grafana Dashboards

Pre-configured dashboards for:
- Application performance
- System resources
- Database metrics
- Error rates and response times

### Alerting

Configured alerts for:
- High error rates
- Slow response times
- Database connection issues
- High resource usage
- Service downtime

## Security Considerations

### SSL/TLS
- Automatic HTTPS redirect
- Strong cipher suites
- HSTS headers
- SSL certificate auto-renewal

### Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security

### Rate Limiting
- API endpoints: 10 requests/second
- General endpoints: 30 requests/second
- IP-based limiting

### Authentication
- JWT tokens with expiration
- Password hashing with bcrypt
- Role-based access control

## Backup Strategy

### Database Backups
```bash
# Daily automated backup
0 2 * * * sqlite3 /app/data/insurance.db ".backup /backups/insurance-$(date +%Y%m%d).db"
```

### File Backups
- Automated daily backups to cloud storage
- 30-day retention policy
- Point-in-time recovery

## Scaling Considerations

### Horizontal Scaling
- Load balancer with multiple backend instances
- Database read replicas
- CDN for static assets

### Vertical Scaling
- Increase container resources
- Optimize database queries
- Implement caching strategies

## Disaster Recovery

### RTO (Recovery Time Objective)
- Frontend: 5 minutes
- Backend: 15 minutes
- Database: 30 minutes

### RPO (Recovery Point Objective)
- Database: 1 hour
- Files: 24 hours

## Maintenance

### Regular Tasks
- Security updates
- Dependency updates
- Log rotation
- Database optimization
- Performance monitoring

### Monitoring
- Uptime monitoring
- Performance metrics
- Error tracking
- Resource utilization

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   ```bash
   # Check database file permissions
   ls -la /app/data/
   
   # Test database connection
   sqlite3 /app/data/insurance.db "SELECT 1;"
   ```

2. **High Memory Usage**
   ```bash
   # Check container memory usage
   docker stats
   
   # Restart services
   docker-compose restart
   ```

3. **SSL Certificate Issues**
   ```bash
   # Check certificate validity
   openssl x509 -in /etc/nginx/ssl/cert.pem -text -noout
   
   # Renew certificate
   certbot renew
   ```

### Log Locations
- Application logs: `/var/log/app/`
- Nginx logs: `/var/log/nginx/`
- System logs: `/var/log/syslog`

## Support

For infrastructure issues:
1. Check monitoring dashboards
2. Review application logs
3. Verify environment configuration
4. Contact system administrator
