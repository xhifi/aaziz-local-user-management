const shell = require("../../utils/shell");
const { BadRequest } = require("../../errors");
const { extractUserInfo } = require("./utils");

module.exports = async (req, res) => {
  const query = await shell(`net user ${req.params.id}`);
  const userInfo = extractUserInfo(query);

  return res.json({ data: userInfo });
};
