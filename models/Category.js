import mongoose, { ObjectId, Schema } from "mongoose";

const Category = mongoose.model(
  "Category",
  new Schema(
    {
      id: ObjectId,
      name: {
        type: String,
        require: true,
      },
      description: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Category;
