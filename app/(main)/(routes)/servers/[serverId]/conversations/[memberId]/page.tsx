import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import MediaRoom from "@/components/media-room";
import { redirectToSignIn } from "@clerk/nextjs";
import ChatInput from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile";
import ChatHeader from "@/components/chat/chat-header";
import ChatMessages from "@/components/chat/chat-messages";
import { getOrCreateConversation } from "@/lib/conversation";

interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
  searchParams: {
    video?: boolean;
  };
}

const MemberIdPage = async ({ params, searchParams }: MemberIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        type="conversation"
        serverId={params.serverId}
        name={otherMember.profile.name}
        imageUrl={otherMember.profile.imageUrl}
      />
      {searchParams.video && (
        <MediaRoom
          audio={true}
          video={true}
          chatId={conversation.id}
        />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages
            type="conversation"
            member={currentMember}
            chatId={conversation.id}
            paramKey="conversationId"
            paramValue={conversation.id}
            apiUrl="/api/direct-messages"
            name={otherMember.profile.name}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
          />
          <ChatInput
            type="conversation"
            name={otherMember.profile.name}
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
          />
        </>
      )}
    </div>
  );
};
export default MemberIdPage;
