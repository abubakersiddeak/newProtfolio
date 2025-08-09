// import { NextResponse } from "next/server";
// import connectMongodb from "@/app/lib/mongobd";
// import Profile from "@/app/models/Profile";
// import { signToken } from "@/app/lib/jwt";

// export async function POST(req) {
//   await connectMongodb();
//   console.log("helllo");

//   try {
//     const {
//       name,
//       email,
//       password,

//       title,
//       bio,
//       phone,
//       mainImage,
//       aboutImage,
//       socialLinks,
//     } = await req.json();

//     const existingUser = await Profile.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User already exists" },
//         { status: 400 }
//       );
//     }

//     const newUser = new Profile({
//       name,
//       email,
//       password,

//       title,
//       bio,
//       phone,
//       mainImage,
//       aboutImage,
//       socialLinks,
//     });

//     await newUser.save();

//     const token = signToken(newUser);

//     const response = NextResponse.json({
//       message: "Registered successfully",
//       user: { name: newUser.name, email: newUser.email },
//     });

//     // Set JWT as HttpOnly cookie
//     response.cookies.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//     });

//     return response;
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
