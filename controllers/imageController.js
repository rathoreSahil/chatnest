import cloudinary from "cloudinary";
import deleteFile from "../utils/delete-file.js";

const uploadToCloudinary = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "images",
    });

    // Delete the image from the server
    deleteFile(req.file.path);

    res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const deleteFromCloudinary = async (req, res) => {
  try {
    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(req.body.publicId, {
      invalidate: true,
    });

    res.status(204).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const imageController = {
  uploadToCloudinary,
  deleteFromCloudinary,
};
