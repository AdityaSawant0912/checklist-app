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
import { WorkflowsContext } from '@/context/WorkflowProvider';
import { DeleteDialog } from '@/common/DeleteDialog';
import { WorkflowEditDrawer } from './WorkflowEditDrawer';
import { space } from 'postcss/lib/list';
export const WorkflowOption = ({ spaceId, workflow }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const { removeWorkflow } = useContext(WorkflowsContext);
  const { toast } = useToast();
  function handleDeletion() {
    fetch(`/api/s/${spaceId}/w/${workflow._id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        setIsDeleteDialogOpen((prev) => !prev);
        if (data.success) {
          toast({
            title: 'Workflow: Deleted Sucessfully',
            description: `Workflow Name: ${data.workflowTemplate.name}`,
          });
          removeWorkflow(data.workflowTemplate);
        } else {
          toast({
            title: 'Failed to delete workflow',
            description: `Please try again later.`,
          });
        }
      })
      .catch((err) => {
        setIsDeleteDialogOpen((prev) => !prev);
        toast({
          title: 'Failed to delete workflow',
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
      <WorkflowEditDrawer
        spaceId={spaceId}
        workflow={workflow}
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
