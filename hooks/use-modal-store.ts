import { create } from "zustand";
import { ChannelType, Server } from "@prisma/client";

export type ModalType =
  | "invite"
  | "members"
  | "editServer"
  | "leaveServer"
  | "deleteServer"
  | "createServer"
  | "createChannel";

interface ModalData {
  server?: Server;
  channelType?: ChannelType;
}

interface ModalStore {
  isOpen: boolean;
  data: ModalData;
  onClose: () => void;
  type: ModalType | null;
  onOpen: (type: ModalType, data?: ModalData) => void;
}

export const useModal = create<ModalStore>((set) => ({
  data: {},
  type: null,
  isOpen: false,
  onClose: () => set({ isOpen: false, type: null }),
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
}));
