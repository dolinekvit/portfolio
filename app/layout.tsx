import type { Metadata } from 'next';
import { Provider } from '@/components/ui/provider';
import Menu from '@/components/menu';

export const metadata: Metadata = {
  title: 'Vít Dolínek',
  description: 'My portfolio page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Provider>
          <Menu />
          {children}
        </Provider>
      </body>
    </html>
  );
}
