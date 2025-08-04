import { NextResponse } from "next/server";
import connectMongodb from "@/app/lib/mongobd";
import Profile from "@/app/models/Profile";
import { generateToken } from "@/app/lib/auth";

export async function POST(req) {
  await connectMongodb();

  const { email, password } = await req.json();
  const user = await Profile.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await generateToken(user);

  const response = NextResponse.json({
    message: "Login successful",
    user: { name: user.name, email: user.email, role: user.role },
  });

  response.cookies.set("token", token, {
    expiresIn: "7d",
  });

  return response;
}
