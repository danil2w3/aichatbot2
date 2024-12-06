import CalIcon from "@/icons/cal-icon"
import ChatIcon from "@/icons/chat-icon"
import DashboardIcon from "@/icons/dashboard-icon"
import EmailIcon from "@/icons/email-icon"
import HelpDeskIcon from "@/icons/help-desk-icon"
import IntegrationsIcon from "@/icons/integrations-icon"
import SettingsIcon from "@/icons/settings-icon"
import StarIcon from "@/icons/star-icon"
import TimerIcon from "@/icons/timer-icon"


type SIDE_BAR_MENU_PROPS = {
  label: string
  icon: JSX.Element
  path: string
}

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: 'Панель',
    icon: <DashboardIcon />,
    path: 'dashboard',
  },
  {
    label: 'Обсуждение',
    icon: <ChatIcon />,
    path: 'conversation',
  },
  {
    label: 'Интеграции',
    icon: <IntegrationsIcon />,
    path: 'integration',
  },
  {
    label: 'Настройки',
    icon: <SettingsIcon />,
    path: 'settings',
  },
  {
    label: 'Встречи',
    icon: <CalIcon />,
    path: 'appointment',
  },
  {
    label: 'Email маркетинг',
    icon: <EmailIcon />,
    path: 'email-marketing',
  },
]

type TABS_MENU_PROPS = {
  label: string
  icon?: JSX.Element
}

export const TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'Непрочитанные',
    icon: <EmailIcon />,
  },
  {
    label: 'Все',
    icon: <EmailIcon />,
  },
  {
    label: 'Неактивные',
    icon: <TimerIcon />,
  },
  {
    label: 'Избранные',
    icon: <StarIcon />,
  },
]

export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'Служба поддержки',
  },
  {
    label: 'Вопросы',
  },
]

export const APPOINTMENT_TABLE_HEADER = [
  'Name',
  'RequestedTime',
  'Added Time',
  'Domain',
]

export const EMAIL_MARKETING_HEADER = ['Id', 'Email', 'Answers', 'Domain']

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'chat',
    icon: <ChatIcon />,
  },
  {
    label: 'helpdesk',
    icon: <HelpDeskIcon />,
  },
]
