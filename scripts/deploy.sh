#!/bin/bash

# Tes Insurance Agency Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-production}
DOCKER_COMPOSE_FILE="docker-compose.yml"
BACKUP_DIR="/backups"
LOG_FILE="/var/log/deploy.log"

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed"
    fi
    
    # Check if Docker Compose is installed
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed"
    fi
    
    # Check if .env file exists
    if [ ! -f ".env" ]; then
        error ".env file not found. Please create one from .env.example"
    fi
    
    log "Prerequisites check passed"
}

# Backup current deployment
backup_current() {
    log "Creating backup of current deployment..."
    
    # Create backup directory
    mkdir -p "$BACKUP_DIR/$(date +%Y%m%d_%H%M%S)"
    BACKUP_PATH="$BACKUP_DIR/$(date +%Y%m%d_%H%M%S)"
    
    # Backup database
    if [ -f "data/insurance.db" ]; then
        cp data/insurance.db "$BACKUP_PATH/insurance.db"
        log "Database backed up to $BACKUP_PATH/insurance.db"
    fi
    
    # Backup configuration files
    cp .env "$BACKUP_PATH/.env"
    cp docker-compose.yml "$BACKUP_PATH/docker-compose.yml"
    
    log "Backup completed: $BACKUP_PATH"
}

# Pull latest changes
pull_changes() {
    log "Pulling latest changes from repository..."
    
    git fetch origin
    git checkout main
    git pull origin main
    
    log "Latest changes pulled successfully"
}

# Build and deploy
deploy() {
    log "Starting deployment to $ENVIRONMENT environment..."
    
    # Stop existing containers
    log "Stopping existing containers..."
    docker-compose down
    
    # Pull latest images
    log "Pulling latest Docker images..."
    docker-compose pull
    
    # Build custom images
    log "Building custom images..."
    docker-compose build --no-cache
    
    # Start services
    log "Starting services..."
    docker-compose up -d
    
    # Wait for services to be ready
    log "Waiting for services to be ready..."
    sleep 30
    
    # Health check
    health_check
    
    log "Deployment completed successfully!"
}

# Health check
health_check() {
    log "Performing health checks..."
    
    # Check frontend
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        log "Frontend health check passed"
    else
        error "Frontend health check failed"
    fi
    
    # Check backend
    if curl -f http://localhost:3001/health > /dev/null 2>&1; then
        log "Backend health check passed"
    else
        error "Backend health check failed"
    fi
    
    # Check database
    if docker-compose exec -T backend sqlite3 /app/data/insurance.db "SELECT 1;" > /dev/null 2>&1; then
        log "Database health check passed"
    else
        error "Database health check failed"
    fi
    
    log "All health checks passed"
}

# Cleanup old images
cleanup() {
    log "Cleaning up old Docker images..."
    
    # Remove unused images
    docker image prune -f
    
    # Remove old backups (keep last 7 days)
    find "$BACKUP_DIR" -type d -mtime +7 -exec rm -rf {} \; 2>/dev/null || true
    
    log "Cleanup completed"
}

# Rollback function
rollback() {
    log "Rolling back to previous version..."
    
    # Stop current containers
    docker-compose down
    
    # Find latest backup
    LATEST_BACKUP=$(ls -t "$BACKUP_DIR" | head -n1)
    
    if [ -z "$LATEST_BACKUP" ]; then
        error "No backup found for rollback"
    fi
    
    # Restore database
    if [ -f "$BACKUP_DIR/$LATEST_BACKUP/insurance.db" ]; then
        cp "$BACKUP_DIR/$LATEST_BACKUP/insurance.db" data/insurance.db
        log "Database restored from backup"
    fi
    
    # Restore configuration
    cp "$BACKUP_DIR/$LATEST_BACKUP/.env" .env
    cp "$BACKUP_DIR/$LATEST_BACKUP/docker-compose.yml" docker-compose.yml
    
    # Start services
    docker-compose up -d
    
    log "Rollback completed"
}

# Main execution
main() {
    log "Starting Tes Insurance Agency deployment script"
    
    case "$1" in
        "deploy")
            check_prerequisites
            backup_current
            pull_changes
            deploy
            cleanup
            ;;
        "rollback")
            rollback
            ;;
        "health")
            health_check
            ;;
        "backup")
            backup_current
            ;;
        *)
            echo "Usage: $0 {deploy|rollback|health|backup}"
            echo "  deploy  - Deploy the application"
            echo "  rollback - Rollback to previous version"
            echo "  health  - Check application health"
            echo "  backup  - Create backup of current deployment"
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
