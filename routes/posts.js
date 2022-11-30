const express = require("express");
const router = express.Router();
const Posts = require("../schemas/posts.js");

// 게시글 목록 조회 API
router.get("/posts", async (req, res) => {
  const posts = await Posts.find().sort({
    createdAt: "desc",
  });
  const results = posts.map((post) => {
    return {
      postId: post.post_id,
      user: post.user,
      title: post.title,
      createdAt: post.createdAt,
    };
  });
  res.status(200).json({ data: results });
});

// 게시글 상세 조회 API
router.get("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const [posts] = await Posts.find({ post_id: _postId });
  if (!posts) {
    return res.status(400).send({
      message: "데이터 형식이 올바르지 않습니다.",
    });
  }
  const result = {
    postId: posts.post_id,
    user: posts.user,
    title: posts.title,
    content: posts.content,
    createdAt: posts.createdAt,
  };
  res.status(200).json({ data: result });
});

// 게시글 작성 API

router.post("/posts/", async (req, res) => {
  const { post_id, user, password, title, content } = req.body;

  if (!user || !password || !title || !content) {
    return res.status(400).send({
      message: "데이터 형식이 올바르지 않습니다.",
    });
  }

  await Posts.create({ post_id, user, password, title, content });

  res.json({ message: "게시글을 생성하였습니다." });
});

// 게시글 수정 API
router.patch("/posts/:post_id", async (req, res) => {
  const { post_id } = req.params;
  const { title, content, password } = req.body;
  const existsPosts = await Posts.find({
    post_id: post_id,
    password: password,
  });
  console.log(existsPosts);
  if (existsPosts.length) {
    await Posts.updateOne(
      { post_id: post_id },
      { $set: { title: title, content: content } }
    );
    res.status(200).json({ success: true });
  }
  if (existsPosts.length === 0) {
    return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
  }
});

// 게시글 삭제 API
router.delete("/posts/:post_id", async (req, res) => {
  const { post_id } = req.params;
  const { password } = req.body;

  const existsPosts = await Posts.find({
    post_id: post_id,
    password: password,
  });
  if (existsPosts.length) {
    await Posts.deleteOne({ post_id });
    res.json({ result: "success" });
  }

  if (existsPosts.length === 0) {
    return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
  }
});

module.exports = router;
