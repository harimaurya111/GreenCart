import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  if (!sellerToken) {
    return res.json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.SECREATE_KEY);
    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.json({
        success: false,
        message: " Not Athorized",
      });
    }
  } catch (error) { 
    console.log(error.message)
    res.json({
        success:false,
        message:error.message
    })
  }
};


export default authSeller