'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cybersecurity Awareness Game',
  description: 'Learn cybersecurity through interactive challenges',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen bg-white dark:bg-gray-900`}>
        <ThemeProvider>
          <UserProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
