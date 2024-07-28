import mongoose from "mongoose";

const DirectChatSchema = new mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Direct chat must have a user1"],
    },
    user2: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Direct chat must have a user2"],
    },
    lastMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const DirectChat = mongoose.model("DirectChat", DirectChatSchema);
export default DirectChat;
