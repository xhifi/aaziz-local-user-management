const getAllUsers = require("./users/getAllUsers");
const getUser = require("./users/getUser");
const deleteUser = require("./users/deleteUser");
const createUser = require("./users/createUser");
const disableUser = require("./users/disableUser");
const enableUser = require("./users/enableUser");

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  createUser,
  disableUser,
  enableUser,
};
