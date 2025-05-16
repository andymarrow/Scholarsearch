import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // Determine if it's development environment
  const isDevelopment = process.env.NODE_ENV === 'development';

  const scriptSrc = `'self' 'unsafe-inline' ${isDevelopment ? "'unsafe-eval'" : ""}`.trim();

  const cspDirectives = [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'", // 'unsafe-inline' for styles is also common, but try to remove if possible with specific hashes/nonces later
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self' https://api.semanticscholar.org https://generativelanguage.googleapis.com",
    "object-src 'none'", // Good to add explicitly
    "base-uri 'self'",   // Good to add explicitly
    "form-action 'self'",// Good to add explicitly
  ];

  response.headers.set(
    "Content-Security-Policy",
    cspDirectives.join("; ")
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};