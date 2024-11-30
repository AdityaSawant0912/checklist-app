import React, { useState, useContext } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { EllipsisVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SpacesContext } from '@/context/SpaceProvider';
export const SpaceOption = ({ space }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-3">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            space and workflows linked to it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDeletion}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
