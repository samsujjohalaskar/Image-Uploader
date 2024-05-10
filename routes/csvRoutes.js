const express = require("express");
const csvController = require("../controllers/csvControllers");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Save uploaded files to the 'public/images' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed!"));
    }
    cb(null, true);
  },
});

const router = express.Router();
// Post create new media
router.post("/createByUrl", csvController.createByUrl);

// Post create new media
router.post("/create", upload.single("file"), csvController.create);

module.exports = router;