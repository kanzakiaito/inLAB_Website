import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getAuthUser } from "@/lib/auth";

export async function PATCH(request: NextRequest) {
  try {
    // Check if user is authenticated and is archbas
    const authUser = await getAuthUser();

    if (!authUser) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (authUser.username !== "archbas") {
      return NextResponse.json(
        { message: "Only archbas can update accounts" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, username, password, authorName, description, avatarImage } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // If username is being changed, check if new username already exists
    if (username && username !== existingUser.username) {
      const usernameExists = await prisma.user.findUnique({
        where: { username },
      });

      if (usernameExists) {
        return NextResponse.json(
          { message: "Username already exists" },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData: any = {};

    if (username && username !== existingUser.username) {
      updateData.username = username;
    }

    if (password && password.trim()) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update author name if provided
    if (authorName !== undefined) {
      updateData.authorName = authorName || null;
    }

    // Update description if provided
    if (description !== undefined) {
      updateData.description = description || null;
    }

    // Update avatar image if provided
    if (avatarImage !== undefined) {
      updateData.avatarImage = avatarImage || null;
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
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

    return NextResponse.json({
      message: "Account updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
