import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps
} from '@chakra-ui/react';

import ConnectionRequestForm from 'components/forms/ConnectionRequestForm';
import React from 'react';

// import { mapServerErrors } from 'utils/reactHookFormUtils';
// import { useForm } from 'react-hook-form';
// import useUsers from 'queries/useUsers';
// import { yupResolver } from '@hookform/resolvers/yup';


// type FormData = {
//   email: string;
// };

// const SearchUserFormSchema = yup.object().shape({
//   email: yup.string().email('Invalid email.').required('Email is required.')
// });

const AddConnectionModal = ({ onClose, ...props }: Omit<ModalProps, 'children'>) => {
  // const [email, setEmail] = useState<string | null>(null);

  // const { register, reset, errors, handleSubmit, setError, getValues } = useForm<FormData>({
  //   resolver: yupResolver(SearchUserFormSchema)
  // });

  // const { isLoading, remove } = useUsers(email, {
  //   enabled: !!email,
  //   retry: false,
  //   onError: (errors) => {
  //     mapServerErrors(errors, setError);
  //     setEmail(null);
  //     remove();
  //   }
  // });

  // const onSubmit = handleSubmit((_data) => {
  //   setEmail(getValues().email);
  // });

  // const handleOnClose = () => {
  //   setEmail(null);
  //   onClose();
  //   reset();
  // };

  return (
    <Modal onClose={onClose} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Connection</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <ConnectionRequestForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddConnectionModal;
