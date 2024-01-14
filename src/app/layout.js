import './globals.scss';
import '@radix-ui/themes/styles.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Theme } from '@radix-ui/themes';
import { Providers } from './providers';

export const metadata = {
  title: 'Artylope | Exciting explorations of Intuitive UI',
  description: 'Exciting explorations of Intuitive UI',
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
