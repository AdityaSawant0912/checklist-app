'use client';
import React, { useContext, useEffect, use } from 'react';
import AppNavigation from '@/components/AppNavigation';
import { Separator } from '@/components/ui/separator';
import { SpacesContext } from '@/context/SpaceProvider';

function Layout(props) {
  const { children, params } = props;
  const { selectedSpace, selectSpace } = useContext(SpacesContext);

  const { spaceId } = use(params);
  console.log(selectedSpace);
  useEffect(() => {
    async function fetchSpace() {
      const space = await fetch(`/api/s/${spaceId}`)
        .then((res) => res.json())
        .then((data) => data.space);
      console.log(space);
      selectSpace(space);
    }
    if (!selectedSpace) {
      fetchSpace();
    }
  }, []);
  return <>{children}</>;
}

export default Layout;
