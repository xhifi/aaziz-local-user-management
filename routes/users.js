const router = require("express").Router();
const {
  getAllUsers,
  getUser,
  deleteUser,
  createUser,
  disableUser,
  enableUser,
} = require("../controllers/users");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).delete(deleteUser);
router.route("/:id/disable").get(disableUser);
router.route("/:id/enable").get(enableUser);

module.exports = router;
