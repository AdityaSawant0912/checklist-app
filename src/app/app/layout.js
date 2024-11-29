import React from 'react';
import { AppNavigation } from '@/components/navigation/AppNavigation';
function Layout(props) {
  const { children } = props;
  return <main>{children}</main>;
}

export default Layout;
