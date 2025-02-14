'use client';
import { Auth0Provider } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';

// todo: vulnerability: client-side-unvalidated-url-redirection Allowing unvalidated redirection based on user-specified URLs

const Auth0ProviderWithHistory = ({ children }) => {
   const router = useRouter();

   const onRedirectCallback = appState => {
      router.push(appState?.returnTo || '/');
   };

   return (
      <Auth0Provider
         domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
         clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
         authorizationParams={{
            redirect_uri:
               typeof window !== 'undefined' && window.location.origin,
            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
            scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE
         }}
         onRedirectCallback={onRedirectCallback}>
         {children}
      </Auth0Provider>
   );
};

export default Auth0ProviderWithHistory;
