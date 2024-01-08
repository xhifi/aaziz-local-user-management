const shell = require("../../utils/shell");
const { extractAllUsers, extractUserInfo } = require("./utils");
const { BadRequest } = require("../../errors");

module.exports = async (req, res) => {
  const query = await shell("net user");
  if (query.err) {
    throw new BadRequest(query.err);
  }

  const users = extractAllUsers(query);

  const noAdmin = users
    .filter((user) => !user.toLowerCase().startsWith("admin"))
    .filter((user) => user !== "Guest")
    .filter((user) => user !== "WDAGUtilityAccount");
  console.log(noAdmin);

  const usersData = await Promise.all(
    noAdmin.map(async (user) =>
      extractUserInfo(await shell(`net user ${user}`))
    )
  );

  return res.send({ users: noAdmin, data: usersData });
};
