'use client';

import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProjectFormSchema } from '@/lib/validations/project';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { createProject } from '@/actions/project';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

const CreateProjectForm: FC = () => {
  const { executeAsync, isExecuting } = useAction(createProject, {
    onSuccess: ({ data }) => {
      if (data?.length) {
        toast({
          title: 'Success',
          description: 'Project created successfully',
        });
      }
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
    },
    onSettled: () => {
      router.refresh();
      form.reset(form.getValues());
    },
  });
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof CreateProjectFormSchema>>({
    resolver: zodResolver(CreateProjectFormSchema),
    defaultValues: {
      data: '',
      name: '',
      description: '',
    },
  });

  const onSubmit = async (formValue: z.infer<typeof CreateProjectFormSchema>) => {
    await executeAsync(formValue);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>Enter name of project</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl>
                <Input placeholder="Data" {...field} />
              </FormControl>
              <FormDescription>Enter data of project</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>Enter description of project</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isExecuting}>
          Create project
        </Button>
      </form>
    </Form>
  );
};

export default CreateProjectForm;
