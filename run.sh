#!/bin/bash
# Vigil - Quick Start Script

echo "🕯️ Starting Vigil MVP Setup..."
echo "Checking dependencies..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please use the Node.js installation method in the README."
    exit 1
fi

echo "✅ Docker found. Building the Next.js production image..."
cd frontend || { echo "❌ Could not find frontend directory"; exit 1; }

docker build -t vigil-frontend .

echo ""
echo "========================================================"
echo "✅ Build Complete!"
echo "🚀 Starting the Vigil Server..."
echo "🌐 Open your browser to: http://localhost:3000"
echo "🛑 Press Ctrl+C to stop the server."
echo "========================================================"
echo ""

docker run -p 3000:3000 vigil-frontend
