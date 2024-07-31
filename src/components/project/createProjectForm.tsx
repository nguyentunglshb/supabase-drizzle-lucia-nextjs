'use client'

import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateProjectFormSchema } from '@/lib/validations/project'
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { createProject } from '@/actions/project'



const CreateProjectForm: FC = () => {

    const form = useForm<z.infer<typeof CreateProjectFormSchema>>({
        resolver: zodResolver(CreateProjectFormSchema),
        defaultValues: {
            data: '',
            name: '',
            description: ''
        }
    })

    const onSubmit = async (formValue: z.infer<typeof CreateProjectFormSchema>) => {

        const formData= new FormData();
        Object.keys(formValue).forEach(key => formData.append(key, formValue[key as keyof z.infer<typeof CreateProjectFormSchema>]));
        
        await createProject(formData)
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
                control={form.control}
                name="name"
                render={({field}) => <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormDescription>
                        Enter name of project
                    </FormDescription>
                </FormItem>}
            />
            <FormField 
                control={form.control}
                name="data"
                render={({field}) => <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                        <Input placeholder="Data" {...field} />
                    </FormControl>
                    <FormDescription>
                        Enter data of project
                    </FormDescription>
                </FormItem>}
            />
            <FormField 
                control={form.control}
                name="description"
                render={({field}) => <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormDescription>
                        Enter description of project
                    </FormDescription>
                </FormItem>}
            />
            <Button type='submit'>Create project</Button>
        </form>
    </Form>
  )
}

export default CreateProjectForm;