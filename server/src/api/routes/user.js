const { Router } = require("express");
const User = require("../db/user");
const redis = require("../../lib/redis");
const router = Router();

router.post("/form", async (req, res) => {
  const username = req.body.username;
  const language = req.body.language;
  const stdin = req.body.stdin;
  const source = req.body.source;
  const stdout = req.body.stdout;
  const newData = User.build({
    username: username,
    language: language,
    stdin: stdin,
    source: source,
    stdout: stdout,
  });
  const savedData = await newData.save();

  const cachedValue = await redis.get("response");
  const parsedCachedValue = JSON.parse(cachedValue);
  parsedCachedValue.push(savedData);
  await redis.set("response", JSON.stringify(parsedCachedValue));
  res.json(newData);
});

router.get("/data", async (req, res) => {
  try {
    const cachedValue = await redis.get("response");
    if (cachedValue) {
      return res.send({ response: JSON.parse(cachedValue) });
    }
    const response = await User.findAll();
    try {
      await redis.set("response", JSON.stringify(response));
    } catch (err) {
      console.log(err);
    }
    res.send({ response });
  } catch (err) {
    console.log(err);
    res.send({ err: "Internal Error" });
  }
});

module.exports = router;
