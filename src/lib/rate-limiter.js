const requestLog = new Map();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 20; // 20 messages per hour

/**
 * Clean up old entries from request log (prevent memory bloat)
 * Runs periodically to remove expired timestamps
 */
function cleanupOldEntries() {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW;

  for (const [ip, timestamps] of requestLog.entries()) {
    // Filter out timestamps older than the window
    const recentTimestamps = timestamps.filter((t) => t > cutoff);

    if (recentTimestamps.length === 0) {
      // No recent requests, remove this IP entirely
      requestLog.delete(ip);
    } else {
      // Update with only recent timestamps
      requestLog.set(ip, recentTimestamps);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupOldEntries, 5 * 60 * 1000);

/**
 * Check if a request should be rate limited
 * @param {string} ip - User's IP address
 * @returns {Object} { allowed: boolean, remaining: number, resetTime: number }
 */
export function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  // Get existing requests for this IP
  const requests = requestLog.get(ip) || [];

  // Filter to only requests within the current window
  const recentRequests = requests.filter(
    (timestamp) => timestamp > windowStart,
  );

  // Check if limit exceeded
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    // Find when the oldest request in window will expire
    const oldestRequest = Math.min(...recentRequests);
    const resetTime = oldestRequest + RATE_LIMIT_WINDOW;

    return {
      allowed: false,
      remaining: 0,
      resetTime,
      message: `Rate limit exceeded. You can send ${MAX_REQUESTS_PER_WINDOW} messages per hour. Try again in ${Math.ceil((resetTime - now) / 60000)} minutes.`,
    };
  }

  // Add current request timestamp
  recentRequests.push(now);
  requestLog.set(ip, recentRequests);

  // Calculate remaining requests
  const remaining = MAX_REQUESTS_PER_WINDOW - recentRequests.length;

  return {
    allowed: true,
    remaining,
    resetTime: now + RATE_LIMIT_WINDOW,
    message: null,
  };
}

/**
 * Get the user's IP address from the request
 * @param {Request} request - Next.js request object
 * @returns {string} IP address
 */
export function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can be a comma-separated list (proxies)
    return forwarded.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // Fallback (shouldn't happen on Vercel)
  return "unknown";
}

/**
 * Get current rate limit status for an IP (for debugging)
 * @param {string} ip - User's IP address
 * @returns {Object} Current status
 */
export function getRateLimitStatus(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  const requests = requestLog.get(ip) || [];
  const recentRequests = requests.filter((t) => t > windowStart);

  return {
    requestCount: recentRequests.length,
    limit: MAX_REQUESTS_PER_WINDOW,
    remaining: MAX_REQUESTS_PER_WINDOW - recentRequests.length,
    windowMinutes: RATE_LIMIT_WINDOW / 60000,
  };
}
