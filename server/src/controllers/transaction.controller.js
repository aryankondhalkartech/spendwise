import Transaction from "../models/transaction.model.js";
import serverError from "../utils/server-error.js";

export const getAllTransactions = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = req.query.sort === "oldest" ? 1 : -1;

    const skip = (page - 1) * limit;

    const totalTransactions = await Transaction.countDocuments({
      user: req.user,
    });

    const transactions = await Transaction.find({
      user: req.user,
    })
      .sort({ date: sort })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalTransactions / limit),
        totalTransactions,
        limit,
      },
      transactions,
    });
  } catch (error) {
    return serverError(error, res);
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user,
    });
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "No transaction found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Transaction fetched successfully",
      transaction,
    });
  } catch (error) {
    serverError(error, res);
  }
};

export const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      title: req.body.title,
      amount: req.body.amount,
      type: req.body.type,
      category: req.body.category,
      date: req.body.date,
      note: req.body.note,
      user: req.user,
    });
    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    serverError(error, res);
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user,
      },
      {
        title: req.body.title,
        amount: req.body.amount,
        type: req.body.type,
        category: req.body.category,
        date: req.body.date,
        note: req.body.note,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "No transaction found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    serverError(error, res);
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "No transaction found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    serverError(error, res);
  }
};
