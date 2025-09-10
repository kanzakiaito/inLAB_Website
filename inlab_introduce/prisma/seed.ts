import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({
    where: { username: "kanzaki_aito" },
  });
  if (!admin) {
    const hashedPassword = await hash("inlab_2025" /* You have to change before seeding. */, 10);
    await prisma.user.create({
      data: {
        username: "kanzaki_aito",
        password: hashedPassword
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });