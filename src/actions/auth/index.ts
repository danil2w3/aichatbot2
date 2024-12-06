'use server'

import { client } from '@/lib/prisma'
import { onGetAllAccountDomains } from '../settings'
import { currentUser, redirectToSignIn } from '@clerk/nextjs/server'
import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    })

    if (registered) {
      return { status: 200, user: registered }
    }
  } catch (error) {
    return { status: 400 }
  }
}

export const onLoginUser = async () => {
  const user = await currentUser()

  

  if (!user){ 
    const signInUrl = new URL('/auth/sign-in', window.location.href);
    signInUrl.searchParams.set('redirect_url', window.location.href);
    NextResponse.redirect(signInUrl.toString(), 302);
  }
  else {
    try {
      const authenticated = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          fullname: true,
          id: true,
          type: true,
        },
      })
      if (authenticated) {
        const domains = await onGetAllAccountDomains()
        return { status: 200, user: authenticated, domain: domains?.domains }
      }
    } catch (error) {
      return { status: 400 }
    }
  }
}
