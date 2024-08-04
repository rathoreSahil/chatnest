import cloudinary from "cloudinary";

const uploadToCloudinary = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "images",
    });

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
