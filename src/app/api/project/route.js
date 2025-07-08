import connectMongodb from "@/app/lib/mongobd";

import { Projects } from "@/app/models/Project";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    await connectMongodb();
    await Projects.create(data);
    return NextResponse.json({
      success: true,
      message: "Project Create successfully",
    });
  } catch (error) {
    console.log("something wrong in post process", { error });
  }
}

export async function GET(req) {
  try {
    await connectMongodb();
    const projectsData = await Projects.find().sort({ createdAt: -1 });
    return NextResponse.json(projectsData);
  } catch (error) {
    console.log({ error }, "something wrong to get product");
  }
}
