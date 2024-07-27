import mongoose from "mongoose";
import GroupChat from "../models/groupChatModel.js";
import Participant from "../models/participantModel.js";

const createGroupChat = async (req, res) => {
  try {
    const chat = await GroupChat.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Group Chat created successfully",
      data: chat,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getCurrentUserGroupChats = async (req, res) => {
  try {
    const groupChats = (
      await Participant.find({ user: req.user._id }).populate("group")
    ).map((item) => item.group);

    res.status(200).json({
      status: "success",
      data: groupChats,
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteAllGroupChats = async (req, res) => {
  try {
    await GroupChat.deleteMany();
    res.status(204).json({
      status: "success",
      message: "All Group Chats deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const groupChatController = {
  createGroupChat,
  getCurrentUserGroupChats,
  deleteAllGroupChats,
};
