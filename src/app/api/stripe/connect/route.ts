"use server"
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: '2024-04-10',
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Создание аккаунта Stripe
    const accountPromise = stripe.accounts.create({
      country: 'US',
      type: 'custom',
      business_type: 'company',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      external_account: 'btok_us',
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: '77.91.84.94',
      },
    });

    // Параллельное выполнение создания персон
    const createPersonPromise1 = (accountId: string) =>
      stripe.accounts.createPerson(accountId, {
        first_name: 'Jenny',
        last_name: 'Rosen',
        relationship: {
          representative: true,
          title: 'CEO',
        },
      });

    const createPersonPromise2 = (accountId: string) =>
      stripe.accounts.createPerson(accountId, {
        first_name: 'Kathleen',
        last_name: 'Banks',
        email: 'kathleen@bestcookieco.com',
        address: {
          city: 'Victoria',
          line1: '123 State St',
          postal_code: 'V8P 1A1',
          state: 'BC',
        },
        dob: {
          day: 10,
          month: 11,
          year: 1980,
        },
        phone: '8888675309',
        relationship: {
          owner: true,
          percent_ownership: 80,
        },
      });

    const [account, person1, person2] = await Promise.all([
      accountPromise,
      createPersonPromise1(''),
      createPersonPromise2(''),
    ]);

    // Обновление аккаунта и персон
    const updateAccountPromise = stripe.accounts.update(account.id, {
      business_profile: {
        mcc: '5045',
        url: 'https://bestcookieco.com',
      },
      company: {
        address: {
          city: 'Fairfax',
          line1: '123 State St',
          postal_code: '22031',
          state: 'VA',
        },
        tax_id: '000000000',
        name: 'The Best Cookie Co',
        phone: '8888675309',
      },
    });

    const updatePersonPromise1 = stripe.accounts.updatePerson(account.id, person1.id, {
      address: {
        city: 'Victoria',
        line1: '123 State St',
        postal_code: 'V8P 1A1',
        state: 'BC',
      },
      dob: {
        day: 10,
        month: 11,
        year: 1980,
      },
      ssn_last_4: '0000',
      phone: '8888675309',
      email: 'jenny@bestcookieco.com',
      relationship: {
        executive: true,
      },
    });

    // Ожидаем обновления аккаунта и персоны
    await Promise.all([updateAccountPromise, updatePersonPromise1]);

    // Обновление владельца аккаунта
    const completeAccountPromise = stripe.accounts.update(account.id, {
      company: {
        owners_provided: true,
      },
    });

    // Сохранение Stripe ID в базе данных
    const saveAccountIdPromise = client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        stripeId: account.id,
      },
    });

    const [completeAccount, saveAccountId] = await Promise.all([
      completeAccountPromise,
      saveAccountIdPromise,
    ]);

    // Создание ссылки для аккаунта
    const accountLinkPromise = stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${BASE_URL}/callback/stripe/refresh`,
      return_url: `${BASE_URL}/callback/stripe/success`,
      type: 'account_onboarding',
    });

    const accountLink = await accountLinkPromise;

    return NextResponse.json({
      url: accountLink.url,
    });
  } catch (error) {
    console.error(
      'An error occurred when calling the Stripe API to create an account:',
      error
    );
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
