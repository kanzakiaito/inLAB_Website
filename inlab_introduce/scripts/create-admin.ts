import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function createAdmin() {
  const username = process.argv[2];
  const password = process.argv[3];

  if (!username || !password) {
    console.error("Usage: tsx scripts/create-admin.ts <username> <password>");
    process.exit(1);
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      console.error(`Error: User '${username}' already exists`);
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    console.log(`✓ Admin user '${username}' created successfully!`);
    console.log(`You can now login at: http://localhost:3000/admin/login`);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
