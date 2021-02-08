import * as yup from 'yup';

import {
  Box,
  BoxProps,
  Button,
  Collapse,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  forwardRef,
  useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileCard from 'components/common/ProfileCard';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { mapServerErrors } from 'utils/reactHookFormUtils';
import { useForm } from 'react-hook-form';
import useUsers from 'queries/useUsers';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  email: string;
};

const SearchUserFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.')
});

const AddConnection = forwardRef<BoxProps, 'div'>((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState<string | null>(null);

  const { register, reset, errors, handleSubmit, setError } = useForm<FormData>({
    resolver: yupResolver(SearchUserFormSchema)
  });

  const { data, isLoading, isSuccess, refetch, remove } = useUsers(email, {
    enabled: false,
    retry: false,
    onError: (errors) => {
      mapServerErrors(errors, setError);
      setEmail(null);
      remove();
    }
  });

  const onSubmit = handleSubmit((data) => {
    setEmail(data.email);
    refetch();
  });

  const handleOnClose = () => {
    setEmail(null);
    onClose();
    reset();
  };

  return (
    <Box ref={ref} w='100%' {...props}>
      <Button
        variant='outline'
        leftIcon={<FontAwesomeIcon icon={faPlus} />}
        alignSelf='flex-end'
        onClick={onOpen}
        isFullWidth>
        Add New Connection
      </Button>

      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Connection</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <form onSubmit={onSubmit}>
              <HStack spacing={2} alignItems='flex-start'>
                <FormControl id='email' isInvalid={errors.email?.message !== undefined}>
                  <Input name='email' placeholder='Email' type='email' ref={register} />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <Button type='submit' isLoading={isLoading}>
                  Search
                </Button>
              </HStack>
            </form>
            <Collapse in={isSuccess}>
              <Box p={4}>
                {data?.data && <ProfileCard user={data.data.data} displayBasicInfo mt={4} />}
              </Box>
            </Collapse>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
});

export default AddConnection;
