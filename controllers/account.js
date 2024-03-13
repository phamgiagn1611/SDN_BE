import { accountRepository } from "../repositories/index.js";
const createAccount = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newAccount = await accountRepository.createAccount({
      username,
      password,
    });
    return res.status(201).json({
      message: "Create successfully.",
      data: newAccount,
    });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await accountRepository.getAllAccount();
    return res.status(200).json({
      message: "Get all data successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Call action cua Repository (DAO)
    const existingUser = await accountRepository.login({ username, password });
    console.log("🚀 ========= existingUser:", existingUser);
    res.status(200).json({
      message: "Login successfully.",
      data: existingUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const changePassword = async (req, res) => {
  const { id, password } = req.body;
  try {
    const result = await accountRepository.changePassword(id, password);
    res.status(200).json({
      message: "Change password successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
export default {
  createAccount,
  getAllUser,
  login,
  changePassword,
};