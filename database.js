const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

module.exports = async function getUserData(collectionName) {
  await client.connect();
  const db = client.db("tech-3-3");

  const col = db.collection(collectionName);
  return col;
};
