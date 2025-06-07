import mongoose from "mongoose";
import slugify from "slugify";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
