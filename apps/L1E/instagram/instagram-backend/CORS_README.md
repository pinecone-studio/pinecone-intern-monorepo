# CORS Configuration for Instagram Backend

This document explains how CORS (Cross-Origin Resource Sharing) is configured in the Instagram backend and how to customize it for your needs.

## Overview

The backend uses a flexible CORS configuration system that automatically adapts to different environments (development, production, testing) and provides security headers for enhanced protection.

## Files Structure

- `src/handler.ts` - Main API handler with CORS middleware
- `src/utils/cors.ts` - CORS utility functions
- `src/config/cors.config.ts` - Environment-specific CORS configurations

## Current Configuration

### Development Environment
- **Allowed Origins**: `http://localhost:4201`, `http://localhost:3000`, `http://localhost:4200`
- **Methods**: `GET`, `POST`, `OPTIONS`, `PUT`, `DELETE`, `PATCH`
- **Headers**: `Content-Type`, `Authorization`, `X-Requested-With`, `Accept`, `Origin`, `Cache-Control`, `X-File-Name`, `Apollo-Require-Preflight`
- **Credentials**: `true`
- **Max Age**: `86400` (24 hours)

### Production Environment
- **Allowed Origins**: `https://instagram-frontend-bv80chbm9-narangerels-projects.vercel.app`
- **Methods**: `GET`, `POST`, `OPTIONS`
- **Headers**: `Content-Type`, `Authorization`, `X-Requested-With`, `Accept`, `Origin`, `Cache-Control`, `Apollo-Require-Preflight`
- **Credentials**: `true`
- **Max Age**: `86400` (24 hours)

### Testing Environment
- **Allowed Origins**: `*` (all origins)
- **Methods**: `GET`, `POST`, `OPTIONS`, `PUT`, `DELETE`
- **Headers**: `Content-Type`, `Authorization`, `X-Requested-With`, `Accept`, `Origin`, `Cache-Control`
- **Credentials**: `false`
- **Max Age**: `0` (no caching)

## Security Headers

The following security headers are automatically added to all responses:

- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking attacks
- `X-XSS-Protection: 1; mode=block` - Enables XSS protection

## Customization

### Adding New Origins

To add new allowed origins, edit `src/config/cors.config.ts`:

```typescript
export const corsConfigs: Record<string, CorsConfig> = {
  development: {
    allowedOrigins: [
      'http://localhost:4201',
      'http://localhost:3000',
      'http://localhost:4200',
      'http://127.0.0.1:4201',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:4200',
      'https://your-new-domain.com', // Add your new domain here
    ],
    // ... rest of config
  },
  // ... other environments
};
```

### Creating Custom CORS Config

For specific use cases, you can create custom CORS configurations:

```typescript
import { createCustomCorsConfig } from './config/cors.config';

const customConfig = createCustomCorsConfig(
  ['https://specific-domain.com'],
  ['GET', 'POST'],
  ['Content-Type', 'Authorization'],
  true
);
```

### Environment Variables

The CORS configuration automatically detects the environment using `NODE_ENV`:

- `NODE_ENV=development` - Uses development config
- `NODE_ENV=production` - Uses production config
- `NODE_ENV=test` - Uses testing config

## Testing CORS

### Test Preflight Request
```bash
curl -X OPTIONS \
  -H "Origin: http://localhost:4201" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type, Authorization" \
  http://localhost:4200/api/graphql
```

### Test Actual Request
```bash
curl -X POST \
  -H "Origin: http://localhost:4201" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __typename }"}' \
  http://localhost:4200/api/graphql
```

## Troubleshooting

### Common Issues

1. **CORS Error in Browser**: Check if the origin is in the allowed origins list
2. **Preflight Failing**: Ensure OPTIONS method is allowed and headers are correct
3. **Credentials Not Working**: Make sure `credentials: true` is set and frontend includes `credentials: 'include'`

### Debug Mode

To enable CORS debugging, you can add logging to the handler:

```typescript
export async function handler(req: NextRequest) {
  const origin = req.headers.get('origin');
  console.log('Request origin:', origin);
  
  const corsConfig = getCorsConfig();
  console.log('CORS config:', corsConfig);
  
  // ... rest of handler
}
```

## Best Practices

1. **Never use `*` in production** - Always specify exact origins
2. **Use HTTPS in production** - All production origins should use HTTPS
3. **Minimize allowed methods** - Only allow the HTTP methods you actually use
4. **Regular security audits** - Review CORS configuration regularly
5. **Monitor CORS errors** - Log and monitor CORS-related errors in production

## Migration from Previous Setup

If you're migrating from the previous basic CORS setup:

1. The new system is backward compatible
2. All existing functionality is preserved
3. Additional security headers are automatically added
4. Environment-specific configurations are now available

## Support

For issues or questions about CORS configuration, check:
1. Browser developer tools for CORS errors
2. Server logs for CORS-related messages
3. Network tab for preflight request details
