const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");

const {
    createUser,
    getUser,
    editUser,
    loginUser
} = require('../controllers/User.controllers')

router.route("/").post(createUser);
router.route("/loginUser").post(loginUser);
router.route("/:idUser").get(getUser).put(editUser);

module.exports = router;