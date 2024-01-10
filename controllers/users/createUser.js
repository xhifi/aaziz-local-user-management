const { BadRequest } = require("../../errors");
const {
  findUser,
  validateFullName,
  validateUsername,
  createUser,
} = require("./utils/");

module.exports = async (req, res) => {
  const { username, fullName, description, isActive, password } = req.body;
  if (!username || !fullName || !description || !password) {
    throw new BadRequest(
      "Username, Password, Full Name and Description of a user is required"
    );
  }
  if (!validateUsername(username?.toLowerCase())) {
    throw new BadRequest(
      `provided username "${username}" does not meet the correct criteria. Provided in a format of user.name or firstname.lastname i.e. it shouldn't  contain any spaces`
    );
  }
  if (!validateFullName(fullName)) {
    throw new Error(
      "Provide full name in correct format e.g. John Doe or Mary Dorothy Jane"
    );
  }
  const userExists = await findUser(username?.toLowerCase());
  if (userExists) throw new BadRequest(`${userExists} already exists`);
  const user = await createUser({
    ...req.body,
    username: username?.toLowerCase(),
  });
  if (user) return res.send(user);
  throw new BadRequest(`Something went wrong while creating ${username}`);
};
