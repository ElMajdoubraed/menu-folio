import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "cancelled", "completed"],
    },
    items: [
      {
        item: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Item",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
    menu: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Restaurant",
    },
    description: String,
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

export default mongoose.models.Order || mongoose.model("Order", schema);
