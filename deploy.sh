#!/bin/bash
set -e

echo "=========================================="
echo " Starting STALCI Automated Deployment"
echo "=========================================="

cd /software/stalci-showcase-studio

echo "1. Pulling latest code from main branch..."
git fetch origin main
git reset --hard origin/main

echo "2. Ensuring Postgres container is running..."
docker start stalci_postgres 2>/dev/null || docker run -d --name stalci_postgres --restart always -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password123 -e POSTGRES_DB=stalci_db -p 5435:5432 postgres:15-alpine

echo "3. Building Backend..."
cd /software/stalci-showcase-studio/stalci-backend
npm install
npx prisma generate
npm run build

echo "4. Building Admin Panel..."
cd /software/stalci-showcase-studio/stalci-admin-panel
npm install
npm run build

echo "5. Setting up Portfolio dependencies..."
cd /software/stalci-showcase-studio/stalci-portfolio
npm install

echo "6. Restarting services with PM2..."
cd /software/stalci-showcase-studio
pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js
pm2 save

echo "------------------------------------------------"
echo " All 3 projects deployed and updated live!"
echo " 1. Backend API: http://103.131.24.113:4001"
echo " 2. Portfolio App: http://103.131.24.113:4002"
echo " 3. Admin Panel: http://103.131.24.113:4003"
echo "------------------------------------------------"

