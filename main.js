// noinspection ES6CheckImport
import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

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
  console.log(`DB url: ${process.env.DATABASE_URL}`);
  app.use(
    cors({
      origin: "*",
    })
  );

  app.get("/", async (req, res) => {
    res.send("You made it :) Version 1.2");
  });
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

  app.get("/users/:userId/activities", async (req, res) => {
    await prisma.$connect();
    const userActivities = await prisma.user.findFirst({
      where: {
        id: req.params.userId,
      },
      include: {
        activities: true,
      },
    });
    console.log({ userActivities });
    res.send(JSON.stringify(userActivities));
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
