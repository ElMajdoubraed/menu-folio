import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    description: String,
    image: String,
    rating: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
      max: 5,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
    menu: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Restaurant",
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("id").get(function () {
  return this._id;
});

schema.set("toJSON", {
  virtuals: true,
});

export default mongoose.models.Item || mongoose.model("Item", schema);
