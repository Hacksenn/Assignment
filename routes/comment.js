const router = require("express").Router();
const Comments = require("../schemas/comment.js");

// 댓글 목록 조회 API
router.get("/comments", async (req, res) => {
  const comments = await Comments.find().sort({
    createdAt: "desc",
  });
  if (!comments) {
    return res.status(400).send({
      message: "데이터 형식이 올바르지 않습니다.",
    });
  }
  const results = comments.map((comment) => {
    return {
      commentId: comment.comment_id,
      user: comment.user,
      content: comment.content,
      createdAt: comment.createdAt,
    };
  });
  res.status(200).json({ data: results });
});

// 댓글 작성 API

router.post("/comments/", async (req, res) => {
  const { commentId, user, password, content } = req.body;

  if (!user || !password) {
    return res.status(400).send({
      message: "데이터 형식이 올바르지 않습니다.",
    });
  }
  if (!content) {
    return res.status(400).send({
      message: "댓글 내용을 입력해주세요",
    });
  }

  await Comments.create({ commentId, user, password, content });

  res.json({ message: "댓글을 생성하였습니다." });
});

// 댓글 수정 API
router.patch("/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { content, password } = req.body;

  const existsComments = await Comments.find({
    commentId: commentId,
    password: password,
  });
  if (existsComments.length) {
    await Comments.updateOne(
      { commentId: commentId },
      { $set: { content: content } }
    );
  }
  if (existsComments.length === 0) {
    return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
  }
  if (!content) {
    return res.status(400).json({ message: "댓글 내용을 입력해주세요." });
  }
  res.status(200).json({ success: true });
});

// 댓글 삭제 API
router.delete("/comments/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { password } = req.body;

  const existsComments = await Comments.find({
    commentId: commentId,
    password: password,
  });
  if (existsComments.length) {
    await Comments.deleteOne({ commentId });
  }
  if (existsComments.length === 0) {
    return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
  }
  res.json({ result: "success" });
});

module.exports = router;
