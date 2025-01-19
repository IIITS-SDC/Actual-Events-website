import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

// Signup controller
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword  } = req.body;

    // Validate required fields
    if (!name || !email || !password || !confirmpassword  ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate a token and set it in a cookie
    createTokenAndSaveCookie(newUser._id, res);

    res.status(201).json({
      message: "User created successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        clubType: newUser.clubType,
        _id: newUser._id,

      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token and set it in a cookie
    createTokenAndSaveCookie(user._id, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Logout controller
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile controller
export const getUserProfile = async (req, res) => {
  try {
    // Retrieve all users and exclude their passwords
    const allUsers = await User.find().select("-password");

    res.status(200).json({ users: allUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

