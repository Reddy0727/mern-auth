import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized. Please login again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Invalid token. Please login again." });
    }

    // Attach userId in a clear format
    req.user = { userId: decoded.id };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Token verification failed",
    });
  }
};

export default userAuth;
