import User from "../models/userModel.js";
import cloudinary from "cloudinary";
import deleteFile from "../utils/delete-file.js";
import Participant from "../models/participantModel.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const getUsersByGroupId = async (req, res) => {
  try {
    const users = await Participant.find({
      group: req.params.groupId,
    })
      .populate("user")
      .map((item) => item.user);

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const uploadProfilePhoto = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_images",
    });

    // Update the user's photo in the database
    req.user.photo = result.secure_url;
    req.user.photoPublicId = result.public_id;
    await req.user.save();

    // Delete the image from the server
    deleteFile(req.file.path);

    res.status(200).json({
      status: "success",
      message: "Image uploaded successfully",
      user: req.user,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteProfilePhoto = async (req, res) => {
  try {
    const profilePhotoPublicId = req.user.photoPublicId;
    await cloudinary.uploader.destroy(profilePhotoPublicId, {
      invalidate: true,
    });

    req.user.photo = undefined;
    req.user.photoPublicId = undefined;
    await req.user.save();

    return res.status(200).json({
      status: "success",
      message: "Image deleted successfully",
      user: req.user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const userController = {
  getAllUsers,
  getUserById,
  getUsersByGroupId,
  uploadProfilePhoto,
  deleteProfilePhoto,
};
