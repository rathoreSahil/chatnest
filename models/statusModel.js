import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
  messageId: {
    type: mongoose.Schema.ObjectId,
    ref: "Message",
    required: [true, "Status must belong to a message"],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Status must belong to a user"],
  },
  status: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent",
  },
});

const Status = mongoose.model("Status", StatusSchema);
export default Status;
