const tasksCtrl = {};
const tasksModel = require("../models/Tasks");

tasksCtrl.createTask = async (req, res) => {
    try {
        const newTask = new tasksModel(req.body);
        newTask.id_user = req.params.idUser;
        await newTask.save();
        res.status(200).json({ message: "Tarea creada con exito" });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
};

tasksCtrl.getTasks = async (req, res) => {
    try {

        const tasks = await tasksModel.find({id_user: req.params.idUser});
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
};

tasksCtrl.updateTask = async (req, res) => {
    try {
        const updateTask = req.body;
        await tasksModel.findByIdAndUpdate(req.params.idTask, updateTask);
        res.status(200).json({ message: "Tarea editada con exito" });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
};

tasksCtrl.deleteTask = async (req, res) => {
    try {
        await tasksModel.findByIdAndDelete({_id: req.params.idTask});
        res.status(200).json({ message: "Tarea eliminada con exito" });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
};

tasksCtrl.completeTask = async (req, res) => {
    try {
        const { complete } = req.body;
        await tasksModel.findByIdAndUpdate(req.params.idTask, {complete: complete});
        res.status(200).json({ message: "Tarea Completada" });

    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
};

module.exports = tasksCtrl;