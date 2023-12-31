import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    logo: String,
    description: String,
    link: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    address: String,
    phone: String,
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  if (this.link) {
    return next();
  }
  this.link = `/menu/${this._id.toString()}`;
  next();
});

schema.virtual("id").get(function () {
  return this._id;
});

schema.set("toJSON", {
  virtuals: true,
});

export default mongoose.models.Restaurant ||
  mongoose.model("Restaurant", schema);
