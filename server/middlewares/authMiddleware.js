import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Authorization token missing",
        success: false,
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decodedToken;

    if (req.user.role !== "Admin" && req.user.isApproved === false) {
      return res.status(403).json({
        message: "Account pending admin approval",
        success: false,
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default authMiddleware;