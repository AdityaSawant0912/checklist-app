import React from 'react';
import { AppSidebar } from './AppSidebar';
import { AppLogo } from './logo/AppLogo';
function AppNavigation() {
  return (
    <nav className='flex h-18 m-4 mt-0 pt-4 items-center'>
      <AppSidebar className=''/>
      <AppLogo />
    </nav>
  );
}

export default AppNavigation;
