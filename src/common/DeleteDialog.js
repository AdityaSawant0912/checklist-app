import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
export const DeleteDialog = ({open, onOpenChange, handleDeletion}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDeletion}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
