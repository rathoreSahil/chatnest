import DirectChat from "../models/directChatModel.js";

const createDirectChat = async (req, res) => {
  try {
    req.body.user1 = req.user._id;
    const newDirectChat = await DirectChat.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Direct Chat created successfully",
      data: newDirectChat,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getDirectChatById = async (req, res) => {
  try {
    const directChat = await DirectChat.findById(req.params.id)
      .populate("user1")
      .populate("user2")
      .exec();

    res.status(200).json({
      status: "success",
      data: directChat,
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
    })
      .populate("user1")
      .populate("user2")
      .exec();

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

const updateDirectChat = async (req, res) => {
  try {
    console.log(req.body);
    const updatedDirectChat = await DirectChat.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    console.log(updatedDirectChat);

    res.status(200).json({
      status: "success",
      message: "Direct Chat updated successfully",
      data: updatedDirectChat,
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
  getDirectChatById,
  getCurrentUserDirectChats,
  updateDirectChat,
  deleteAllDirectChats,
};
