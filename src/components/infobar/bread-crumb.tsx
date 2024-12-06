'use client'
import useSideBar from '@/context/use-sidebar'
import React from 'react'
import { Loader } from '../loader'
import { Switch } from '../ui/switch'

type Props = {}

const BreadCrumb = (props: Props) => {
  const {
    chatRoom,
    expand,
    loading,
    onActivateRealtime,
    onExpand,
    page,
    onSignOut,
    realtime,
  } = useSideBar()
  return (
    <div className="flex flex-col ">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">{page}</h2>
        {page === 'conversation' && chatRoom && (
          <Loader
            loading={loading}
            className="p-0 inline"
          >
            <Switch
              defaultChecked={realtime}
              onClick={(e) => onActivateRealtime(e)}
              className="data-[state=checked]:bg-orange data-[state=unchecked]:bg-peach"
            />
          </Loader>
        )}
      </div>
      <p className="text-gray-500 text-sm">
        {page == 'settings'
          ? 'Управляйте настройками своего аккаунта, предпочтениями и интеграциями'
          : page == 'dashboard'
          ? 'Подробный обзор ваших показателей, использования, клиентов и многого другого'
          : page == 'appointment'
          ? 'Просматривайте и редактируйте все ваши встречи'
          : page == 'email-marketing'
          ? 'Отправляйте массовые электронные письма своим клиентам'
          : page == 'integration'
          ? 'Подключайте сторонние приложения к Corinna-AI'
          : 'Измените настройки домена, измените параметры чат-бота, введите вопросы о продажах и обучите своего бота делать то, что вы от него хотите.'}
      </p>
    </div>
  )
}

export default BreadCrumb
