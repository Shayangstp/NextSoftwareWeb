import createMiddleware from "next-intl/middleware";
import { NextResponse, NextRequest } from "next/server";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["fa", "en"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "fa",
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

// export function middleware(request) {
//   const path = request.nextUrl.pathname;

//   const isPublicPath = path === "/login" || path === "/signup";

//   const token = request.cookies.get("token")?.value || "";

//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL("/", request.nextUrl));
//   }

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }
// }
