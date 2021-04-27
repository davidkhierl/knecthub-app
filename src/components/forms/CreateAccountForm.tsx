import * as yup from 'yup';

import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input
} from '@chakra-ui/react';

import React from 'react';
import mapApiResponseErrors from '@/lib/mapApiResponseErrors';
import useAuthStore from '@/store/useAuthStore';
import { useForm } from 'react-hook-form';
import { useUserRegisterMutation } from '@/services/user.services';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  confirmPassword: yup
    .string()
    .required('Please confirm your password.')
    .oneOf([yup.ref('password'), null], 'Password must match.'),
  email: yup.string().email('Invalid email.').required('Email is required.'),
  firstName: yup.string().required('First name is required.'),
  lastName: yup.string().required('Last name is required.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(6, 'Password must be at least 6 characters.')
});

const CreateAccountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const authSuccess = useAuthStore((state) => state.authSuccess);

  const authFailed = useAuthStore((state) => state.authFailed);

  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  const { mutate, isLoading } = useUserRegisterMutation();

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);

    mutate(data, {
      onSuccess: (res) => {
        authSuccess(res.data.data.user);
      },
      onError: (res) => {
        mapApiResponseErrors(res, setError);
        authFailed();
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Grid gap={2}>
        <FormControl id='firstName' isInvalid={errors.firstName?.message !== undefined}>
          <FormLabel>First Name</FormLabel>
          <Input placeholder='First Name' {...register('firstName')} />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='lastName' isInvalid={errors.lastName?.message !== undefined}>
          <FormLabel>Last Name</FormLabel>
          <Input placeholder='Last Name' {...register('lastName')} />
          <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='email' isInvalid={errors.email?.message !== undefined}>
          <FormLabel>Email</FormLabel>
          <Input placeholder='Email' type='email' {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='password' isInvalid={errors.password?.message !== undefined}>
          <FormLabel>Password</FormLabel>
          <Input placeholder='Password' type='password' {...register('password')} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='confirmPassword' isInvalid={errors.confirmPassword?.message !== undefined}>
          <FormLabel>Confirm Password</FormLabel>
          <Input placeholder='Confirm Password' type='password' {...register('confirmPassword')} />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit' mt={2} colorScheme='blue' isLoading={isLoading}>
          Register
        </Button>
      </Grid>
    </form>
  );
};

export default CreateAccountForm;
