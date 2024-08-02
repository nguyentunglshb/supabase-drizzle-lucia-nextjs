'use client';

import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import Select from 'react-select';

const AddMembersForm = () => {
  const form = useForm({});

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="members"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Members</FormLabel>
              <FormControl>
                <Select options={options} {...field} />
              </FormControl>

              <FormDescription>Select members</FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AddMembersForm;
