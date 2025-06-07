import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    votes: { type: Number, default: 0 },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default Feedback;
