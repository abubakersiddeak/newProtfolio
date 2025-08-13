import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authOptions from "./auth.config";

const { auth } = NextAuth(authOptions);

export default auth((req) => {
  const session = req.auth;
  const { pathname } = req.nextUrl;

  const user = session?.user;
  const userRole = session?.user?.role;
  if (pathname === "/dashboard") {
    if (userRole === "admin") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
});
export const config = {
  matcher: ["/dashboard"],
};
