import * as yup from 'yup';

import {
  Box,
  BoxProps,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  forwardRef,
  useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { mapServerErrors } from 'utils/reactHookFormUtils';
import { useChangePasswordMutation } from 'services/password.services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  confirmNewPassword: string;
  currentPassword: string;
  newPassword: string;
};

const ChangePasswordFormSchema = yup.object().shape({
  confirmNewPassword: yup
    .string()
    .required('Please confirm your password.')
    .oneOf([yup.ref('newPassword'), null], 'New password must match.'),
  currentPassword: yup.string().required('Current password is required.'),
  newPassword: yup
    .string()
    .required('New password is required.')
    .min(6, 'Password must be minimum of 6 characters.')
});

const ChangePasswordForm = forwardRef<BoxProps, 'form'>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isLoading } = useChangePasswordMutation();

  const toast = useToast();

  const { register, handleSubmit, errors, setError, reset } = useForm<FormData>({
    resolver: yupResolver(ChangePasswordFormSchema)
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        reset();

        toast({
          title: 'Password updated.',
          description: 'Successfully changed password',
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
  });

  return (
    <Box as='form' ref={ref} onSubmit={onSubmit} {...props}>
      <VStack spacing={2}>
        <FormControl id='currentPassword' isInvalid={errors.currentPassword?.message !== undefined}>
          <FormLabel>Current Password</FormLabel>
          <Input
            name='currentPassword'
            placeholder='Current Password'
            type='password'
            ref={register}
          />
          <FormErrorMessage>{errors.currentPassword?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='newPassword' isInvalid={errors.newPassword?.message !== undefined}>
          <FormLabel>New Password</FormLabel>
          <InputGroup>
            <Input
              name='newPassword'
              placeholder='New Password'
              type={showPassword ? 'text' : 'password'}
              ref={register}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          id='confirmNewPassword'
          isInvalid={errors.confirmNewPassword?.message !== undefined}>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            name='confirmNewPassword'
            placeholder='Confirm New Password'
            type='password'
            ref={register}
          />
          <FormErrorMessage>{errors.confirmNewPassword?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit' mt={2} isLoading={isLoading} alignSelf='start' size='sm'>
          Update password
        </Button>
      </VStack>
    </Box>
  );
});

export default ChangePasswordForm;
