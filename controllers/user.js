const User = require("../models/user");
const Friends = require("../models/friends");

const bcrypt = require("bcryptjs");
const {
  validateUser,
  loginValidation,
  generateAuthToken,
  verifyToken,
} = require("../middlewares/auth");

//controller for user register
exports.userAuth = async (req, res) => {
  console.log(req.body)
  if (req.body.isSignup) {

    try {

      const checkValidationError = validateUser(req.body);
      if (checkValidationError)
        return res.status(400).send({ error: checkValidationError.err });
      const user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(400)
          .send({ status: false, error: "User with given email already Exist!" });

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const createUser = await new User({
        ...req.body,
        password: hashedPassword,
      }).save();


      const createFrds = await new Friends({
        email: req.body.email,
      }).save();


      if (createUser) console.log("User created successfully: ", createUser);
      return res.status(200).send({ status: true, message: "User created successfully" });
    } catch (err) {
      console.log("Something went wrong", err);
      res.status(400).send({ status: false, error: "Register Failed" });
    }


  } else {


    try {
      const checkValidationError = loginValidation(req.body);
      if (checkValidationError)
        return res.status(400).send({ error: checkValidationError.err });
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send({ error: "Invalid login" });
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordValid)
        return res.status(200).send({ error: "Invalid password" });
      const token = generateAuthToken(user);
      if (token) {
        console.log("User logged in successfully - ", user.username);
        return res.status(200).send({ message: "success", user: token });
      } else return res.status(200).send({ error: "token error", user: false });
    } catch (err) {
      console.log("Something went wrong", err);
      return res.status(400).send({ error: "Login Failed" });
    }



  }



};






