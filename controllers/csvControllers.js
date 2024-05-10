const https = require("https"); // or 'https' for https:// URLs
const fs = require("fs");

const SERVER_URL = process.env.SERVER_URL;

exports.create = async (req, res) => {
  try {
    const image = req.file;

    let imagePath = "";
    if (image) {
      imagePath = image.path;
    }

    res.json({
      success: 1,
      file: {
        url: `${SERVER_URL}/${imagePath}`,
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
            url: `${SERVER_URL}/${imagePath}`,
          },
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};