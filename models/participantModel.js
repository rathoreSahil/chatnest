import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.ObjectId,
    ref: "Chat",
    required: [true, "Participant must belong to a chat"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Participant must belong to a user"],
  },
});

const Participant = mongoose.model("Participant", ParticipantSchema);
export default Participant;
