import Message from "../models/messageModel.js";

const addMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body.message);

    res.status(201).json({
      status: "success",
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
    const messages = await Message.find({ chat: req.params.chatId });

    res.status(200).json({
      status: "success",
      data: messages,
    });
  } catch (error) {
    console.log(error);
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
