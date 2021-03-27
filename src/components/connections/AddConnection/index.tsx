import { Box, BoxProps, Button, forwardRef, useDisclosure } from '@chakra-ui/react';

import AddConnectionModal from './AddConnectionModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddConnection = forwardRef<BoxProps, 'div'>((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box ref={ref} {...props}>
      <Button
        variant='outline'
        leftIcon={<FontAwesomeIcon icon={faPlus} />}
        alignSelf='flex-end'
        onClick={onOpen}
        isFullWidth>
        Add New Connection
      </Button>
      <AddConnectionModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
});

export default AddConnection;
