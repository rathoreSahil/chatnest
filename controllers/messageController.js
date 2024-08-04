import Message from "../models/messageModel.js";

const addMessage = async (req, res) => {
  try {
    req.body.message.sender = req.user._id;
    const message = await Message.create(req.body.message);

    res.status(201).json({
      status: "success",
      message: "Message added successfully",
      data: message,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getMessagesByChatId = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { groupChat: req.params.chatId },
        { directChat: req.params.chatId },
      ],
    }).populate("sender", "name");

    res.status(200).json({
      status: "success",
      data: messages,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteAllMessages = async (req, res) => {
  try {
    await Message.deleteMany();

    res.status(204).json({
      status: "success",
      message: "All Messages deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const messageController = {
  addMessage,
  getMessagesByChatId,
  deleteAllMessages,
};
