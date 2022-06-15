// noinspection ES6CheckImport
import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
const port = 3000;

const prisma = new PrismaClient();

async function updateSergio() {
  await prisma.user.update({
    where: {
      id: "62a91a54723f12f84d207875",
    },
    data: {
      activities: {
        createMany: {
          data: [
            {
              name: "Opening up youtube",
              timesDone: 5,
            },
            {
              name: "Taking out the trash",
              timesDone: 2,
            },
            {
              name: "Feeding the kitties",
              timesDone: 2,
            },
          ],
        },
      },
    },
  });
}

async function main() {
  app.get("/users", async (req, res) => {
    // Connect the client
    await prisma.$connect();

    const allUsers = await prisma.user.findMany({
      include: {
        activities: true,
      },
    });
    console.log(allUsers);
    res.send(`Hello World! ${JSON.stringify(allUsers)}`);
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // console.log("disconnecting");
    // await prisma.$disconnect();
  });

export {};
