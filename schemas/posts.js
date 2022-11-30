const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const postsSchema = new mongoose.Schema({
  post_id: {
    type: Number,
    default: 0,
  },
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

postsSchema.plugin(autoIncrement.plugin, {
  model: "Model",
  field: "post_id",
  startAt: 1, //시작
  increment: 1, // 증가
});

module.exports = mongoose.model("Posts", postsSchema);
