'use client';

import React, { useContext } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { WorkflowOption } from './WorkflowOption';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { WorkflowsContext } from '@/context/WorkflowProvider';

import { Star } from 'lucide-react';

export const WorkflowItem = ({ workflow, spaceId }) => {
  const router = useRouter();
  // const { selectSpace } = useContext(WorkflowsContext);
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className='flex gap-1'>
          {workflow.name}
          {workflow.favorite ? <Star className='flex-shrink-0 w-4 h-4' color='#F7A31D' fill='#F6CF2B'/> : <>
           </>}
          </span>
          <div className="flex-shrink-0">
          <WorkflowOption workflow={workflow} spaceId={spaceId} />
          </div>
        </CardTitle>
        {workflow.description ? (
          <CardDescription>{workflow.description}</CardDescription>
        ) : (
          <></>
        )}
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => {
            // selectWorkflow(workflow._id);
            router.push(`app/s/${spaceId}/w/${workflow._id}`);
          }}
        >
          Start
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
};
