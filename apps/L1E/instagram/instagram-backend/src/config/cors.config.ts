import { CorsConfig } from '../utils/cors';

// Environment-specific CORS configurations
export const corsConfigs: Record<string, CorsConfig> = {
  development: {
    allowedOrigins: [
      'http://localhost:4201', // Frontend development server
      'http://localhost:3000', // Alternative frontend port
      'http://localhost:4200', // Backend development server
      'http://127.0.0.1:4201',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:4200',
    ],
    allowedMethods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cache-Control',
      'X-File-Name',
      'Apollo-Require-Preflight'
    ],
    credentials: true,
    maxAge: 86400, // 24 hours
  },
  
  production: {
    allowedOrigins: [
      'https://instagram-frontend-bv80chbm9-narangerels-projects.vercel.app',
      'https://your-production-domain.com', // Replace with your actual production domain
      'https://your-staging-domain.com', // Replace with your staging domain if needed
    ],
    allowedMethods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cache-Control',
      'Apollo-Require-Preflight'
    ],
    credentials: true,
    maxAge: 86400, // 24 hours
  },
  
  testing: {
    allowedOrigins: ['*'],
    allowedMethods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cache-Control',
    ],
    credentials: false,
    maxAge: 0, // No caching for tests
  }
};

// Get the appropriate CORS config based on environment
export function getCorsConfig(): CorsConfig {
  const env = process.env.NODE_ENV || 'development';
  return corsConfigs[env] || corsConfigs.development;
}

// Custom CORS config for specific use cases
export function createCustomCorsConfig(
  origins: string[],
  methods: string[] = ['GET', 'POST', 'OPTIONS'],
  headers: string[] = ['Content-Type', 'Authorization'],
  credentials: boolean = true
): CorsConfig {
  return {
    allowedOrigins: origins,
    allowedMethods: methods,
    allowedHeaders: headers,
    credentials,
    maxAge: 86400,
  };
}
