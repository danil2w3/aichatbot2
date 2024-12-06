import { getUserAppointments } from '@/actions/appointment'
import {
  getUserBalance,
  getUserClients,
  getUserPlanInfo,
  getUserTotalProductPrices,
  getUserTransactions,
} from '@/actions/dashboard'
import DashboardCard from '@/components/dashboard/cards'
import { PlanUsage } from '@/components/dashboard/plan-usage'
import InfoBar from '@/components/infobar'
import { Separator } from '@/components/ui/separator'
import CalIcon from '@/icons/cal-icon'
import EmailIcon from '@/icons/email-icon'
import PersonIcon from '@/icons/person-icon'
import { TransactionsIcon } from '@/icons/transactions-icon'
import { DollarSign } from 'lucide-react'
import React from 'react'

type Props = {}

const Page = async (props: Props) => {
  const clients = await getUserClients()
  const sales = await getUserBalance()
  const bookings = await getUserAppointments()
  const plan = await getUserPlanInfo()
  const transactions = await getUserTransactions()
  const products = await getUserTotalProductPrices()

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <div className="flex gap-5 flex-wrap">
          <DashboardCard
            value={clients || 0}
            title="Потенциальные клиенты"
            icon={<PersonIcon />}
          />
          <DashboardCard
            value={products! * clients! || 0}
            sales
            title="Pipline Value"
            icon={<DollarSign />}
          />
          <DashboardCard
            value={bookings || 0}
            title="Записи"
            icon={<CalIcon />}
          />
          <DashboardCard
            value={sales || 0}
            sales
            title="Общие продажи"
            icon={<DollarSign />}
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10">
          <div>
          <div>
            <h2 className="font-medium text-2xl">Использование плана</h2>
            <p className="text-sm font-light">
              Подробный обзор ваших показателей, использования, клиентов и многого другого
            </p>
          </div>

            <PlanUsage
              plan={plan?.plan!}
              credits={plan?.credits || 0}
              domains={plan?.domains || 0}
              clients={clients || 0}
            />
          </div>
          <div className="flex flex-col">
          <div className="w-full flex justify-between items-start mb-5">
            <div className="flex gap-3 items-center">
              <TransactionsIcon />
              <p className="font-medium">Недавние транзакции</p>
            </div>
            <p className="text-sm">Посмотреть больше</p>
          </div>
            <Separator orientation="horizontal" />
            {transactions &&
              transactions.data.map((transaction) => (
                <div
                  className="flex gap-3 w-full justify-between items-center border-b-2 py-5"
                  key={transaction.id}
                >
                  <p className="font-medium">
                    {transaction.calculated_statement_descriptor}
                  </p>
                  <p className="font-medium text-xl">
                    ${transaction.amount / 100}
                  </p>
                </div>
              ))} : [<p className="text-sm">Stripe не подключен</p>]
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
