import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axiosInstance from '../utils/axiosInstance';

const useAuth = () => {
   const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
   const [userInfo, setUserInfo] = useState(null);
   // const [userMetadata, setUserMetadata] = useState(null);

   useEffect(() => {
      const fetchUserMetadata = async () => {
         if (isAuthenticated && user) {
            setUserInfo(user);
            // try {
            //    const token = await getAccessTokenSilently();
            //    const response = await axiosInstance.get(
            //       `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${user.sub}`,
            //       {
            //          headers: {
            //             Authorization: `Bearer ${token}`
            //          }
            //       }
            //    );
            //    setUserMetadata(response.data.user_metadata);
            // } catch (error) {
            //    console.error('Error fetching user metadata:', error);
            // }
         }
      };

      fetchUserMetadata();
   }, [isAuthenticated, user, getAccessTokenSilently]);

   return { isAuthenticated, getAccessTokenSilently, userInfo/* , userMetadata */ };
};

export default useAuth;
