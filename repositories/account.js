import Account from "../models/Account.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createAccount = async ({ username, password }) => {
  try {
    const existAccount = await Account.findOne({ username });
    if (existAccount) {
      throw new Error("Account exist");
    } else {
      const hashPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SECRET_KEY)
      );
      const newUser = await User.create({
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        email: "",
        image: "",
      });
      const newAccount = await Account.create({
        username,
        password: hashPassword,
        user: newUser._id,
      });
      return newAccount;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getAllAccount = async () => {
  try {
    const result = await Account.find().populate({
      path: "user",
      populate: {
        path: "role",
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const login = async ({ username, password }) => {
  try {
    const existingUser = await Account.findOne({ username }).populate({
      path: "user",
      populate: {
        path: "role",
      },
    });
    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch == true) {
        //Tạo ra 1 cái Access Token từ JWT => Là key = header + payload + secret_key
        const token = jwt.sign(
          {
            data: existingUser,
          },
          process.env.SECRET_KEY_JWT,
          {
            expiresIn: "1d",
          }
        );
        return {
          ...existingUser.toObject(),
          password: "Not show",
          token: token,
        };
      } else {
        throw new Error("Wrong email and password");
      }
    } else {
      throw new Error("User not exits");
    }
  } catch (error) {
    throw new Error(error);
  }
};

const changePassword = async (id, password) => {
  try {
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SECRET_KEY)
    );
    const result = await Account.updateOne(
      { _id: id },
      { password: hashPassword }
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export default { createAccount, getAllAccount, login, changePassword };