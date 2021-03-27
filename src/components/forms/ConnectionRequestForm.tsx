import * as yup from 'yup';

import { Box, BoxProps } from '@chakra-ui/layout';
import { Button, FormControl, FormErrorMessage, HStack, Input } from '@chakra-ui/react';

import React from 'react';
import { forwardRef } from '@chakra-ui/system';
import { mapServerErrors } from 'utils/reactHookFormUtils';
import { useConnectionRequestMutation } from 'services/connection.services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  email: string;
};

const ConnectionRequestFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.')
});

const ConnectionRequestForm = forwardRef<BoxProps, 'form'>((props, ref) => {
  const { mutate, isLoading } = useConnectionRequestMutation();

  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    resolver: yupResolver(ConnectionRequestFormSchema)
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {},
      onError: (error) => {
        mapServerErrors(error, setError);
      }
    });
  });

  return (
    <Box as='form' ref={ref} {...props} onSubmit={onSubmit}>
      <HStack spacing={2} alignItems='flex-start'>
        <FormControl id='email' isInvalid={errors.email?.message !== undefined}>
          <Input name='email' placeholder='Email' type='email' ref={register} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit' isLoading={isLoading}>
          Send
        </Button>
      </HStack>
    </Box>
  );
});

export default ConnectionRequestForm;
