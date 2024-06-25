import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { users } from "@/utils/data"
import { isLoggedIn } from "./services/authService";

const properCasing = (path: string) => {
  const parts = path.split('/').filter(Boolean);
  return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('/');
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;
  

  const adminRoutes = ["/CreateEvent", "/ManageEvents", "/ManageUsers", "/ReportsAndAnalysis"]
  const studentRoutes = ["/AttendedEvents", "/JoinEvents", "/QRCode", "/RegisteredEvents"]

  if (!token && pathname.toLowerCase() === "/signup") {
    return NextResponse.next();
  }

  if (!token && pathname.toLowerCase() !== "/login") {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  if (token && (pathname.toLowerCase() === "/login" || pathname.toLowerCase() === "/signup")) {
    return NextResponse.redirect(new URL("/Dashboard", request.url));
  }

  if (token) {
    const user = JSON.parse(token.value);
    if (adminRoutes.map(route => route.toLowerCase()).includes(pathname.toLowerCase()) && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/Dashboard", request.url));
    }

    if (studentRoutes.map(route => route.toLowerCase()).includes(pathname.toLowerCase()) && user.role !== "STUDENT") {
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
