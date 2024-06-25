import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { users } from "@/utils/data"
import { isLoggedIn } from "./services/authService";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  const adminRoutes = ["/CreateEvent", "/ManageEvents", "/ManageUsers", "/ReportsAndAnalysis"]
  const studentRoutes = ["/AttendedEvents", "/JoinEvents", "/QRCode", "/RegisteredEvents"]

  if (!token && pathname === "/SignUp") {
    return NextResponse.next()
  }

  if (!token && pathname !== "/Login") {
    return NextResponse.redirect(new URL("/Login", request.url))
  }

  if (token && (pathname === "/Login" || pathname === "/SignUp")) {
    return NextResponse.redirect(new URL("/Dashboard", request.url))
  }

  if (token) {
    const user = JSON.parse(token.value);
    if (adminRoutes.includes(pathname) && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/Dashboard", request.url));
    }

    if (studentRoutes.includes(pathname) && user.role !== "STUDENT") {
      return NextResponse.redirect(new URL("/Dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/SignUp",
    "/Login",
    "/Profile",
    "/Dashboard",
    "/CreateEvent",
    "/ManageEvents",
    "/ManageUsers",
    "/ReportsAndAnalysis",
    "/AttendedEvents",
    "/JoinEvents",
    "/QRCode",
    "/RegisteredEvents"
  ],
};
