const User = require("../models/user.model.js");

const handleUserSignup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName?.trim() || !email?.trim() || !password) {
      return res.redirect(
        "/user/signup?error=Full%20name%2C%20email%2C%20and%20password%20are%20required",
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.redirect("/user/signup?error=User%20already%20exists");
    }

    await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password,
    });

    return res.redirect("/user/signin?success=User%20created%20successfully");
  } catch (error) {
    if (error.code === 11000) {
      return res.redirect("/user/signup?error=User%20already%20exists");
    }

    console.error("User signup failed:", error);
    return res.redirect(
      "/user/signup?error=Unable%20to%20create%20user.%20Please%20try%20again.",
    );
  }
};

const handleUserSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.redirect(
        `/user/signin?error=${encodeURIComponent(
          "Email and password are required",
        )}`,
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !user.isPasswordCorrect(password)) {
      return res.redirect(
        `/user/signin?error=${encodeURIComponent("Invalid email or password")}`,
      );
    }

    return res.redirect("/");
  } catch (error) {
    console.error("User signin failed:", error);
    return res.redirect(
      `/user/signin?error=${encodeURIComponent(
        "Unable to sign in. Please try again.",
      )}`,
    );
  }
};

module.exports = { handleUserSignup, handleUserSignin };
