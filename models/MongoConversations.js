const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema({
  fileName: String,
  id: String,
  content: String,
  lastMutation: String,
});

mongoose.model("conversations", conversationSchema, "conversations");
