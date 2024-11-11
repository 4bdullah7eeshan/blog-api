const { Router } = require("express");
const postController = require("../controllers/postControllers");
const commentRouter = require("./commentRoutes");


const postRouter = Router();

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.post("/", postController.createPost);
postRouter.put("/:id", postController.updatePost);
postRouter.delete("/:id", postController.deletePost);

postRouter.use("/:postId/comments", commentRouter);


module.exports = postRouter;
