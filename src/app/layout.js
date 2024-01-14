import './globals.scss';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from './providers';

export const metadata = {
  title:
    'Artylope | EIEIO Engaging and Intuitive Encyclopedia of Interfaces Online',
  description: 'Engaging and Intuitive Encyclopedia of Interfaces Online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {' '}
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
