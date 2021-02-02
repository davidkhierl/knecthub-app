import * as yup from 'yup';

import {
  Badge,
  Box,
  BoxProps,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  forwardRef,
  useToast
} from '@chakra-ui/react';
import { find, isMatch } from 'lodash';

import React from 'react';
import { mapServerErrors } from 'utils/reactHookFormUtils';
import { useForm } from 'react-hook-form';
import { usePatchPrimaryEmailMutation } from 'services/email.services';
import useUserStore from 'store/useUserStore';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  email: string;
};

const UpdatePrimaryEmailFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.')
});

const UpdatePrimaryEmailForm = forwardRef<BoxProps, 'form'>((props, ref) => {
  const setUser = useUserStore((state) => state.setUser);

  const user = useUserStore((state) => state.user);

  const { mutate, isLoading } = usePatchPrimaryEmailMutation();

  const toast = useToast();

  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    resolver: yupResolver(UpdatePrimaryEmailFormSchema),
    defaultValues: {
      email: find(user?.emails, (email) => isMatch(email, { type: 'primary' }))?.email
    }
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (res) => {
        setUser(res.data.data);

        toast({
          title: 'Update email pending.',
          description:
            'We have sent you an confirmation to your email, click the link provided inside the email to complete the changes.',
          status: 'info',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      },
      onError: (error) => mapServerErrors(error, setError)
    });
  });

  return (
    <Box as='form' ref={ref} onSubmit={onSubmit} {...props}>
      <VStack spacing={2}>
        <FormControl id='email' isInvalid={errors.email?.message !== undefined}>
          <Badge colorScheme='green' mb={2}>
            Primary
          </Badge>
          <Input name='email' placeholder='Email' type='email' ref={register} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit' mt={2} isLoading={isLoading} alignSelf='start' size='sm'>
          Update Email
        </Button>
      </VStack>
    </Box>
  );
});

export default UpdatePrimaryEmailForm;
