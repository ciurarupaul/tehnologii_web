import type { ReactNode } from 'react';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import Footer from '@/components/layout/Footer';

import '../scss/main.scss';
import Header from '@/components/layout/Headers';
import { fetchCurrentUser } from '@/features/login/user.service';
import { workSans } from '@/utils/fonts';

import Providers from './providers';

type Props = {
  children: ReactNode
};

export default async function RootLayout({ children }: Readonly<Props>) {
  // get user
  const user = await fetchCurrentUser({ headers: await headers() });

  if (!user) {
    redirect('/login');
  }

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
