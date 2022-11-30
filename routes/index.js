const router = require("express").Router();
const postsRouter = require("./posts");
const commentsRouter = require("./comment");

router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);

module.exports = router;
