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
  VStack,
  forwardRef,
  useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { FontAwesomeIcon } from 'components/chakra-factory';
import ProfileCard from 'components/common/ProfileCard';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUserSearch } from 'services/user.services';
import { mapServerErrors } from 'utils/reactHookFormUtils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  email: string;
};

const SearchUserFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.')
});

const ConnectionsList = forwardRef<BoxProps, 'div'>((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchResult, setSearchResult] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, errors, setError } = useForm<FormData>({
    resolver: yupResolver(SearchUserFormSchema)
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    setSearchResult(null);
    await getUserSearch(data.email)
      .then((res) => {
        setSearchResult(res.data.data);

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setSearchResult(null);
        mapServerErrors(error, setError);
      });
  });

  const handleOnClose = () => {
    onClose();
    reset();
    setIsLoading(false);
    setSearchResult(null);
  };

  return (
    <>
      <Box ref={ref} {...props}>
        <VStack>
          <Button
            variant='outline'
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
            alignSelf='flex-end'
            onClick={onOpen}>
            Add Connection
          </Button>
        </VStack>
      </Box>
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
            <Collapse in={searchResult !== null}>
              <Box p={4}>
                <ProfileCard user={searchResult} displayBasicInfo mt={4} />
              </Box>
            </Collapse>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

export default ConnectionsList;
