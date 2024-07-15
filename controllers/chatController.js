import mongoose from "mongoose";
import Chat from "../models/chatModel.js";
import Participant from "../models/participantModel.js";

const createChat = async (req, res) => {
  try {
    const chat = await Chat.create(req.body);

    res.status(201).json({
      status: "success",
      data: chat,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json({
      status: "success",
      results: chats.length,
      data: {
        chats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getChatsByUserId = async (req, res) => {
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
      data: chats,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteAllChats = async (req, res) => {
  try {
    await Chat.deleteMany();
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

export const chatController = {
  createChat,
  getAllChats,
  getChatsByUserId,
  deleteAllChats,
};
