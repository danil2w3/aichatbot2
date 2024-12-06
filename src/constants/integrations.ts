type IntegrationsListItemProps = {
  id: string
  name: 'stripe'
  logo: string
  description: string
  title: string
  modalDescription: string
}

export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
  {
    id: '1',
    name: 'stripe',
    description:
      'Stripe — это самый быстрый и простой способ интегрировать платежи и финансовые услуги в вашу программную платформу или торговую площадку.',
    logo: 'c54e81fa-ddd9-413a-b907-c51db6196aa7',
    title: 'Подключение Stripe аккаунта',
    modalDescription:
      'Самые успешные в мире платформы и торговые площадки, включая Shopify и DoorDash, используют Stripe Connect.',
  },
]
