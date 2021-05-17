import * as yup from 'yup';

import { Button, FormControl, FormErrorMessage, FormLabel, Grid, Input } from '@chakra-ui/react';

import React from 'react';
import mapApiResponseErrors from '@/lib/mapApiResponseErrors';
import useAuthStore from '@/store/useAuthStore';
import { useForm } from 'react-hook-form';
import { usePasswordResetMutation } from '@/services/user.services';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  confirmPassword: yup
    .string()
    .required('Please confirm your password.')
    .oneOf([yup.ref('password'), null], 'Password must match.'),

  password: yup
    .string()
    .required('Password is required.')
    .min(6, 'Password must be at least 6 characters.')
});

export interface PasswordResetFormProps {
  token: string;
}

const PasswordResetForm = ({ token }: PasswordResetFormProps) => {
  const authSuccess = useAuthStore((state) => state.authSuccess);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const { mutate, isLoading } = usePasswordResetMutation(token);

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (res) => {
        authSuccess(res.data.data.user);
      },
      onError: (error) => {
        mapApiResponseErrors(error, setError);
      }
    });
  });
  return (
    <form onSubmit={onSubmit}>
      <Grid gap={2}>
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
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default PasswordResetForm;
