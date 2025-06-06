import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({
      success: false,
      message: "User Not Athorized",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.SECREATE_KEY);
    if (tokenDecode.id) {
        req.userId = tokenDecode.id; 
    } else {
      return res.json({
        success: false,
        message: "User Not Athorized",
      });
    }
    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;
