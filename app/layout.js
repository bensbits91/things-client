import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import styles from './page.module.css'; // todo: some of these styles should be in layout.module.css
import { NavBar } from './components/nav';
import { Footer } from './components/footer';
import { Auth0Provider } from '@auth0/nextjs-auth0';
import QueryProvider from './components/QueryProvider';
import Head from 'next/head';

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin']
});

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin']
});

export const metadata = {
   title: 'Things',
   description: 'Track all things'
};

export default async function RootLayout({ children }) {
   return (
      <html lang='en'>
         <Head>
            <link rel='icon' type='image/svg+xml' href='/icon.svg' sizes='any' />
         </Head>
         <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <Auth0Provider>
               <QueryProvider>
                  <NavBar />
                  <main className={styles.main}>{children}</main>
                  <Footer />
               </QueryProvider>
            </Auth0Provider>
         </body>
      </html>
   );
}
