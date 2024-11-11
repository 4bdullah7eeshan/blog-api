const { Router } = require("express");
const userControllers = require("../controllers/userControllers");
const passport = require("passport");

const userRouter = Router();

userRouter.post("/login", passport.authenticate("local"), userControllers.login);
userRouter.post("/logout", userControllers.logout);
userRouter.post("/signup", userControllers.signup);

module.exports = userRouter;
