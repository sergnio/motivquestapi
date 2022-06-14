// noinspection ES6CheckImport
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("connecting");
  // Connect the client
  await prisma.$connect();

  await prisma.user.create({
    data: {
      name: "Sergio",
      email: "sergnio@gmail.com",
    },
  });

  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("disconnecting");
    await prisma.$disconnect();
  });

export {};
