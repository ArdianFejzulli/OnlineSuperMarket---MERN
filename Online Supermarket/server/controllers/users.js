const User = require("../models/user");
const database = require("../utils/mysql_connection");

exports.auth = (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
}

exports.register = (req, res) => {

  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      createdUser: doc
    });
  });
}

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found"
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // res.cookie("w_authExp", user.tokenExp);
        // res.cookie("w_auth", user.token)
        res.status(200)
          .json({
            loginSuccess: true,
            userId: user._id,
            token: user.token,
            w_authExp: user.tokenExp
          });
      });
    });
  });
}

exports.logout = (req, res) => {
  User.findOneAndUpdate({ _id: req.params._id }, { token: "", tokenExp: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users)
  } catch (error) {
    return res.status(404).json(error)
  }
}

exports.delete = async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ _id: req.body._id });
    return res.status(200).json({
      message: "User Deleted!"
    })
  } catch (err) {
    console.log(err)
    return res.status(404).json(err)
  }
}

exports.email = async (req, res) => {
  const {name, lastname, phone, email, subject} = req.body;

  const result = await database
  .promise()
  .query(
    `INSERT INTO emails (name, lastname, phone, email, subject) values('${name}','${lastname}','${phone}','${email}','${subject}')`
  );

  if (result[0].affectedRows === 1) {
    return res.status(200).json({
      message: "Email Sent!"
    })
  }
  return res.status(404).json("Email was not sent!")
}
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user)
  } catch (error) {
    return res.status(404).json(error)
  }
}