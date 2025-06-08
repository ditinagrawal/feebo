import mongoose from "mongoose";
import slugify from "slugify";

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
  },
  {
    timestamps: true,
  }
);

boardSchema.index({ userId: 1, slug: 1 });

boardSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Board = mongoose.models.Board || mongoose.model("Board", boardSchema);

export default Board;
