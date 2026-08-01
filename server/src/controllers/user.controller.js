import User from "../models/user.model.js";

const updateCurrencyPreference = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user,
      {
        currency: req.body.currency,
        isOnboarded: true,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return res.status(200).json({
      success: true,
      message: "Currency preference updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        currency: user.currency,
        isOnboarded: user.isOnboarded,
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

export default updateCurrencyPreference;
