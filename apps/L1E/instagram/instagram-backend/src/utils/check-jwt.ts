export function getJwtSecret(): string {
    const devFallback = process.env.NODE_ENV !== 'production' ? 'dev-secret' : undefined;
    const secret = process.env.JWT_SECRET ?? devFallback;
    if (!secret) {
        throw new Error("JWT_SECRET not configured");
    }
    return secret;
}