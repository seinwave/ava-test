const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema({
   fileName: String,
   id: String,
   lastMutation: String,
   content: String,
});

mongoose.model('conversations', conversationSchema, 'conversations')