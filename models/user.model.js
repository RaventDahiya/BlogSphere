const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function () {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString("hex");

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.password = hashedPassword;
  user.salt = salt;
});

userSchema.methods.isPasswordCorrect = function (password) {
  const hashedPassword = createHmac("sha256", this.salt)
    .update(password)
    .digest("hex");

  return hashedPassword === this.password;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
