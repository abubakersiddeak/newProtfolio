// import { NextResponse } from "next/server";
// import connectMongodb from "@/app/lib/mongobd";
// import Profile from "@/app/models/Profile";

// export async function POST(req) {
//   try {
//     await connectMongodb();
//     const { email, oldPassword, newPassword } = await req.json();

//     const user = await Profile.findOne({ email });
//     if (!user)
//       return NextResponse.json({ error: "User not found" }, { status: 404 });

//     const isMatch = await user.comparePassword(oldPassword);
//     if (!isMatch)
//       return NextResponse.json(
//         { error: "Old password incorrect" },
//         { status: 400 }
//       );

//     user.password = newPassword; // will be hashed automatically
//     await user.save();

//     return NextResponse.json({ message: "Password updated successfully" });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
