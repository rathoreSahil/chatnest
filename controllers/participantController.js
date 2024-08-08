import Participant from "../models/participantModel.js";

const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    res.status(200).json({
      status: "success",
      participants,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAdminStatus = async (req, res) => {
  try {
    const participant = await Participant.findOne({
      user: req.user._id,
      group: req.params.groupId,
    });

    return res.status(200).json({
      status: "success",
      isAdmin: participant.isAdmin,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const addParticipants = async (req, res) => {
  try {
    await Participant.insertMany(req.body.participants);
    res.status(201).json({
      status: "success",
      message: "Participants added successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteAllParticipants = async (req, res) => {
  try {
    await Participant.deleteMany();
    res.status(204).json({
      status: "success",
      message: "All Participants deleted successfully",
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
  getAdminStatus,
  addParticipants,
  deleteAllParticipants,
};
