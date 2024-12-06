import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/auth(.*)', '/portal(.*)', '/images(.*)', '/favicon.ico'],
  ignoredRoutes: ['/chatbot'],
  afterAuth(auth, req) {
    const { pathname } = req.nextUrl;
    const protectedPages = ['/settings', '/conversation', '/dashboard', '/integration', '/integration', '/appointment'];
  
    if (!auth.userId && protectedPages.includes(pathname)) {
      const signInUrl = new URL('/auth/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return Response.redirect(signInUrl);
    }
  }
  
});

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
