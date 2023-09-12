const passwordError = new Error("unauthoried access: password incorrect");
passwordError.status = 401;
passwordError.message = "unauthoried access: password incorrect";

const checkPassword = (req, res, next) => {
  if (req.body.password !== process.env.PASSWORD) next(passwordError);
  else next();
};

module.exports = checkPassword;
