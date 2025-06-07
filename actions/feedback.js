"use server";

import { db } from "@/db/connect";
import Board from "@/db/models/board.model";
import Feedback from "@/db/models/feedback.model";

export const getFeedbacks = async (slug) => {
  await db();
  const board = await Board.findOne({ slug });
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

export const createFeedback = async (slug, title, description) => {
  await db();
  const board = await Board.findOne({ slug });
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
