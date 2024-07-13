const express = require("express");
const cors = require("cors");
const sequelize = require("./api/db/server");
const app = express();
const PORT = process.env.PORT;
require('dotenv').config();

const userRouter = require("./api/routes/user");

if (process.env.PRODUCTION) {
  app.use(cors());
} else {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tuf-roan.vercel.app");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);

    next();
  });

  app.use(
    cors({
      origin: ["https://tuf-roan.vercel.app"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
    })
  );
}

app.use(express.json());
sequelize.sync();

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  res.json("Connected");
});

app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

module.exports = app;
