const { Router } = require("express");
const commentController = require("../controllers/commentControllers");

const commentRouter = Router({ mergeParams: true });

commentRouter.get("/", commentController.getCommentsByPostId);
commentRouter.post("/", commentController.createComment);
commentRouter.get("/:commentId", commentController.getCommentById);
commentRouter.delete("/:commentId", commentController.deleteComment);

module.exports = commentRouter;
