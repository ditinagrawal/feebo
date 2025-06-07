"use server";

import { db } from "@/db/connect";
import Board from "@/db/models/board.model";

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
