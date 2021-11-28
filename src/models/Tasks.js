const { Schema, model } = require("mongoose");

const tasksSchema = new Schema(
    {
        title: String,
        priority: String,
        expiration_date: String,
        expiration_hour: String,
        description: String,
        complete: String,
        creation_date: String
    },
    {
        timestamps: true,
    }
);

module.exports = model("tasks", tasksSchema);