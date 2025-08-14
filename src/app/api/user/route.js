import connectMongodb from "@/app/lib/mongobd";
import { NextResponse } from "next/server";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    // MongoDB কানেকশন
    await connectMongodb();

    // রিকোয়েস্ট বডি থেকে ডাটা নেওয়া
    const body = await req.json();
    const {
      name,
      title,
      bio,
      email,
      phone,
      mainImage,
      aboutImage,
      password,

      socialLinks,
    } = body;

    // চেক করো সব ফিল্ড এসেছে কিনা
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email এবং password আবশ্যক" },
        { status: 400 }
      );
    }

    // ইমেইল আগে থেকেই আছে কিনা চেক
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "এই ইমেইল দিয়ে ইউজার আগে থেকেই রেজিস্টার আছে" },
        { status: 409 }
      );
    }

    // পাসওয়ার্ড হ্যাশ করা
    const hashedPassword = await bcrypt.hash(password, 10);

    // নতুন ইউজার তৈরি
    const newUser = new User({
      name,
      title,
      bio,
      email,
      phone,
      mainImage,
      aboutImage,
      password: hashedPassword,

      socialLinks,
    });

    await newUser.save();

    // রেসপন্স
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
export async function GET(req) {
  try {
    await connectMongodb();
    const users = await User.find();

    // If no users are found, you might want to return an empty array and a 200 status
    if (!users || users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 200 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch users:", error); // console.log এর পরিবর্তে console.error ব্যবহার করা ভালো
    // On error, return a 500 status code with an error message
    return NextResponse.json(
      { message: "Failed to fetch users", error: error.message },
      { status: 500 }
    );
  }
}
