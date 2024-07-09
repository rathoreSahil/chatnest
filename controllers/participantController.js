import Participant from "../models/participantModel.js";

const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    res.status(200).json({
      status: "success",
      results: participants.length,
      data: {
        participants,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getParticipantsByUserId = async (req, res) => {
  try {
    const participants = await Participant.find({ userId: req.params.userId });
    res.status(200).json({
      status: "success",
      results: participants.length,
      data: {
        participants,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const addParticipant = async (req, res) => {
  try {
    const participant = await Participant.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        participant,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const participantController = {
  getAllParticipants,
  getParticipantsByUserId,
  addParticipant,
};
