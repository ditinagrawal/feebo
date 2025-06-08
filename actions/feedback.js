"use server";

import { db } from "@/db/connect";
import Board from "@/db/models/board.model";
import Feedback from "@/db/models/feedback.model";
import User from "@/db/models/user.model";

export const getFeedbacks = async (username, boardSlug) => {
  await db();
  const user = await User.findOne({ slug: username });
  if (!user) {
    throw new Error("User not found");
  }
  const board = await Board.findOne({ userId: user._id, slug: boardSlug });
  if (!board) {
    throw new Error("Board not found");
  }
  const feedbacks = await Feedback.find({ boardId: board._id }).lean();
  return feedbacks.map((feedback) => ({
    id: feedback._id.toString(),
    title: feedback.title,
    description: feedback.description,
    votes: feedback.votes,
  }));
};

export const createFeedback = async (
  username,
  boardSlug,
  title,
  description
) => {
  await db();
  const user = await User.findOne({ slug: username });
  if (!user) {
    throw new Error("User not found");
  }
  const board = await Board.findOne({ userId: user._id, slug: boardSlug });
  if (!board) {
    throw new Error("Board not found");
  }
  const feedback = await Feedback.create({
    boardId: board._id,
    title,
    description,
  });

  await Board.findByIdAndUpdate(board._id, {
    $push: { feedbacks: feedback._id },
  });

  return {
    id: feedback._id.toString(),
    title: feedback.title,
    description: feedback.description,
    votes: feedback.votes,
  };
};

export const deleteFeedback = async (id) => {
  await db();
  await Feedback.findByIdAndDelete(id);
};

export const updateFeedbackVotes = async (id, increment) => {
  await db();
  const feedback = await Feedback.findById(id);
  if (!feedback) {
    throw new Error("Feedback not found");
  }

  // Prevent negative votes
  if (!increment && feedback.votes <= 0) {
    return {
      id: feedback._id.toString(),
      votes: 0,
    };
  }

  const updatedFeedback = await Feedback.findByIdAndUpdate(
    id,
    { $inc: { votes: increment ? 1 : -1 } },
    { new: true }
  );

  return {
    id: updatedFeedback._id.toString(),
    votes: updatedFeedback.votes,
  };
};
