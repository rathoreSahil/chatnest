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
    },
    photoPublicId: {
      type: String,
    },
    isGroupChat: {
      type: Boolean,
      required: [true, "Chat must be a group chat or a direct message"],
    },
    participantCount: {
      type: Number,
      required: [true, "Chat must have a participant count"],
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);
export default Chat;
