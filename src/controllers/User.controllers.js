const userCtrl = {};
const modelUser = require("../models/User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

userCtrl.createUser = async (req, res) => {
    try {
        const { name, email, password, cp, state, town, age, nameUser, phone, repeatPassword, acceptPolicies } = req.body;
        const newUser = new modelUser(); 
    
        if (acceptPolicies) {
          if (!password || !repeatPassword) {
            res.status(404).json({ message: "The password is required." });
          } else {
            if (password === repeatPassword) {
              bcrypt.hash(password, null, null, function (err, hash) {
                if (err) {
                  res
                    .status(500)
                    .json({ message: "Error encrypting the password.", err });
                } else {
                  newUser.name = name;
                  newUser.cp = cp; 
                  newUser.state = state; 
                  newUser.town = town; 
                  newUser.age = age; 
                  newUser.nameUser = nameUser; 
                  newUser.phone = phone
                  newUser.email = email;
                  newUser.policies = true;
                  newUser.password = hash;
                  newUser.save(async (err, userStored) => {
                    if (err) {
                      res.status(500).json({
                        message: "Ups, algo paso al registrar el usuario",
                        err,
                      });
                    } else {
                      if (!userStored) {
                        res
                          .status(404)
                          .json({ message: "Error al crear el usuario" });
                      } else {
                        const token = jwt.sign(
                          {
                            nameUser: newUser.nameUser,
                            name: newUser.name,
                            email: newUser.email,
                            _id: newUser._id
                          },
                          process.env.AUTH_KEY
                        );
                        res.json({ token });
                      }
                    }
                  });
                }
              });
            } else {
              res.status(500).json({ message: "The passwords are not the same." });
            }
          }
        } else {
          res.status(500).json({ message: "The policies is required." });
        }
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
};

userCtrl.loginUser = async (req, res) => {
    try {
        const { nameUser, password } = req.body;
        const userBase = await modelUser.findOne({ nameUser: nameUser });
        if (userBase) {
            if (!bcrypt.compareSync(password, userBase.password)) {
                res.status(404).json({ message: "Usuario o contraseña incorrectos." });
            } else {
              const token = jwt.sign(
                {
                    nameUser: userBase.nameUser,
                    name: userBase.name,
                    email: userBase.email,
                    _id: userBase._id,
                },
                process.env.AUTH_KEY
              );
              res.json({ token });
            }
        } else {
            res.status(404).json({ message: "Este usuario no existe." });
        }
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
};

userCtrl.getUser = async (req, res) => {
    try {
        const user = await modelUser.findOne({ _id: req.params.idUser });
        console.log(user);
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
};

userCtrl.editUser = async (req, res) => {
    try {
        const userBase = await modelUser.findById(req.params.idUser);
        const updateUser = req.body;
        if (userBase) {
            await modelUser.findByIdAndUpdate(req.params.idUser, updateUser);

            const userUpdate = await modelUser.findById(req.params.idUser);
            const token = jwt.sign(
                {
                    nameUser: userUpdate.nameUser,
                    name: userUpdate.name,
                    email: userUpdate.email,
                    _id: userUpdate._id,
                },
                process.env.AUTH_KEY
            );
            res.status(200).json({ token });
        } else {
            res.status(500).json({ message: "Este usuario no existe" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
    }
};


module.exports = userCtrl;
