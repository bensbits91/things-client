import { Auth0Client } from '@auth0/nextjs-auth0/server';

const options = {
   appBaseUrl: process.env.AUTH0_BASE_URL,
   clientId: process.env.AUTH0_CLIENT_ID,
   clientSecret: process.env.AUTH0_CLIENT_SECRET,
   domain: process.env.AUTH0_ISSUER_BASE_URL,

   session: {
      cookieSecret: process.env.AUTH0_SECRET
   },

   authorizationParameters: {
      scope: process.env.AUTH0_SCOPE,
      audience: process.env.AUTH0_AUDIENCE,
      redirect_uri: 'http://localhost:3000/api/auth/callback'
   }
};

export const auth0 = new Auth0Client(options);
