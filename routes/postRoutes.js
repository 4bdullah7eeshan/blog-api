const { Router } = require("express");
const postController = require("../controllers/postControllers");
const commentRouter = require("./commentRoutes");
const authenticateJwt = require("../middlewares/authenticateJwt");



const postRouter = Router();

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostById);
postRouter.post("/", authenticateJwt, postController.createPost);
postRouter.put("/:id", authenticateJwt, postController.updatePost);
postRouter.delete("/:id", authenticateJwt, postController.deletePost);

postRouter.use("/:postId/comments", commentRouter);

postRouter.get("/author/posts", authenticateJwt, postController.getPostsByAuthor);



module.exports = postRouter;
