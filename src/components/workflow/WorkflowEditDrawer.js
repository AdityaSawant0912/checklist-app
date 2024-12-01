'use client';
import React, { useState, useContext } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { WorkflowsContext } from '@/context/WorkflowProvider';
const formSchema = z.object({
  _id: z.string(),
  spaceId: z.string(),
  name: z.string().min(1).max(100),
  description: z.optional(z.string().max(100)),
  favorite: z.boolean(),
});

export const WorkflowEditDrawer = ({
  spaceId,
  workflow,
  open,
  onOpenChange,
}) => {
  const { updateWorkflow } = useContext(WorkflowsContext);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: workflow._id,
      spaceId: workflow.spaceId,
      name: workflow.name,
      description: workflow.description,
      favorite: workflow.favorite,
    },
  });
  function onSubmit(values) {
    console.log(values);
    fetch(`/api/s/${spaceId}/w/${workflow._id}`, {
      method: 'POST',
      body: JSON.stringify({
        ...values,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          form.reset();
          onOpenChange((prev) => !prev);
          toast({
            title: 'Workflow: Updated Sucessfully',
            description: `Workflow Name: ${data.workflowTemplate.name}`,
          });
          updateWorkflow(data.workflowTemplate);
        } else {
          toast({
            variant: 'destructive',
            title: 'Failed to update workflow',
            description: `Please try again later`,
          });
        }
      })
      .catch((error) => {
        form.reset();
        toast({
          variant: 'destructive',
          title: 'Failed to update workflow',
          description: `${error}`,
        });
      });
  }
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="" open={open}>
        <DrawerHeader>
          <DrawerTitle>Edit Workflow</DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mx-4">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Home" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mx-4">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="favorite"
              render={({ field }) => (
                <FormItem className="mx-4 workflow-y-1 space-x-4 items-center">
                  <FormLabel>Favorite</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DrawerFooter className="mb-2">
              <Button type="submit">Submit</Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
