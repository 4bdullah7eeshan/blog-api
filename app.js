const express = require("express");

const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");


const app = express();

app.use("/auth", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Blog API running on port ${PORT}!`)
);