import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

//User Register : api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All field is required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User Already Registerd",
      });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hasedPassword });
    const token = jwt.sign({ id: user._id }, process.env.SECREATE_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF Protection
      path:"/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "User Registerd successfully",
      user: { email: user.email, name: user.name , _id: user._id},
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//User Login : api/user/login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "All field required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECREATE_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path:"/"
    });

    return res.json({
      success: true,
      message: "User Login successfully",
      user: { email: user.email, name: user.name, _id:user._id ,cartItems: user.cartItems},
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//isAuth : api/user/is-auth

export const isAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // ✅ no need to read from req.body
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Logout : api/user/logout

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/"
    });

    return res.status(200).json({
      success: true,
      message: "Logout Successfully"
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

