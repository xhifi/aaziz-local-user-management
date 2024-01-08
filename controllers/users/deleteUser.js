const { BadRequest, NotFound } = require("../../errors");
const shell = require("../../utils/shell");

module.exports = async (req, res) => {
  const query = await shell(`NET USER ${req.params.id} /DELETE`);
  // if (query?.msg.startsWith("The command completed successfully")) {
  //   return res.json({ msg: `${req.params.id} has been deleted.` });
  // }
  if (query.msg === "User doesn't exist") {
    return new NotFound(`${req.params.id} doesn't exist`);
  }

  if (query?.startsWith("The command completed successfully")) {
    return res.send({ msg: `${req.params.id} was deleted successfully` });
  }
  throw new BadRequest(`Something went wrong while deleting ${req.params.id}`);
};
