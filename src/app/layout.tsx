
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AuthProvider } from '@/context/auth-context';
import { MockUserProvider } from '@/context/mock-user-context';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'CollaboSave - Digital Adashe Savings',
  description: 'A modern, secure rotating savings platform for financial inclusion.',
};

import { LanguageProvider } from '@/context/language-context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background min-h-screen">
        <AuthProvider>
          <FirebaseClientProvider>
            <MockUserProvider>
              <LanguageProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="light"
                  enableSystem
                  disableTransitionOnChange
                >
                  {children}
                  <Toaster />
                </ThemeProvider>
              </LanguageProvider>
            </MockUserProvider>
          </FirebaseClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
