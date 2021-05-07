const Router = require("express").Router;

const {
  authMiddleware,
  // geoMiddleware
} = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.get("/users", userController.fetchUsers);
userRouter.get("/users/:id", authMiddleware, userController.fetchUserById);
userRouter.post(
  "/sign-up",
  authMiddleware,
  // geoMiddleware,
  userController.signUp,
);
userRouter.post("/sign-out", authMiddleware, userController.signOut);
userRouter.patch("/api/account", authMiddleware, userController.updateUser);

module.exports = {
  userRouter: userRouter,
};
