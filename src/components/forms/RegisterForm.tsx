import * as yup from 'yup';

import { Button, FormControl, FormErrorMessage, FormLabel, Grid, Input } from '@chakra-ui/react';
import { authFailed, authSuccess, startAuth } from 'redux/authSlice';

import React from 'react';
import { mapServerErrors } from 'utils/reactHookFormUtils';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { usePostUserMutation } from 'services/user.services';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  company?: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const RegisterFormSchema = yup.object().shape({
  company: yup.string(),
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
    .min(6, 'Password must be minimum of 6 characters.')
});

/**
 * User Registration Form.
 */
const RegisterForm = () => {
  const dispatch = useDispatch();

  const { mutate, isLoading } = usePostUserMutation();

  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    resolver: yupResolver(RegisterFormSchema)
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(startAuth());
    mutate(data, {
      onSuccess: (res) => {
        dispatch(authSuccess(res.data.data));
      },
      onError: (error) => {
        mapServerErrors(error, setError);
        dispatch(authFailed());
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Grid gap={2}>
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
        {/* NOTE: TEMPORARILY DISABLE COMPANY FIELD
        <FormControl id='company' isInvalid={errors.company?.message !== undefined}>
          <FormLabel>Company</FormLabel>
          <Input name='company' placeholder='Company' ref={register} />
          <FormErrorMessage>{errors.company?.message}</FormErrorMessage>
        </FormControl> */}
        <FormControl id='email' isInvalid={errors.email?.message !== undefined}>
          <FormLabel>Email</FormLabel>
          <Input name='email' placeholder='Email' type='email' ref={register} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='password' isInvalid={errors.password?.message !== undefined}>
          <FormLabel>Password</FormLabel>
          <Input name='password' placeholder='Password' type='password' ref={register} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='confirmPassword' isInvalid={errors.confirmPassword?.message !== undefined}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name='confirmPassword'
            placeholder='Confirm Password'
            type='password'
            ref={register}
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit' mt={2} colorScheme='blue' isLoading={isLoading}>
          Register
        </Button>
      </Grid>
    </form>
  );
};

export default RegisterForm;
