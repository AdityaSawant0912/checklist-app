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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { SpacesContext } from '@/context/SpaceProvider';

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.optional(z.string().max(100)),
  visibilty: z.optional(z.string()),
});

export const SpaceDrawer = () => {
  const [open, setOpen] = useState(false);
  const { addSpaces } = useContext(SpacesContext);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      visibilty: 'Private',
    },
  });
  function onSubmit(values) {
    console.log(values);
    fetch('/api/s', {
      method: 'POST',
      body: JSON.stringify({
        ...values,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOpen((prev) => !prev);
          toast({
            title: 'Space: Created Sucessfully',
            description: `Space Name: ${data.space.name}`,
          });
          addSpaces([data.space]);
        } else {
          toast({
            variant: 'destructive',
            title: 'Failed to create space',
            description: `Please try again later`,
          });
        }
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Failed to create space',
          description: `${error}`,
        });
      });
  }
  return (
    <Drawer open={open} setOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className="w-16 h-16 rounded-2xl fixed bottom-8 right-8 p-2"
          size="icon"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <Plus className="w-15 h-15" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader>
          <DrawerTitle>Create New Space</DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="visibilty"
              render={({ field }) => (
                <FormItem className="mx-4 space-y-1">
                  <FormLabel>Visibility</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Private" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Private" selected>
                          Private
                        </SelectItem>
                        <SelectItem value="Public">Public</SelectItem>
                      </SelectContent>
                    </Select>
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
                    setOpen((prev) => !prev);
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