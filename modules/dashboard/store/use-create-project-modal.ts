"use client";

import { atom, useAtom } from "jotai";

const projectState = atom(false);

export const useCreateProjectModal = () => {
  return useAtom(projectState);
};
