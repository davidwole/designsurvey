// routes/imageRoutes.js
const express = require("express");
const router = express.Router();
const {
  createImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
  searchImages,
} = require("../controllers/imageController");

// @route   POST /api/images
// @desc    Create a new image record
// @access  Public
router.post("/", createImage);

// @route   GET /api/images
// @desc    Get all images with pagination
// @access  Public
router.get("/", getAllImages);

// @route   GET /api/images/search
// @desc    Search images by title or description
// @access  Public
router.get("/search", searchImages);

// @route   GET /api/images/:id
// @desc    Get single image by ID
// @access  Public
router.get("/:id", getImageById);

// @route   PUT /api/images/:id
// @desc    Update image details
// @access  Public
router.put("/:id", updateImage);

// @route   DELETE /api/images/:id
// @desc    Delete image
// @access  Public
router.delete("/:id", deleteImage);

module.exports = router;
