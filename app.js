const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const { PrismaClient } = require("@prisma/client");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");


const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");
require("./config/passport")(passport);


const app = express();
const prisma = new PrismaClient();


app.use(cors());
app.use(express.json());

app.use(
    session({
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      },
      secret: "a santa at nasa",
      resave: false,
      saveUninitialized: false,
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000, // 2 minutes
        dbRecordIdIsSessionId: true,
      }),
    })
);


app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Blog API running on port ${PORT}!`)
);