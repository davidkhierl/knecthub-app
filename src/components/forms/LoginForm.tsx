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

import MotionAlert from 'components/common/Motions/MotionAlert';
import { useAuthMutation } from 'services/auth.services';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.'),
  password: yup.string().required('Password is required.')
});

export type LoginFormInputs = yup.InferType<typeof LoginFormSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, errors } = useForm<LoginFormInputs>({
    resolver: yupResolver(LoginFormSchema)
  });

  const { mutate, isLoading } = useAuthMutation();

  const dispatch = useDispatch();

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(startAuth());

    mutate(data, {
      onSuccess: (res) => {
        dispatch(authSuccess(res.data));
      },
      onError: (error) => {
        setError(true);

        setErrorMessage(error.response ? error.response.data[0].message : error.message);

        dispatch(authFailed());
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
