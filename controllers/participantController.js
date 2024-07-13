import mongoose from "mongoose";
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

const addParticipants = async (req, res) => {
  try {
    const participants = await Participant.insertMany(req.body.participants);
    res.status(201).json({
      status: "success",
      data: participants,
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
  addParticipants,
  deleteAllParticipants,
};
