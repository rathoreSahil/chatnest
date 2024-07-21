import mongoose from "mongoose";

const GroupChatSchema = new mongoose.Schema(
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
    participantCount: {
      type: Number,
      required: [true, "Group chat must have a participant count"],
    },
  },
  {
    timestamps: true,
  }
);

const GroupChat = mongoose.model("GroupChat", GroupChatSchema);
export default GroupChat;
