"use server";
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: "2024-04-10",
});

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export async function GET() {
  try {
    // Шаг 1: Получение текущего пользователя
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    console.log("User authenticated", user.id);

    // Шаг 2: Создание аккаунта в Stripe
    const account = await stripe.accounts.create({
      country: "US",
      type: "custom",
      business_type: "company",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      external_account: "btok_us",
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: "77.91.84.94",
      },
    });

    console.log("Stripe account created", account.id);

    // Шаг 3: Обновление данных аккаунта
    const approve = await stripe.accounts.update(account.id, {
      business_profile: {
        mcc: "5045",
        url: "https://bestcookieco.com",
      },
      company: {
        address: {
          city: "Fairfax",
          line1: "123 State St",
          postal_code: "22031",
          state: "VA",
        },
        tax_id: "000000000",
        name: "The Best Cookie Co",
        phone: "8888675309",
      },
    });

    console.log("Account updated", account.id);

    // Шаг 4: Создание персон для аккаунта
    const person = await stripe.accounts.createPerson(account.id, {
      first_name: "Jenny",
      last_name: "Rosen",
      relationship: {
        representative: true,
        title: "CEO",
      },
    });

    console.log("Person created", person.id);

    const approvePerson = await stripe.accounts.updatePerson(account.id, person.id, {
      address: {
        city: "Victoria",
        line1: "123 State St",
        postal_code: "V8P 1A1",
        state: "BC",
      },
      dob: {
        day: 10,
        month: 11,
        year: 1980,
      },
      ssn_last_4: "0000",
      phone: "8888675309",
      email: "jenny@bestcookieco.com",
      relationship: {
        executive: true,
      },
    });

    console.log("Person updated", person.id);

    // Шаг 5: Создание владельца
    const owner = await stripe.accounts.createPerson(account.id, {
      first_name: "Kathleen",
      last_name: "Banks",
      email: "kathleen@bestcookieco.com",
      address: {
        city: "Victoria",
        line1: "123 State St",
        postal_code: "V8P 1A1",
        state: "BC",
      },
      dob: {
        day: 10,
        month: 11,
        year: 1980,
      },
      phone: "8888675309",
      relationship: {
        owner: true,
        percent_ownership: 80,
      },
    });

    console.log("Owner created", owner.id);

    // Шаг 6: Завершение настройки аккаунта
    const complete = await stripe.accounts.update(account.id, {
      company: {
        owners_provided: true,
      },
    });

    console.log("Account completion", account.id);

    // Шаг 7: Сохранение Stripe ID в базе данных
    const saveAccountId = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        stripeId: account.id,
      },
    });

    console.log("Stripe account ID saved in database", saveAccountId);

    // Шаг 8: Генерация ссылки для завершения регистрации
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "https://aichatbot2-wtl4.vercel.app/callback/stripe/refresh",
      return_url: "https://aichatbot2-wtl4.vercel.app/callback/stripe/success",
      type: "account_onboarding",
    });

    console.log("Account link generated", accountLink.url);

    return NextResponse.json({
      url: accountLink.url,
    });
  } catch (error) {
    console.error("An error occurred when calling the Stripe API to create an account:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
