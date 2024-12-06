import TabsMenu from '@/components/tabs/index'
import { TabsContent } from '@/components/ui/tabs'
import { HELP_DESK_TABS_MENU } from '@/constants/menu'
import React from 'react'
import HelpDesk from './help-desk'
import FilterQuestions from './filter-questions'

type Props = {
  id: string
}

const BotTrainingForm = ({ id }: Props) => {
  return (
    <div className="py-5 mb-10 flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Тернировка бота</h2>
        <p className="text-sm font-light">
          Задавайте часто задаваемые вопросы, создавайте вопросы для сбора информации о лидах и обучайте своего бота действовать так, как вы хотите.
        </p>
      </div>
      <TabsMenu triggers={HELP_DESK_TABS_MENU}>
        <TabsContent
          value="Служба поддержки"
          className="w-full"
        >
          <HelpDesk id={id} />
        </TabsContent>
        <TabsContent value="Вопросы">
          <FilterQuestions id={id} />
        </TabsContent>
      </TabsMenu>
    </div>
  )
}

export default BotTrainingForm
