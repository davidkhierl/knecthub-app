import { Avatar, Flex, Heading, Skeleton, Wrap, WrapItem, forwardRef } from '@chakra-ui/react';
import Container, { ContainerProps } from 'components/common/Container';

import AddConnection from './AddConnection';
import Card from 'components/common/Card';
import ConnectionCard from './ConnectionCard';
import React from 'react';
import getPrimaryEmail from 'helpers/getPrimaryEmail';
import useConnections from 'queries/useConnections';

const ConnectionGrid = forwardRef<ContainerProps, 'div'>((props, ref) => {
  const { data, isLoading } = useConnections();

  const acceptedConnections = data?.data.data.map((connection) => {
    const user = connection.receiver ?? connection.sender;

    const email = getPrimaryEmail(user?.emails);

    return connection.status === 'accepted' ? (
      <WrapItem key={connection.id} w={['100%']}>
        <ConnectionCard user={user} connectionStatus={connection.status} w={['100%']} />
      </WrapItem>
    ) : null;
  });

  return (
    <Container ref={ref} {...props} pb={8} px={[1, 4]}>
      <Flex flexDirection={['column', 'row']}>
        <Heading>Connections</Heading>
        <AddConnection ml={[0, 'auto']} my={[4, 0]} />
      </Flex>
      {!isLoading && (
        <Wrap p={[0, 4]} spacing={4} justify='center'>
          <WrapItem>
            <Skeleton h='150px' w='150px' borderRadius={12} />
          </WrapItem>
          <WrapItem>
            <Skeleton h='150px' w='150px' borderRadius={12} />
          </WrapItem>
          <WrapItem>
            <Skeleton h='150px' w='150px' borderRadius={12} />
          </WrapItem>
          <WrapItem>
            <Skeleton h='150px' w='150px' borderRadius={12} />
          </WrapItem>
        </Wrap>
      )}
      {!isLoading && <Wrap p={[0, 4]}>{acceptedConnections}</Wrap>}
    </Container>
  );
});

export default ConnectionGrid;
