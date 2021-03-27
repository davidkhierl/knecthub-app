import * as yup from 'yup';

import {
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  Input
} from '@chakra-ui/react';
import React, { useState } from 'react';

import ButtonLinkRouter from 'components/common/LinkRouter/ButtonLinkRouter';
import MotionAlert from 'components/motions/MotionAlert';
import { useForm } from 'react-hook-form';
import { useResetPasswordRequestMutation } from 'services/password.services';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  email: string;
};

const ResetPasswordRequestFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.')
});

const ResetPasswordRequestForm = () => {
  // This endpoint don't return form errors instead we
  // manually handle the success and cath 500 error.

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState(false);

  const [message, setMessage] = useState<string>();

  const { mutate, isLoading } = useResetPasswordRequestMutation();

  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(ResetPasswordRequestFormSchema)
  });

  const onSubmit = handleSubmit((data) => {
    setError(false);

    setSuccess(false);

    setMessage(undefined);

    mutate(data, {
      onSuccess: (res) => {
        setSuccess(true);

        setMessage(res.data.message);
      },
      onError: () => {
        setError(true);

        setMessage('Oops! Something went wrong.');
      }
    });
  });

  return (
    <>
      {error && (
        <MotionAlert
          status='error'
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          mb={2}>
          <AlertIcon />
          {message}
        </MotionAlert>
      )}
      {success && (
        <Grid gap={2}>
          <MotionAlert
            status='success'
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            mb={2}>
            <AlertIcon />
            <AlertTitle>Request sent!</AlertTitle>
            {message}
          </MotionAlert>
          <ButtonLinkRouter to='/login'>Done</ButtonLinkRouter>
        </Grid>
      )}
      {!success && (
        <form onSubmit={onSubmit}>
          <Grid gap={2}>
            <FormControl id='email' isInvalid={errors.email?.message !== undefined}>
              <FormLabel>Email</FormLabel>
              <Input name='email' placeholder='Email' type='email' ref={register} />
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
      )}
    </>
  );
};

export default ResetPasswordRequestForm;
