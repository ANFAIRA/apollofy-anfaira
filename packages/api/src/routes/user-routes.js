const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.get("/users", userController.fetchUsers);
userRouter.get("/users/:id", userController.fetchUserById);
userRouter.post("/sign-up", authMiddleware, userController.signUp);
userRouter.post("/sign-out", authMiddleware, userController.signOut);
userRouter.patch("/api/account", authMiddleware, userController.updateUser);
userRouter.delete("/api/users-song/", userController.deleteSongFromAllUsers);

module.exports = {
  userRouter: userRouter,
};
