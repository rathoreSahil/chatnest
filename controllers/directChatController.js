import DirectChat from "../models/directChatModel.js";

const createDirectChat = async (req, res) => {
  try {
    const newDirectChat = await DirectChat.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Direct Chat created successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getCurrentUserDirectChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const directChats = await DirectChat.find({
      $or: [{ user1: userId }, { user2: userId }],
    }).exec();

    res.status(200).json({
      status: "success",
      data: directChats,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteAllDirectChats = async (req, res) => {
  try {
    await DirectChat.deleteMany();
    res.status(204).json({
      status: "success",
      message: "All Direct Chats deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const directChatController = {
  createDirectChat,
  getCurrentUserDirectChats,
  deleteAllDirectChats,
};
