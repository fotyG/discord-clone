"use client";

import Image from "next/image";
import { useState } from "react";
import { Member, MemberRole, Profile } from "@prisma/client";
import { FileIcon, ShieldAlert, ShieldCheck } from "lucide-react";

import UserAvatar from "@/components/user-avatar";
import ActionTooltip from "@/components/action-tooltip";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  deleted: boolean;
  timestamp: string;
  socketUrl: string;
  isUpdated: boolean;
  currentMember: Member;
  fileUrl: string | null;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  GUEST: null,
  ADMIN: <ShieldAlert className="w-4 h-4 ml-2 text-rose-500" />,
  MODERATOR: <ShieldCheck className="w-4 h-4 ml-2 text-indigo-500" />,
};

const ChatItem = ({
  id,
  member,
  fileUrl,
  content,
  deleted,
  timestamp,
  socketUrl,
  isUpdated,
  socketQuery,
  currentMember,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileType = fileUrl?.split(".").pop();

  const isOwner = currentMember.id === member.id;
  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;

  const canEditMessage = !deleted && isOwner && !fileUrl;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);

  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="font-semibold text-sm hover:underline cursor-pointer">
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image
                fill
                src={fileUrl}
                alt={content}
                className="object-cover"
              />
            </a>
          )}
          {isPDF && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatItem;
