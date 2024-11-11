const { Router } = require("express");
const commentController = require("../controllers/commentControllers");
const authenticateJwt = require("../middlewares/authenticateJwt");

const commentRouter = Router({ mergeParams: true });

commentRouter.get("/", commentController.getCommentsByPostId);
commentRouter.post("/", authenticateJwt, commentController.createComment);
commentRouter.get("/:commentId", commentController.getCommentById);
commentRouter.delete("/:commentId", authenticateJwt, commentController.deleteComment);

module.exports = commentRouter;
