import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
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

export default mongoose.models.Category || mongoose.model("Category", schema);
