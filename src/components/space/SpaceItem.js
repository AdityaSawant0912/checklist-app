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
import { SpaceOption } from './SpaceOption';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { SpacesContext } from '@/context/SpaceProvider';
import { Badge } from '../ui/badge';

export const SpaceItem = ({ space }) => {
  const router = useRouter();
  const { selectSpace } = useContext(SpacesContext);
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-start justify-between  ">
          <p className="text-2xl break-words">{space.name}</p>
          <div className="flex-shrink-0">
          <SpaceOption space={space} />
          </div>
        </CardTitle>
        <CardDescription>
          <Badge className="px-1 py-[0.15rem]">{`${space.visibility
            .charAt(0)
            .toUpperCase()}${space.visibility.slice(1)}`}</Badge>
        </CardDescription>
        {space.description ? (
          <CardDescription>{space.description}</CardDescription>
        ) : (
          <></>
        )}
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => {
            selectSpace(space._id);
            router.push(`app/s/${space._id}`);
          }}
        >
          Workflows
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
};
