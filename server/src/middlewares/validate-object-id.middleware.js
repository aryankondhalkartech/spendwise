import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  if (!mongoose.Schema.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid resource id",
    });
  }
  next();
};

export default validateObjectId;
