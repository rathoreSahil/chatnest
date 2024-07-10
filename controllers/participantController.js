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

const getParticipantsByUserId = async (req, res) => {
  try {
    const chats = await Participant.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(req.params.userId) },
      },
      {
        $lookup: {
          from: "chats",
          localField: "chat",
          foreignField: "_id",
          as: "chat",
        },
      },
      {
        $unwind: "$chat",
      },
      {
        $replaceRoot: { newRoot: "$chat" },
      },
    ]);

    res.status(200).json({
      status: "success",
      results: chats.length,
      data: chats,
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
