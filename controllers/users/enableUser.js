const { NotFound, BadRequest } = require("../../errors");
const shell = require("../../utils/shell");
const { findUser, extractUserInfo } = require("./utils");

module.exports = async (req, res) => {
  const username = req.params.id;
  const userExists = await findUser(username);
  if (!userExists) throw new NotFound(`${username} doesn't exist`);
  const isEnabled =
    extractUserInfo(await shell(`net user ${username}`))["Account active"] ===
    "Yes"
      ? true
      : false;
  if (isEnabled) throw new BadRequest(`${username} is already enabled`);
  await shell(`net user ${username} /active:yes`);
  return res.json({ username, active: true });
};
