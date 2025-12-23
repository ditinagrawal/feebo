"use client";

import { atom, useAtom } from "jotai";

import { Project } from "@/lib/generated/prisma/client";

const currentProjectState = atom<Project | null>(null);

export const useCurrentProject = () => {
  return useAtom(currentProjectState);
};
