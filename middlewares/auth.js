const jwt = require("jsonwebtoken");
require("dotenv").config();

//validation for user
const validateUser = (user) => {
  if (!user.username || typeof user.username !== "string")
    return { err: "Invalid name" };
    if (!user.age || typeof user.age !== "number")
    return { err: "Invalid age" };
  if (!user.password || typeof user.password !== "string")
    return { err: "Invalid password" };
  if (user.password.length < 5)
    return { err: "Password too small. Should be atleast 6 characters" };
  if (!user.phonenumber || typeof user.phonenumber !== "string")
    return { err: "Invalid phone number" };
  else {
    let validRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!user.phonenumber.match(validRegex))
      return { err: "Invalid phone number" };
  }
  if (!user.email || typeof user.email !== "string")
    return { err: "Invalid email" };
  else {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!user.email.match(validRegex)) return { err: "Invalid email" };
  }
};

//validation for user
const loginValidation = (user) => {
    if (!user.password || typeof user.password !== "string")
      return { err: "Invalid password" };
    if (user.password.length < 5)
      return { err: "Password too small. Should be atleast 6 characters" };
    if (!user.email || typeof user.email !== "string")
      return { err: "Invalid email" };
    else {
      let validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!user.email.match(validRegex)) return { err: "Invalid email" };
    }
  };

//generating token for user
const generateAuthToken = function (user) {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name:user.name
    },
    process.env.JWT_SECRET,
    { expiresIn: "18h" }
  );
  return token;
};

//verifying token for user
const verifyToken = function (req,res,next) {
    const {token}=req.headers;
    console.log(req.headers);
    if(!token)return res.status(400).send('access denied');
  try {
    const verification = jwt.verify(token,process.env.JWT_SECRET);
    console.log('Authenticated successfully - ' + verification );
    next();
  } catch (err) {
    console.log("Something went wrong" + err)  
    res.status(400).send('Invalid token');
  }
};

module.exports = {
  validateUser,
  loginValidation,
  generateAuthToken,
  verifyToken,
};
