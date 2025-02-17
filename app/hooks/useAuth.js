import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useAuth = () => {
   const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
   const [userInfo, setUserInfo] = useState(null);

   useEffect(() => {
      if (isAuthenticated && user) {
         setUserInfo(user);
      }
   }, [isAuthenticated, user]);

   return { isAuthenticated, getAccessTokenSilently, userInfo };
};

export default useAuth;
