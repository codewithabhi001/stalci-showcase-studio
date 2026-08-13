module.exports = {
  apps: [
    {
      name: 'stalci-backend',
      cwd: './stalci-backend',
      script: 'dist/src/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 4001,
        DATABASE_URL: 'postgresql://postgres:password123@localhost:5435/stalci_db?schema=public'
      },
      restart_delay: 3000,
      max_restarts: 10
    },
    {
      name: 'stalci-portfolio',
      cwd: './stalci-portfolio',
      script: 'node_modules/.bin/vite',
      args: '--port 4002 --host 0.0.0.0',
      env: {
        NODE_ENV: 'production',
        PORT: 4002
      },
      restart_delay: 3000,
      max_restarts: 10
    },
    {
      name: 'stalci-admin-panel',
      cwd: './stalci-admin-panel',
      script: 'node_modules/.bin/next',
      args: 'start -p 4003',
      env: {
        NODE_ENV: 'production',
        PORT: 4003,
        NEXT_PUBLIC_API_URL: 'http://localhost:4001'
      },
      restart_delay: 3000,
      max_restarts: 10
    }
  ]
};
