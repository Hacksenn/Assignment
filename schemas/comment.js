const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const commentsSchema = new mongoose.Schema({
  commentId: {
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

commentsSchema.plugin(autoIncrement.plugin, {
  model: "Model",
  field: "commentId",
  startAt: 1, //시작
  increment: 1, // 증가
});

module.exports = mongoose.model("Comments", commentsSchema);
