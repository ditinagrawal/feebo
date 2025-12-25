"use client";

import { atom, useAtom } from "jotai";

const feedbackState = atom(false);

export const useFeedbackModal = () => {
  return useAtom(feedbackState);
};
