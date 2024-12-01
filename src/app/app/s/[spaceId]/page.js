'use client';
import React, { useContext, useEffect, use } from 'react';
import { WorkflowsContext } from '@/context/WorkflowProvider';
import { WorkflowList } from '@/components/workflow/WorkflowList';
import { WorkflowCreateDrawer } from '@/components/workflow/WorkflowCreateDrawer';
function Workflow({ params }) {
  const { workflows, addWorkflows } = useContext(WorkflowsContext);
  const { spaceId } = use(params);
  useEffect(() => {
    async function fetchWorkflows() {
      const { workflowTemplates } = await fetch(`/api/s/${spaceId}/w`).then(
        (res) => res.json()
      );

      if (JSON.stringify(workflowTemplates) !== JSON.stringify(workflows)) {
        console.log(workflows);
        console.log('Replaced WF with fetched');
        addWorkflows(workflowTemplates, true);
      }
    }
    fetchWorkflows();
  }, []);
  return (
    <section className="m-2">
      <WorkflowList spaceId={spaceId} workflows={workflows} />
      <WorkflowCreateDrawer spaceId={spaceId} />
    </section>
  );
}

export default Workflow;
