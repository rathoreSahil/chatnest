import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Chat must have a name"],
    },
    description: {
      type: String,
    },
    photo: {
      type: String,
      default: "/default-group.png",
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    participantCount: {
      type: Number,
      default: 2,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
