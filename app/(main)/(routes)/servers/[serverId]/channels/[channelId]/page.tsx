import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";

import { db } from "@/lib/db";
import MediaRoom from "@/components/media-room";
import { redirectToSignIn } from "@clerk/nextjs";
import ChatInput from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile";
import ChatHeader from "@/components/chat/chat-header";
import ChatMessages from "@/components/chat/chat-messages";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({
  params: { serverId, channelId },
}: ChannelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile?.id,
    },
  });

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        type="channel"
        name={channel.name}
        serverId={channel.serverId}
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            type="channel"
            member={member}
            name={channel.name}
            chatId={channel.id}
            paramKey="channelId"
            apiUrl="/api/messages"
            paramValue={channel.id}
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
          <ChatInput
            type="channel"
            name={channel.name}
            query={{ channelId: channel.id, serverId: channel.serverId }}
            apiUrl="/api/socket/messages"
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom
          audio={true}
          video={false}
          chatId={channel.id}
        />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom
          audio={true}
          video={true}
          chatId={channel.id}
        />
      )}
    </div>
  );
};
export default ChannelIdPage;
