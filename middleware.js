import { NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';
import { jwtDecode } from 'jwt-decode';

export async function middleware(request) {
   const authRes = await auth0.middleware(request);

   // authentication routes are handled by auth0
   if (request.nextUrl.pathname.startsWith('/auth')) {
      return authRes;
   }

   const { origin } = new URL(request.url);
   const session = await auth0.getSession();

   // no user session — redirect to login
   if (!session) {
      return NextResponse.redirect(`${origin}/auth/login`);
   }

   // add userUuid to session so it can be accessed by the client
   // note: userUuid is added to accessToken in an auth0 action
   const { accessToken } = session.tokenSet;
   const decodedAccessToken = jwtDecode(accessToken);
   const userUuid = decodedAccessToken['urn:bbThingsApp/userUuid'];
   await auth0.updateSession(request, authRes, {
      ...session,
      user: {
         ...session.user,
         userUuid
      }
   });

   return authRes;
}

export const config = {
   matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
};
