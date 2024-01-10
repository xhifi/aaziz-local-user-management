const shell = require("../../../utils/shell");

function extractAllUsers(inputString) {
  const lines = inputString.split("\r\n");
  const usernameLines = lines.slice(4, -3);

  const allUsernames = usernameLines
    .flatMap((line) => line.trim().split(/\s+/))
    .filter((username) => username.trim() !== "");

  return allUsernames;
}

function extractUserInfo(inputString) {
  const lines = inputString.split("\r\n");
  const userInfo = {};

  let currentKey = "";

  for (const line of lines) {
    if (line.trim() === "") continue;

    if (line.startsWith(" ") || line.startsWith("\t")) {
      // Concatenate lines starting with whitespace to the previous line
      userInfo[currentKey] += " " + line.trim();
    } else {
      // Split the line into key and values
      const [key, ...values] = line.trim().split(/\s{2,}/);

      if (key && values.length > 0) {
        currentKey = key.trim();
        userInfo[currentKey] =
          values.length > 1
            ? values.map((value) => value.trim())
            : values[0].trim();
      }
    }
  }

  return userInfo;
}

const createUser = async ({
  username,
  password,
  fullName,
  description,
  isActive = "yes",
  passwordExpires,
}) => {
  const command = `NET USER ${username} ${password} /COMMENT:"${description}" /ADD /ACTIVE:${isActive} /FULLNAME:"${fullName}" /EXPIRES:never /PASSWORDCHG:yes /PASSWORDREQ:yes /LOGONPASSWORDCHG:yes`;
  const query = await shell(command);
  if (query?.startsWith("The command completed successfully")) {
    await shell(`NET LOCALGROUP "Remote Desktop Users" ${username} /add`);
    await shell(
      `wmic UserAccount where Name="${username}" set PasswordExpires=True`
    );
    return extractUserInfo(await shell(`NET USER ${username}`));
  }
};

function validateUsername(input) {
  // Regular expression pattern for valid names
  const namePattern = /^(?:[a-zA-Z]+\.)+[a-zA-Z]+$/;

  // Test if the input matches the pattern
  return namePattern.test(input);
}
function validateFullName(input) {
  // Regular expression pattern for valid full names
  const fullNamePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)*(?: [a-zA-Z]+)?$/;

  // Test if the input matches the pattern
  return fullNamePattern.test(input);
}

const allUsers = async () => {
  const query = await shell(`NET USER`);
  return extractAllUsers(query);
};
const findUser = async (username) => {
  const users = await allUsers();
  console.log(users);
  return users.find((user) => user === username);
};

module.exports = {
  extractAllUsers,
  extractUserInfo,
  allUsers,
  findUser,
  validateFullName,
  validateUsername,
  createUser,
};
