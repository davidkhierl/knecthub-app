import * as yup from 'yup';

import {
  Box,
  BoxProps,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  forwardRef,
  useToast
} from '@chakra-ui/react';

import React from 'react';
import { mapServerErrors } from 'utils/reactHookFormUtils';
import { useForm } from 'react-hook-form';
import { usePatchUserMutation } from 'services/user.services';
import useUserStore from 'store/useUserStore';
import { yupResolver } from '@hookform/resolvers/yup';

const UpdateUserFormSchema = yup.object().shape({
  firstName: yup.string().required('First name is required.'),
  lastName: yup.string().required('Last name is required.')
});

export interface UpdateUserFormInputs {
  firstName: string;
  lastName: string;
}

const UpdateUserForm = forwardRef<BoxProps, 'form'>((props, ref) => {
  const user = useUserStore((state) => state.user);

  const setUser = useUserStore((state) => state.setUser);

  const toast = useToast();

  const { register, handleSubmit, errors, setError } = useForm<UpdateUserFormInputs>({
    resolver: yupResolver(UpdateUserFormSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName
    }
  });

  const { mutate, isLoading } = usePatchUserMutation();

  const onSubmit = (data: UpdateUserFormInputs) => {
    mutate(data, {
      onSuccess: (res) => {
        setUser(res.data.data);

        toast({
          title: 'Update success.',
          description: 'Account details updated.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      },
      onError: (error) => {
        mapServerErrors(error, setError);
      }
    });
  };

  return (
    <Box as='form' ref={ref} onSubmit={handleSubmit(onSubmit)} {...props}>
      <VStack spacing={2}>
        <FormControl id='firstName' isInvalid={errors.firstName?.message !== undefined}>
          <FormLabel>First Name</FormLabel>
          <Input name='firstName' placeholder='First Name' ref={register} />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='lastName' isInvalid={errors.lastName?.message !== undefined}>
          <FormLabel>Last Name</FormLabel>
          <Input name='lastName' placeholder='Last Name' ref={register} />
          <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit' mt={2} isLoading={isLoading} alignSelf='start'>
          Update
        </Button>
      </VStack>
    </Box>
  );
});

export default UpdateUserForm;
