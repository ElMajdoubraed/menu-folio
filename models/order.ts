import mongoose from "mongoose";
const Item = require("./item");

const { Schema } = mongoose;
const schema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      uppercase: true,
    },
    status: {
      type: String,
      enum: ["قيد الانتظار", "ملغي", "مكتمل"],
      default: "قيد الانتظار",
      description: "Used to determine the status of the order",
    },
    variant: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
      description: "Used to determine the variant of the order badge",
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
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

schema.statics.getOrders = async function (menu: string) {
  const orders = await this.find({
    menu,
    variant: "pending",
  })
    .populate("items.item")
    .exec();

  return orders;
};

export default mongoose.models.Order || mongoose.model("Order", schema);
