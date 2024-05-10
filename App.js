const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const csvRoutes = require("./routes/csvRoutes");
const cors = require("cors");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    // origin: 'https://tasteandflavor.vercel.app',
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);

app.use("/api/uploadImage", csvRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

const DB = process.env.DATABASE;
const PORT = process.env.PORT || 8000;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database Connected.");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
