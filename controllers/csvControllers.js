const https = require("https");
const fs = require("fs");

const PORT = process.env.PORT || 8000;

exports.create = async (req, res) => {
  try {
    const image = req.file;

    // Check if an image was uploaded
    if (!image) {
      return res.status(400).json({ success: 0, message: "No image uploaded" });
    }
    // Generate a unique filename
    const fileName = `${Date.now()}-${image.originalname}`;
    res.json({
      success: 1,
      file: {
        url: `https://image-uploader-eight-kappa.vercel.app/public/images/${fileName}`,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.createByUrl = async (req, res) => {
  try {
    const { url } = req.body;

    const name = Date.now().toString();
    const imagePath = `public/urls/${name}.jpg`;
    const file = fs.createWriteStream(`./${imagePath}`);
    https.get(url, (response) => {
      response.pipe(file);

      file.on("finish", () => {
        file.close();
        res.json({
          success: 1,
          file: {
            url: `https://image-uploader-eight-kappa.vercel.app/${imagePath}`,
          },
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
