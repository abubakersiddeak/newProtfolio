import connectMongodb from "@/app/lib/mongobd";
import { Projects } from "@/app/models/Project";

import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { id } = await params;

  try {
    await connectMongodb();
    const data = await req.json();

    const project = await Projects.findById(id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
    Object.assign(project, data); // data object k project er sathe miliye notun project toiri kore ...jate ubdate data pawa jay project e
    await project.save();

    return NextResponse.json(
      { message: "Project updated successfully", project },
      { status: 200 }
    );
  } catch (error) {
    console.log(`something wrong to edit server ${error}`);
  }
}
export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await connectMongodb();
    await Projects.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE failed from server:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
