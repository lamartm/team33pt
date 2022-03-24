const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

module.exports = async function getUserData(dbName) {
  await client.connect();
  const db = client.db(dbName);

  const col = db.collection("tech-3-3");
  return col;
};
