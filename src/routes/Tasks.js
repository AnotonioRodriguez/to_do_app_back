const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    completeTask    
} = require('../controllers/Tasks.controllers')

router.route("/:idUser").post(createTask).get(getTasks);
router.route("/:idUser/:idTask").put(updateTask).delete(deleteTask);
router.route("/completeTask/:idUser/:idTask").put(completeTask);

module.exports = router;