"use client";

import { atom, useAtom } from "jotai";

const updateUsernameState = atom(false);

export const useUpdateUsernameModal = () => {
  return useAtom(updateUsernameState);
};
