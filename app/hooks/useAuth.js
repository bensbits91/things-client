// todo: I don't think we need this anymore
// verify we don't need it in useThings.js
import { useUser } from '@auth0/nextjs-auth0';

const useAuth = () => {
   const { user, error, isLoading } = useUser();

   return { user, error, isLoading };
};

export default useAuth;
