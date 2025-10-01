#!/bin/bash

echo "=== Render Build Debug Script ==="
echo "Current directory: $(pwd)"
echo "Contents:"
ls -la

echo ""
echo "=== Checking package.json ==="
if [ -f "package.json" ]; then
    echo "Root package.json exists"
    echo "Scripts:"
    cat package.json | grep -A 20 '"scripts"'
else
    echo "No root package.json found"
fi

echo ""
echo "=== Checking backend directory ==="
if [ -d "backend" ]; then
    echo "Backend directory exists"
    echo "Backend contents:"
    ls -la backend/
    
    if [ -f "backend/package.json" ]; then
        echo "Backend package.json exists"
        echo "Backend dependencies:"
        cat backend/package.json | grep -A 15 '"dependencies"'
    else
        echo "No backend package.json found"
    fi
else
    echo "No backend directory found"
fi

echo ""
echo "=== Installing dependencies ==="
echo "Installing root dependencies..."
npm install

echo "Installing backend dependencies..."
cd backend && npm install && cd ..

echo ""
echo "=== Final check ==="
echo "Checking if express is available..."
if [ -d "backend/node_modules/express" ]; then
    echo "✅ Express is installed in backend"
else
    echo "❌ Express not found in backend"
fi

echo "Build debug complete"
