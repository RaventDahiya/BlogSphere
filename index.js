const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./routes/user.router.js");
const dotenv = require("dotenv");
dotenv.config("./.env");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectDB();
