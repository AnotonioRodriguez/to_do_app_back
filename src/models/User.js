const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    nameUser: {
        type: String,
        unique: true
    },
    age: String,
    phone: String,
    town: String,
    state: String,
    cp: String,
    email: {
      type: String,
      unique: true
    },
    password: String,
    policies: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = model("user", userSchema);