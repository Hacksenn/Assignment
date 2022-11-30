const router = require("express").Router();
const postsRouter = require("./posts");
const commentsRouter = require("./comment");

router.use("/posts", postsRouter);
router.use("/comment", commentsRouter);

module.exports = router;
