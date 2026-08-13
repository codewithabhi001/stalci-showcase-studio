#!/bin/bash
set -e

echo Starting STALCI Postgres database container...
docker start stalci_postgres 2>/dev/null || docker run -d --name stalci_postgres --restart always -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password123 -e POSTGRES_DB=stalci_db -p 5435:5432 postgres:15-alpine

echo Starting all 3 STALCI projects with PM2 using ecosystem.config.js...
cd /software/stalci-showcase-studio
pm2 start ecosystem.config.js
pm2 save

echo 
echo All 3 projects deployed and running!
echo ------------------------------------------------
echo 1. Backend API: http://103.131.24.113:4001
echo 2. Portfolio App: http://103.131.24.113:4002
echo 3. Admin Panel: http://103.131.24.113:4003
echo ------------------------------------------------
