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
import { useAuthSignInMutation } from '@/services/auth.services';
import useAuthStore from '@/store/useAuthStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.'),
  password: yup.string().required('Password is required.')
});

const SignInWithCredentialsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const authSuccess = useAuthStore((state) => state.authSuccess);

  const authFailed = useAuthStore((state) => state.authFailed);

  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  const error = useAuthStore((state) => state.error);

  const { mutate, isLoading } = useAuthSignInMutation();

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);

    mutate(data, {
      onSuccess: (res) => {
        authSuccess(res.data.data.user);
      },
      onError: (res) => {
        authFailed(res.response?.data);
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Grid gap={2}>
        {error && (
          <Alert status='error' rounded='md'>
            <AlertIcon />
            {error.message}
          </Alert>
        )}
        <FormControl
          id='email'
          isInvalid={errors.email?.message !== undefined || error !== undefined}>
          <FormLabel>Email</FormLabel>
          <Input {...register('email')} placeholder='Email' type='email' />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          id='password'
          isInvalid={errors.password?.message !== undefined || error !== undefined}>
          <FormLabel>Password</FormLabel>
          <Input {...register('password')} placeholder='Password' type='password' />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit' mt={2} isLoading={isLoading} colorScheme='blue'>
          Sign In with Credentials
        </Button>
      </Grid>
    </form>
  );
};

export default SignInWithCredentialsForm;
