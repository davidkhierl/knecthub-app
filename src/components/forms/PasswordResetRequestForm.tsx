import * as yup from 'yup';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  Input
} from '@chakra-ui/react';
import React, { useState } from 'react';

import Link from 'next/link';
import { postPasswordReset } from '@/services/user.services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  email: string;
};

const PasswordResetRequestFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.')
});

const PasswordResetRequestForm = () => {
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(PasswordResetRequestFormSchema)
  });

  const onSubmit = handleSubmit(async (data) => {
    setError(false);

    setSuccess(false);

    setMessage(undefined);

    setIsLoading(true);

    try {
      const res = await postPasswordReset(data);

      setMessage(res.data.message);

      setSuccess(true);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      setError(true);

      setMessage('Oops! Something went wrong.');
    }
  });

  if (success)
    return (
      <Grid gap={2}>
        <Alert status='success' mb={2} variant='subtle' rounded='md'>
          <AlertIcon />
          <Box flex='1'>
            <AlertTitle>Request sent!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Box>
        </Alert>
        <Link href='/signin' passHref>
          <Button as='a'>Done</Button>
        </Link>
      </Grid>
    );

  return (
    <>
      {error && (
        <Alert status='error' rounded='md'>
          <AlertIcon />
          {message}
        </Alert>
      )}
      <form onSubmit={onSubmit}>
        <Grid gap={2}>
          <FormControl id='email' isInvalid={errors.email?.message !== undefined}>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Email' type='email' {...register('email')} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            <FormHelperText>
              Enter the email address associated to your account and we will send you instructions
              to reset your password. For security reasons, we do NOT store your password. So rest
              assured that we will never send your password via email.
            </FormHelperText>
          </FormControl>
          <Button type='submit' mt={2} colorScheme='green' isLoading={isLoading}>
            Send Reset Instruction
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default PasswordResetRequestForm;
