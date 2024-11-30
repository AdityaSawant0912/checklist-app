'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SpaceOption } from './SpaceOption';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export const SpaceItem = ({ space }) => {
  const router = useRouter();
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {space.name} <SpaceOption space={space}/>
        </CardTitle>
        {space.description ? (
          <CardDescription>{space.description}</CardDescription>
        ) : (
          <></>
        )}
      </CardHeader>
      <CardContent>
        <Button onClick={() => router.push(`app/s/${space._id}`)}>
          Workflows
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
};
