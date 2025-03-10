import { auth0 } from '@/lib/auth0';
import styles from './page.module.css';
import { Text } from '@/app/components/typography';

export default async function Home() {
   const session = await auth0.getSession(); // todo: should this be moved up to layout.js?
   if (!session) {
      return (
         <div className={styles.page}>
            <a href='/auth/login'>Log in</a>
         </div>
      );
   }

   const {
      user: { email, nickname, username, picture } // todo: add username to app_metadata
   } = session;

   return (
      <div className={styles.page}>
         <div>
            <Text>
               Hey
               {picture && (
                  <img
                     src={picture}
                     alt={nickname}
                     width={25}
                     height={25}
                     style={{ marginLeft: 4, marginRight: 4 }}
                  />
               )}
               {nickname || email}
            </Text>
            <a href='/auth/logout'>Log out</a>
         </div>
      </div>
   );
}
