import type { ReactNode } from 'react';

import { headers } from 'next/headers';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Headers';

import '../scss/main.scss';
import { fetchCurrentUser } from '@/features/login/user.service';
import { workSans } from '@/utils/fonts';

import Providers from './providers';

type Props = {
  children: ReactNode
};

export default async function RootLayout({ children }: Readonly<Props>) {
  // get user
  console.log('user fetched in root layout');
  const user = await fetchCurrentUser({ headers: await headers() });

  return (
    <html lang='en'>
      <body className={`${workSans.className}`}>
        <Providers user={user}>
          <Header />
          <main className='container'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
