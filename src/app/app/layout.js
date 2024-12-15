'use client';
import React, { useContext, useEffect, use, memo } from 'react';
import AppNavigation from '@/components/AppNavigation';
import { Separator } from '@/components/ui/separator';
import { WorkflowsContext } from '@/context/WorkflowProvider';
import { SpacesContext } from '@/context/SpaceProvider';

function Layout(props) {
  const { children, params } = props;
  const { spaces, addSpaces } = useContext(SpacesContext);
  const { workflows, addWorkflows } = useContext(WorkflowsContext);
  const { spaceId, workflowId } = use(params);

  return (
    <main>
      <AppNavigation />
      <Separator />
      {children}
    </main>
  );
}

export default Layout;
