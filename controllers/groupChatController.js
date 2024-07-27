import GroupChat from "../models/groupChatModel.js";
import Participant from "../models/participantModel.js";
import cloudinary from "cloudinary";
import deleteFile from "../utils/delete-file.js";

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

const uploadGroupChatPhoto = async (req, res) => {
  try {
    const groupChat = await GroupChat.findById(req.params.groupId);

    if (!groupChat) {
      return res.status(404).json({
        status: "fail",
        message: "Group Chat not found",
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "group_chat_images",
    });

    // Update the group chat's photo in the database
    groupChat.photo = result.secure_url;
    groupChat.photoPublicId = result.public_id;
    await groupChat.save();

    // Delete the image from the server
    deleteFile(req.file.path);

    res.status(200).json({
      status: "success",
      message: "Image uploaded successfully",
      data: groupChat,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteGroupChatPhoto = async (req, res) => {
  try {
    const groupChat = await GroupChat.findById(req.params.groupId);

    if (!groupChat) {
      return res.status(404).json({
        status: "fail",
        message: "Group Chat not found",
      });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(groupChat.photoPublicId, {
      invalidate: true,
    });

    // Update the group chat's photo in the database
    groupChat.photo = undefined;
    groupChat.photoPublicId = undefined;
    await groupChat.save();

    res.status(204).json({
      status: "success",
      message: "Image deleted successfully",
      data: groupChat,
    });
  } catch (error) {
    console.error(error);
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
  uploadGroupChatPhoto,
  deleteGroupChatPhoto,
};
