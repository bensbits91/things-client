import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import styles from './page.module.css'; // todo: some of these styles should be in layout.module.css
import Auth0ProviderWithHistory from './lib/auth0-provider';
import { NavBar } from './components/nav';
import Image from 'next/image';

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin']
});

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin']
});

export const metadata = {
   title: 'Create Next App',
   description: 'Generated by create next app'
};

export default function RootLayout({ children }) {
   return (
      <html lang='en'>
         <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <Auth0ProviderWithHistory>
               <NavBar />
               <main className={styles.main}>{children}</main>
               <footer className={styles.footer}>
                  footer
                  {/* <a
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
                  </a> */}
               </footer>
            </Auth0ProviderWithHistory>
         </body>
      </html>
   );
}
