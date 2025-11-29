import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

// GET all users (authenticated users can view)
export async function GET() {
  try {
    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        authorName: true,
        description: true,
        avatarImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// DELETE user (archbas only)
export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser();

    if (!user || user.username !== "archbas") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { userId } = await request.json();

    // Prevent deleting archbas account
    const userToDelete = await prisma.user.findUnique({ where: { id: userId } });
    if (userToDelete?.username === "archbas") {
      return NextResponse.json({ message: "Cannot delete archbas account" }, { status: 403 });
    }

    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
