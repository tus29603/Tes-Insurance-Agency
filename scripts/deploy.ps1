# Tes Insurance Agency Deployment Script (PowerShell)
param(
    [Parameter(Mandatory=$false)]
    [string]$Environment = "production",
    
    [Parameter(Mandatory=$false)]
    [string]$Action = "deploy"
)

# Configuration
$DockerComposeFile = "docker-compose.yml"
$BackupDir = ".\backups"
$LogFile = ".\deploy.log"

# Logging functions
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogMessage = "[$Timestamp] [$Level] $Message"
    Write-Host $LogMessage
    Add-Content -Path $LogFile -Value $LogMessage
}

function Write-Error-Log {
    param([string]$Message)
    Write-Log $Message "ERROR"
    exit 1
}

function Write-Warning-Log {
    param([string]$Message)
    Write-Log $Message "WARNING"
}

# Check prerequisites
function Test-Prerequisites {
    Write-Log "Checking prerequisites..."
    
    # Check if Docker is installed
    try {
        docker --version | Out-Null
        Write-Log "Docker is installed"
    }
    catch {
        Write-Error-Log "Docker is not installed or not in PATH"
    }
    
    # Check if Docker Compose is installed
    try {
        docker-compose --version | Out-Null
        Write-Log "Docker Compose is installed"
    }
    catch {
        Write-Error-Log "Docker Compose is not installed or not in PATH"
    }
    
    # Check if .env file exists
    if (-not (Test-Path ".env")) {
        Write-Error-Log ".env file not found. Please create one from .env.example"
    }
    
    Write-Log "Prerequisites check passed"
}

# Backup current deployment
function Backup-Current {
    Write-Log "Creating backup of current deployment..."
    
    # Create backup directory
    $BackupPath = Join-Path $BackupDir (Get-Date -Format "yyyyMMdd_HHmmss")
    New-Item -ItemType Directory -Path $BackupPath -Force | Out-Null
    
    # Backup database
    if (Test-Path "data\insurance.db") {
        Copy-Item "data\insurance.db" "$BackupPath\insurance.db"
        Write-Log "Database backed up to $BackupPath\insurance.db"
    }
    
    # Backup configuration files
    Copy-Item ".env" "$BackupPath\.env"
    Copy-Item "docker-compose.yml" "$BackupPath\docker-compose.yml"
    
    Write-Log "Backup completed: $BackupPath"
}

# Pull latest changes
function Get-LatestChanges {
    Write-Log "Pulling latest changes from repository..."
    
    try {
        git fetch origin
        git checkout main
        git pull origin main
        Write-Log "Latest changes pulled successfully"
    }
    catch {
        Write-Error-Log "Failed to pull latest changes: $_"
    }
}

# Deploy application
function Deploy-Application {
    Write-Log "Starting deployment to $Environment environment..."
    
    try {
        # Stop existing containers
        Write-Log "Stopping existing containers..."
        docker-compose down
        
        # Pull latest images
        Write-Log "Pulling latest Docker images..."
        docker-compose pull
        
        # Build custom images
        Write-Log "Building custom images..."
        docker-compose build --no-cache
        
        # Start services
        Write-Log "Starting services..."
        docker-compose up -d
        
        # Wait for services to be ready
        Write-Log "Waiting for services to be ready..."
        Start-Sleep -Seconds 30
        
        # Health check
        Test-Health
        
        Write-Log "Deployment completed successfully!"
    }
    catch {
        Write-Error-Log "Deployment failed: $_"
    }
}

# Health check
function Test-Health {
    Write-Log "Performing health checks..."
    
    # Check frontend
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000/health" -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Log "Frontend health check passed"
        } else {
            Write-Error-Log "Frontend health check failed"
        }
    }
    catch {
        Write-Error-Log "Frontend health check failed: $_"
    }
    
    # Check backend
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3001/health" -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            Write-Log "Backend health check passed"
        } else {
            Write-Error-Log "Backend health check failed"
        }
    }
    catch {
        Write-Error-Log "Backend health check failed: $_"
    }
    
    Write-Log "All health checks passed"
}

# Cleanup old images
function Remove-OldImages {
    Write-Log "Cleaning up old Docker images..."
    
    try {
        # Remove unused images
        docker image prune -f
        
        # Remove old backups (keep last 7 days)
        $CutoffDate = (Get-Date).AddDays(-7)
        Get-ChildItem -Path $BackupDir -Directory | Where-Object { $_.CreationTime -lt $CutoffDate } | Remove-Item -Recurse -Force
        
        Write-Log "Cleanup completed"
    }
    catch {
        Write-Warning-Log "Cleanup failed: $_"
    }
}

# Rollback function
function Invoke-Rollback {
    Write-Log "Rolling back to previous version..."
    
    try {
        # Stop current containers
        docker-compose down
        
        # Find latest backup
        $LatestBackup = Get-ChildItem -Path $BackupDir -Directory | Sort-Object CreationTime -Descending | Select-Object -First 1
        
        if (-not $LatestBackup) {
            Write-Error-Log "No backup found for rollback"
        }
        
        # Restore database
        if (Test-Path "$($LatestBackup.FullName)\insurance.db") {
            Copy-Item "$($LatestBackup.FullName)\insurance.db" "data\insurance.db"
            Write-Log "Database restored from backup"
        }
        
        # Restore configuration
        Copy-Item "$($LatestBackup.FullName)\.env" ".env"
        Copy-Item "$($LatestBackup.FullName)\docker-compose.yml" "docker-compose.yml"
        
        # Start services
        docker-compose up -d
        
        Write-Log "Rollback completed"
    }
    catch {
        Write-Error-Log "Rollback failed: $_"
    }
}

# Main execution
function Main {
    Write-Log "Starting Tes Insurance Agency deployment script"
    
    switch ($Action.ToLower()) {
        "deploy" {
            Test-Prerequisites
            Backup-Current
            Get-LatestChanges
            Deploy-Application
            Remove-OldImages
        }
        "rollback" {
            Invoke-Rollback
        }
        "health" {
            Test-Health
        }
        "backup" {
            Backup-Current
        }
        default {
            Write-Host "Usage: .\deploy.ps1 [-Action {deploy|rollback|health|backup}] [-Environment production]"
            Write-Host "  deploy  - Deploy the application"
            Write-Host "  rollback - Rollback to previous version"
            Write-Host "  health  - Check application health"
            Write-Host "  backup  - Create backup of current deployment"
            exit 1
        }
    }
}

# Run main function
Main
