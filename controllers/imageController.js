// controllers/imageController.js
const Image = require("../models/Image");

// Create a new image
const createImage = async (req, res) => {
  try {
    const newImage = await Image.create(req.body);

    res.json(newImage);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Get all images
const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();

    res.json(images);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch images",
    });
  }
};

// Get single image by ID
const getImageById = async (req, res) => {
  try {
    const image = await Image.findOne({ id: req.params.id });

    if (!image) {
      return res.status(404).json({
        success: false,
        error: "Image not found",
      });
    }

    res.json({
      success: true,
      data: image,
    });
  } catch (error) {
    console.error("Get image by ID error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch image",
    });
  }
};

// Update image details
const updateImage = async (req, res) => {
  try {
    const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body);

    res.json(updatedImage);
  } catch (error) {
    console.error("Update image error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update image",
    });
  }
};

// Delete image
const deleteImage = async (req, res) => {
  try {
    const deletedImage = await Image.findByIdAndDelete(req.params.id);

    res.json({ message: "Image deleted" });
  } catch (error) {
    console.error("Delete image error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete image",
    });
  }
};

// Search images
const searchImages = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: "Search query is required",
      });
    }

    const images = await Image.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: images,
      count: images.length,
    });
  } catch (error) {
    console.error("Search images error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to search images",
    });
  }
};

module.exports = {
  createImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
  searchImages,
};
