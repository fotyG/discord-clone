"use client";

import { Plus, Settings } from "lucide-react";
import { ChannelType, MemberRole } from "@prisma/client";

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import ActionTooltip from "@/components/action-tooltip";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  channelType?: ChannelType;
  sectionType: "channels" | "members";
  server?: ServerWithMembersWithProfiles;
}

const ServerSection = ({
  role,
  label,
  server,
  channelType,
  sectionType,
}: ServerSectionProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip
          side="top"
          label="Create Channel"
        >
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip
          side="top"
          label="Manage Members"
        >
          <button
            onClick={() => onOpen("members", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
export default ServerSection;
