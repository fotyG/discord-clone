"use client";

import { useState, useEffect } from "react";

import InviteModal from "@/components/modals/invite-modal";
import MembersModal from "@/components/modals/members-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
import CreateServerModal from "@/components/modals/create-server-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <InviteModal />
      <MembersModal />
      <EditServerModal />
      <CreateServerModal />
    </>
  );
};
