import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    groupChat: {
      type: mongoose.Schema.ObjectId,
      ref: "GroupChat",
    },
    directChat: {
      type: mongoose.Schema.ObjectId,
      ref: "DirectChat",
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Message must have a sender"],
    },
    content: {
      type: String,
      required: [true, "Message must have content"],
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);
export default Message;
