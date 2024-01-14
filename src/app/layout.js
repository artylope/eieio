import './globals.scss';
import '@radix-ui/themes/styles.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Theme } from '@radix-ui/themes';
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
          <Theme>
            <Header />
            {children}
            <Footer />
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
