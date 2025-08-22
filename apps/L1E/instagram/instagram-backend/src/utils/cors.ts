export interface CorsConfig {
  allowedOrigins: string[];
  allowedMethods: string[];
  allowedHeaders: string[];
  credentials: boolean;
  maxAge: number;
}

// Default CORS configuration
export const defaultCorsConfig: CorsConfig = {
  allowedOrigins: process.env.NODE_ENV === 'production' 
    ? [
        'https://instagram-frontend-bv80chbm9-narangerels-projects.vercel.app',
        'https://your-production-domain.com', // Add your production frontend URL
        'http://localhost:4201', // Frontend development server
        'http://localhost:3000', // Alternative frontend port
      ]
    : ['*'],
  
  allowedMethods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin',
    'Cache-Control',
    'X-File-Name'
  ],
  credentials: true,
  maxAge: 86400, // 24 hours
};

// Helper function to get allowed origin
export function getAllowedOrigin(origin: string | null, config: CorsConfig): string {
  if (config.allowedOrigins.includes('*')) {
    return '*';
  }
  
  if (origin && config.allowedOrigins.includes(origin)) {
    return origin;
  }
  
  // Return first allowed origin as fallback
  return config.allowedOrigins[0];
}

// Create CORS headers for preflight response
export function createCorsHeaders(origin: string | null, config: CorsConfig) {
  const allowedOrigin = getAllowedOrigin(origin, config);
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': config.allowedMethods.join(', '),
    'Access-Control-Allow-Headers': config.allowedHeaders.join(', '),
    'Access-Control-Allow-Credentials': config.credentials.toString(),
    'Access-Control-Max-Age': config.maxAge.toString(),
  };
}

// Create security headers
export function createSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  };
}
