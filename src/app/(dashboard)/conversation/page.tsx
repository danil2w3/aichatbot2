import { onGetAllAccountDomains } from '@/actions/settings'
import ConversationMenu from '@/components/conversations'
import Messenger from '@/components/conversations/messenger'
import InfoBar from '@/components/infobar'
import { Separator } from '@/components/ui/separator'
import React from 'react'

type Props = {}

const ConversationPage = async (props: Props) => {
  const domains = await onGetAllAccountDomains()
  return (
    <div className="max-h-3xl max-w-screen-x1 md:w-full md:h-full flex flex-col h-1/5 md:flex-row md:h-1/2">
      <div>
        <ConversationMenu domains={domains?.domains} />
      </div>

      <Separator orientation="vertical" />
      <div className="md:w-full flex flex-col">
        <div className="px-5">
          <InfoBar />
        </div>
        <Messenger />
      </div>
    </div>
  )
}

export default ConversationPage
