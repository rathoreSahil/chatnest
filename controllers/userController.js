import User from "../models/userModel.js";
import cloudinary from "cloudinary";
import deleteFile from "../utils/delete-file.js";

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

const uploadProfilePhoto = async (req, res, next) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_images",
    });

    deleteFile(req.file.path);

    // Send the Cloudinary URL in the response
    req.profilePhoto = result.secure_url;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "fail", message: "Error uploading image to Cloudinary" });
  }
};

export const userController = {
  getAllUsers,
  uploadProfilePhoto,
};
