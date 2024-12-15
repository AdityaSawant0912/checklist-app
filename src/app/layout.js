'use client';
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SpaceProvider } from '@/context/SpaceProvider';
import { WorkflowProvider } from '@/context/WorkflowProvider';
import { memo } from 'react';

const RootLayout = memo(function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SpaceProvider>
            <WorkflowProvider>{children}</WorkflowProvider>
          </SpaceProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
});

export default RootLayout;
