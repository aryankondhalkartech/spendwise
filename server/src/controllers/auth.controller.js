import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import cookieOptions from "../utils/cookie-options.js";

export const register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email id already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
    });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email id or password",
      });
    }
    const isMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password,
    );
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email id or password",
      });
    }
    const token = jwt.sign(
      {
        sub: existingUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        currency: existingUser.currency,
        isOnboarded: existingUser.isOnboarded,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", cookieOptions);
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const existingUser = await User.findById(req.user).select("-password");

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        currency: existingUser.currency,
        isOnboarded: existingUser.isOnboarded,
      },
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
