import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that need protection
const isProtectedRoute = createRouteMatcher(["/account", "/checkout"]);

export default clerkMiddleware((auth, req) => {
  // Protect routes
  if (isProtectedRoute(req)) {
    auth().protect({
      unauthenticatedUrl: process.env.NEXT_PUBLIC_SERVER_URL,
      unauthorizedUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    });
  }
});

export const config = {
  // Always run for API routes and avoid interfering with static files
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
