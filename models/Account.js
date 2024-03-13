import mongoose, { ObjectId, Schema } from "mongoose";

const Account = mongoose.model(
  "Account",
  new Schema({
    accountID: ObjectId,
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
        required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

export default Account;