"use client";

import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface CurrentProject {
  id: string;
  name: string;
  slug: string;
}

const currentProjectState = atomWithStorage<CurrentProject | null>("current-project", null);

export const useCurrentProject = () => {
  return useAtom(currentProjectState);
};
