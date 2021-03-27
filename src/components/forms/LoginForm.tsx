import * as yup from 'yup';

import {
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { authFailed, authSuccess, startAuth } from 'redux/authSlice';

import MotionAlert from 'components/motions/MotionAlert';
import { useAuthMutation } from 'services/auth.services';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  email: string;
  password: string;
};

const LoginFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.'),
  password: yup.string().required('Password is required.')
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, isLoading } = useAuthMutation();

  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(LoginFormSchema)
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(startAuth());

    mutate(data, {
      onSuccess: (res) => {
        dispatch(authSuccess(res.data.data));
      },
      onError: (error) => {
        setError(true);

        setErrorMessage(error.response ? error.response.data.message : error.message);

        dispatch(authFailed());
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Grid gap={2}>
        {error && (
          <MotionAlert
            status='error'
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
            <AlertIcon />
            {errorMessage}
          </MotionAlert>
        )}
        <FormControl id='email' isInvalid={errors.email?.message !== undefined || error}>
          <FormLabel>Email</FormLabel>
          <Input name='email' placeholder='Email' type='email' ref={register} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='password' isInvalid={errors.password?.message !== undefined || error}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              name='password'
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              ref={register}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit' mt={2} colorScheme='blue' isLoading={isLoading}>
          Login
        </Button>
      </Grid>
    </form>
  );
};

export default LoginForm;
