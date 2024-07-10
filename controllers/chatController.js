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
