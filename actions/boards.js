"use server";

import { db } from "@/db/connect";
import Board from "@/db/models/board.model";
import Feedback from "@/db/models/feedback.model";

export const getBoards = async (userId) => {
  await db();
  const boards = await Board.find({ userId }).lean();
  return boards.map((board) => ({
    id: board._id.toString(),
    name: board.name,
    slug: board.slug,
    userId: board.userId.toString(),
    createdAt: board.createdAt,
    updatedAt: board.updatedAt,
  }));
};

export const createBoard = async (name, userId) => {
  await db();
  const board = await Board.create({ name, userId });
  return {
    id: board._id.toString(),
    name: board.name,
    slug: board.slug,
    userId: board.userId.toString(),
    createdAt: board.createdAt,
    updatedAt: board.updatedAt,
  };
};

export const getSingleBoard = async (slug) => {
  await db();
  const board = await Board.findOne({ slug }).populate("feedbacks").lean();
  return {
    id: board._id.toString(),
    name: board.name,
    slug: board.slug,
    createdAt: board.createdAt,
    feedbacks: board.feedbacks.map((feedback) => ({
      id: feedback._id.toString(),
      title: feedback.title,
      description: feedback.description,
      votes: feedback.votes,
      createdAt: feedback.createdAt,
    })),
  };
};

export const deleteBoard = async (slug) => {
  await db();
  await Board.deleteOne({ slug });
};
