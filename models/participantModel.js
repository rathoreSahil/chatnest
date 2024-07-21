import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.ObjectId,
      ref: "GroupChat",
      required: [true, "Participant must belong to a group"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User cannot be empty"],
    },
  },
  {
    timestamps: true,
  }
);

const Participant = mongoose.model("Participant", ParticipantSchema);
export default Participant;
