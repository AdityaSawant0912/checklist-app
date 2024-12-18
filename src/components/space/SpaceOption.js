import React, { useState, useContext } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '../ui/button';
import { EllipsisVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SpacesContext } from '@/context/SpaceProvider';
import { SpaceEditDrawer } from './SpaceEditDrawer';
import { DeleteDialog } from '@/common/DeleteDialog';
export const SpaceOption = ({ space }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const { removeSpace } = useContext(SpacesContext);
  const { toast } = useToast();
  function handleDeletion() {
    fetch(`/api/s/${space._id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        setIsDeleteDialogOpen((prev) => !prev);
        if (data.success) {
          toast({
            title: 'Space: Deleted Sucessfully',
            description: `Space Name: ${data.space.name}`,
          });
          removeSpace(data.space);
        } else {
          toast({
            title: 'Failed to delete space',
            description: `Please try again later.`,
          });
        }
      })
      .catch((err) => {
        setIsDeleteDialogOpen((prev) => !prev);
        toast({
          title: 'Failed to delete space',
          description: `${err}`,
        });
      });
  }
  return (
    <>
      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        handleDeletion={handleDeletion}
      />
      <SpaceEditDrawer
        space={space}
        open={isEditDrawerOpen}
        onOpenChange={setIsEditDrawerOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-3">
          <DropdownMenuItem
            onClick={() => setIsEditDrawerOpen((prev) => !prev)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen((prev) => !prev)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
