import { BoxProps, Skeleton, Stack, VStack, forwardRef } from '@chakra-ui/react';

import AddConnection from './AddConnection';
import ProfileCard from 'components/common/ProfileCard';
import React from 'react';
import useConnections from 'queries/useConnections';

const ConnectionsList = forwardRef<BoxProps, 'div'>(() => {
  const { data, isLoading } = useConnections();

  const connections = data?.data.data.map((connection) => {
    return connection.status === 'accepted' ? (
      <ProfileCard key={connection.id} user={connection.sender ?? connection.receiver} w='100%' />
    ) : null;
  });

  return (
    <VStack>
      {isLoading ? (
        <Stack w='100%'>
          <Skeleton height='40px' rounded='md' />
          <Skeleton height='120px' rounded='md' />
          <Skeleton height='120px' rounded='md' />
          <Skeleton height='120px' rounded='md' />
          <Skeleton height='120px' rounded='md' />
          <Skeleton height='120px' rounded='md' />
        </Stack>
      ) : (
        <>
          <AddConnection />
          {connections}
        </>
      )}
    </VStack>
  );
});

export default ConnectionsList;
