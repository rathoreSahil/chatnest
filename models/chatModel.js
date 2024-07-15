import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Chat must have a name"],
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
    default: "/default.webp",
  },
});

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
