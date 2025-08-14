import connectMongodb from "@/app/lib/mongobd";
import User from "@/app/models/User";

export async function PUT(req, { params }) {
  try {
    await connectMongodb();
    const body = await req.json();
    const { id } = await params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: body.name,
        title: body.title,
        bio: body.bio,
        email: body.email,
        phone: body.phone,
        mainImage: body.mainImage,
        aboutImage: body.aboutImage,
        role: body.role,
        socialLinks: {
          github: body.github,
          linkedin: body.linkedin,
          facebook: body.facebook,
          twitter: body.twitter,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(updatedUser, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
export async function DELETE(req, { params }) {
  try {
    await connectMongodb();
    const { id } = await params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
