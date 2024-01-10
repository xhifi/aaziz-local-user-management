const { NotFound, BadRequest } = require("../../errors");
const shell = require("../../utils/shell");
const { findUser, extractUserInfo } = require("./utils");

module.exports = async (req, res) => {
  const username = req.params.id;
  const userExists = await findUser(username);
  if (!userExists) throw new NotFound(`${username} doesn't exist`);
  const isDisabled =
    extractUserInfo(await shell(`net user ${username}`))["Account active"] ===
    "Yes"
      ? false
      : true;
  if (isDisabled) throw new BadRequest(`${username} is already disabled`);
  await shell(`net user ${username} /active:no`);
  return res.json({ username, active: false });
};
