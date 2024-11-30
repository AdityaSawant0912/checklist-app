'use client'
import React from 'react';
import AppNavigation from '@/components/AppNavigation';
import { Separator } from '@/components/ui/separator';
import { SpaceProvider } from '@/context/SpaceProvider';
function Layout(props) {
  const { children } = props;
  return (
    <SpaceProvider>
      <main className="">
        <AppNavigation />
        <Separator />
        {children}
      </main>
    </SpaceProvider>
  );
}

export default Layout;
