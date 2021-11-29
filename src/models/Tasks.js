const { Schema, model } = require("mongoose");

const tasksSchema = new Schema(
    {
        title: String,
        priority: String,
        expiration_date: String,
        expiration_hour: String,
        description: String,
        complete: Boolean,
        creation_date: String,
        id_user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = model("Tasks", tasksSchema);