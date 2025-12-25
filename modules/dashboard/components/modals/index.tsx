"use client";

import { useEffect, useState } from "react";
import { CreateProjectModal } from "./create-project-modal";
import { DeleteUserModal } from "./delete-user-modal";
import { FeedbackModal } from "./feedback-modal";
import { UpdateUsernameModal } from "./update-username-modal";

export const Modal = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      <UpdateUsernameModal />
      <CreateProjectModal />
      <DeleteUserModal />
      <FeedbackModal />
    </>
  );
};
