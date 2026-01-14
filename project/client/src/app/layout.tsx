import type { ReactNode } from 'react';

import { headers } from 'next/headers';

import '../scss/main.scss';
import Header from '@/components/layout/Header';
import { fetchCurrentUser } from '@/features/login/user.service';
import { workSans } from '@/utils/fonts';

import Providers from './providers';

type Props = {
  children: ReactNode
};

export default async function RootLayout({ children }: Readonly<Props>) {
  // get user
  const user = await fetchCurrentUser({ headers: await headers() });

  return (
    <html lang='en'>
      <body className={`${workSans.className}`}>
        <Providers user={user}>
          <Header />
          <main className='container'>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
