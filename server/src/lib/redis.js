const { Redis } = require("ioredis");
require("dotenv").config();

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  } else {
    throw new Error("Redis Url not defined!");
  }
};

module.exports = new Redis(getRedisUrl());
