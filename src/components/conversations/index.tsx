'use client'
import React from 'react'
import TabsMenu from '../tabs/index'
import { TABS_MENU } from '@/constants/menu'
import { TabsContent } from '../ui/tabs'
import ConversationSearch from './search'
import { Loader } from '../loader'
import ChatCard from './chat-card'
import { CardDescription } from '../ui/card'
import { Separator } from '../ui/separator'
import { useConversation } from '@/hooks/conversation/use-conversation'

type Props = {
  domains?:
    | {
        name: string
        id: string
        icon: string
      }[]
    | undefined
}

const ConversationMenu = ({ domains }: Props) => {
  const { register, chatRooms, loading, onGetActiveChatMessages } =
    useConversation()

  return (
    <div className="py-3 px-0">
      <TabsMenu triggers={TABS_MENU}>
        <TabsContent value="Непрочитанные">
          <ConversationSearch
            domains={domains}
            register={register}
          />
          <div className="flex flex-col">
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms.map((room) => (
                  <ChatCard
                    seen={room.chatRoom[0].message[0]?.seen}
                    id={room.chatRoom[0].id}
                    onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                    createdAt={room.chatRoom[0].message[0]?.createdAt}
                    key={room.chatRoom[0].id}
                    title={room.email!}
                    description={room.chatRoom[0].message[0]?.message}
                  />
                ))
              ) : (
                <CardDescription>Нет чатов для вашего домена</CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
        <TabsContent value="Все">
          <Separator
            orientation="horizontal"
            className="mt-5"
          />
          Все
        </TabsContent>
        <TabsContent value="Неактивные">
          <Separator
            orientation="horizontal"
            className="mt-5"
          />
          Неактивные
        </TabsContent>
        <TabsContent value="Избранные">
          <Separator
            orientation="horizontal"
            className="mt-5"
          />
          Избранные
        </TabsContent>
      </TabsMenu>
    </div>
  )
}

export default ConversationMenu
