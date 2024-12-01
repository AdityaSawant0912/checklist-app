'use client';
import React from 'react';
import AppNavigation from '@/components/AppNavigation';
import { Separator } from '@/components/ui/separator';
function Layout(props) {
  const { children } = props;
  return (
    <main className="">
      <AppNavigation />
      <Separator />
      {children}
    </main>
  );
}

export default Layout;
