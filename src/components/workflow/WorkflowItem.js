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

import { Star } from 'lucide-react';

export const WorkflowItem = ({ workflow, spaceId }) => {
  const router = useRouter();
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className=''>
          {workflow.name}
          {workflow.favorite ? <Star className='w-4 h-4 inline-block ml-1 mb-3' color='#F7A31D' fill='#F6CF2B'/> : <>
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
      <CardContent className={'flex justify-between'}>
        <Button
          onClick={() => {
            // selectWorkflow(workflow._id);
            router.push(`app/s/${spaceId}/w/${workflow._id}/modify`);
          }}
        >
          Modify Steps
          <ArrowRight />
        </Button>
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
