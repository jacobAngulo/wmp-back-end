const db = require("../data/knexConfig.js");

module.exports = {
  register,
  findBy
};

async function register(newUserInfo) {
  const id = await db("users").insert(newUserInfo);
  const newUser = await db("users")
    .where({ id: id })
    .first();

  return newUser;
}

async function findBy(filter) {
  const result = await db("users").where(filter).first();

  return result;
}
