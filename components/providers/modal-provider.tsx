"use client";

import { useState, useEffect } from "react";

import InviteModal from "@/components/modals/invite-modal";
import MembersModal from "@/components/modals/members-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
import LeaveServerModal from "@/components/modals/leave-server-modal";
import EditChannelModal from "@/components/modals/edit-channel-modal";
import MessageFileModal from "@/components/modals/message-file-modal";
import CreateServerModal from "@/components/modals/create-server-modal";
import DeleteServerModal from "@/components/modals/delete-server-modal";
import CreateChannelModal from "@/components/modals/create-channel-modal";
import DeleteChannelModal from "@/components/modals/delete-channel-modal";
import DeleteMessageModal from "@/components/modals/delete-message-modal";

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
      <LeaveServerModal />
      <EditChannelModal />
      <MessageFileModal />
      <CreateServerModal />
      <DeleteServerModal />
      <DeleteMessageModal />
      <CreateChannelModal />
      <DeleteChannelModal />
    </>
  );
};
