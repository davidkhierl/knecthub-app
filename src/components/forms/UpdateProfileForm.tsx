import * as yup from 'yup';

import {
  Box,
  BoxProps,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
  forwardRef,
  useToast
} from '@chakra-ui/react';
import { ProfilePatchRequest, useProfileMutation } from 'services/profile.services';

import React from 'react';
import { mapServerErrors } from 'utils/reactHookFormUtils';
import { useForm } from 'react-hook-form';
import useUserStore from 'store/useUserStore';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = ProfilePatchRequest;

const UpdateProfileFormSchema = yup.object().shape({
  bio: yup.string().optional(),
  company: yup.string().optional(),
  contactNumber: yup.string().optional(),
  jobTitle: yup.string().optional(),
  location: yup.string().optional()
});

const UpdateProfileForm = forwardRef<BoxProps, 'form'>((props, ref) => {
  const setUser = useUserStore((state) => state.setUser);

  const user = useUserStore((state) => state.user);

  const toast = useToast();

  const { mutate, isLoading } = useProfileMutation();

  const { register, handleSubmit, errors, setError } = useForm<FormData>({
    resolver: yupResolver(UpdateProfileFormSchema),
    defaultValues: {
      bio: user?.profile.bio,
      company: user?.profile.company,
      contactNumber: user?.profile.contactNumber,
      jobTitle: user?.profile.jobTitle,
      location: user?.profile.location
    }
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (res) => {
        setUser(res.data.data);

        toast({
          title: 'Update success.',
          description: 'Profile successfully updated.',
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
        <FormControl id='bio' isInvalid={errors.bio?.message !== undefined}>
          <FormLabel>Bio</FormLabel>
          <Textarea name='bio' placeholder='Tell something about yourself' ref={register} />
          <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='company' isInvalid={errors.company?.message !== undefined}>
          <FormLabel>Company</FormLabel>
          <Input name='company' placeholder='Company' ref={register} />
          <FormErrorMessage>{errors.company?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='contactNumber' isInvalid={errors.contactNumber?.message !== undefined}>
          <FormLabel>Contact Number</FormLabel>
          <Input name='contactNumber' placeholder='Contact Number' ref={register} />
          <FormErrorMessage>{errors.contactNumber?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='jobTitle' isInvalid={errors.jobTitle?.message !== undefined}>
          <FormLabel>Job Title</FormLabel>
          <Input name='jobTitle' placeholder='Job Title' ref={register} />
          <FormErrorMessage>{errors.jobTitle?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id='location' isInvalid={errors.location?.message !== undefined}>
          <FormLabel>Location</FormLabel>
          <Input name='location' placeholder='Location' ref={register} />
          <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
        </FormControl>
        <Button type='submit' mt={2} isLoading={isLoading} alignSelf='start' size='sm'>
          Update Profile
        </Button>
      </VStack>
    </Box>
  );
});

export default UpdateProfileForm;
