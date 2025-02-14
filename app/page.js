'use client';
import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
   const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

   return (
      <div className={styles.page}>
         <main className={styles.main}>
            {isAuthenticated ? (
               <div>
                  <p>Welcome, {user.username || user.nickname || user.name}</p>
                  <button
                     onClick={() =>
                        logout({ returnTo: window.location.origin })
                     }>
                     Log Out
                  </button>
               </div>
            ) : (
               <button onClick={() => loginWithRedirect()}>Log In</button>
            )}
         </main>
         <footer className={styles.footer}>
            <a
               href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
               target='_blank'
               rel='noopener noreferrer'>
               <Image
                  aria-hidden
                  src='/file.svg'
                  alt='File icon'
                  width={16}
                  height={16}
               />
               Learn
            </a>
            <a
               href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
               target='_blank'
               rel='noopener noreferrer'>
               <Image
                  aria-hidden
                  src='/window.svg'
                  alt='Window icon'
                  width={16}
                  height={16}
               />
               Examples
            </a>
            <a
               href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
               target='_blank'
               rel='noopener noreferrer'>
               <Image
                  aria-hidden
                  src='/globe.svg'
                  alt='Globe icon'
                  width={16}
                  height={16}
               />
               Go to nextjs.org →
            </a>
         </footer>
      </div>
   );
}
