import React from 'react';
import { WorkflowItem } from './WorkflowItem';
export const WorkflowList = ({ workflows, spaceId }) => {
  return (
    <>
      {workflows.map((workflow) => {
        return <WorkflowItem spaceId={spaceId} workflow={workflow} key={workflow._id}/>;
      })}
    </>
  );
};
