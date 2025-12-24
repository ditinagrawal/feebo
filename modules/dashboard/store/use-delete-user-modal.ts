"use client";

import { atom, useAtom } from "jotai";

const deleteUserState = atom(false);

export const useDeleteUserModal = () => {
  return useAtom(deleteUserState);
};
