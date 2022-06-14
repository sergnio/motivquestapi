const express = require("express");
const router = express.Router();
const { PrismaClient } = "@prisma/client";
const prisma = new PrismaClient();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    await prisma.$connect();
    res.send("respond with a resource");
  } catch (e) {
    throw e;
  } finally {
    console.log("disconnecting");
    await prisma.$disconnect();
  }
});

module.exports = router;
