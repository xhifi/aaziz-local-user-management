const router = require("express").Router();
const {
  getAllUsers,
  getUser,
  deleteUser,
  createUser,
} = require("../controllers/users");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).delete(deleteUser);

module.exports = router;
