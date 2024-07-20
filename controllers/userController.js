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

const uploadProfilePhoto = async (req, res) => {
  try {
    console.log("file:", req.file);
    return res.status(200).json({
      status: "success",
      message: "Image uploaded successfully",
    });
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_images",
    });

    // Delete the image from the server
    deleteFile(req.file.path);

    // Send the Cloudinary URL in the response
    req.profilePhoto = result.secure_url;
    res.status(200).json({
      status: "success",
      data: {
        profilePhoto: req.profilePhoto,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "fail", message: "Error uploading image to Cloudinary" });
  }
};

const deleteProfilePhoto = async (req, res) => {
  try {
    const profilePhoto = req.user.photo;
    console.log(profilePhoto);
    const result = await cloudinary.uploader.destroy(profilePhoto, {
      invalidate: true,
    });

    console.log(result);

    return res.status(200).json({
      status: "success",
      message: "Image deleted successfully",
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
  uploadProfilePhoto,
  deleteProfilePhoto,
};
