import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Text,
  VStack,
  forwardRef
} from '@chakra-ui/react';
import Card, { CardProps } from 'components/common/Card';

import ButtonLinkRouter from 'components/common/LinkRouter/ButtonLinkRouter';
import { Connection } from 'queries/useConnections';
import React from 'react';
import getPrimaryEmail from 'helpers/getPrimaryEmail';

export interface ConnectionCardProps {
  /**
   * User
   */
  user: User | null;
  /**
   * Connection status
   */
  connectionStatus?: Connection['status'];
}

/**
 * Connection Card
 * @param props ConnectionCardProps
 */
const ConnectionCard = forwardRef<ConnectionCardProps & CardProps, 'div'>((props, ref) => {
  const { user, connectionStatus, ...rest } = props;

  const email = getPrimaryEmail(user?.emails);

  if (!user) return null;

  return (
    <Card
      ref={ref}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      {...rest}>
      <VStack spacing={2}>
        <Avatar name={user.fullName} bg={user.profile.avatarBgColor} />
        <Box>
          <Heading size='sm' textAlign='center'>
            {user.fullName}
          </Heading>
          {user.profile.jobTitle && (
            <Text fontSize={14} textAlign='center'>
              {user.profile.jobTitle}
            </Text>
          )}
        </Box>
        <HStack spacing={2}>
          <ButtonLinkRouter to={`/user/${user.id}`} size='xs' variant='outline'>
            View
          </ButtonLinkRouter>
          <Button size='xs' colorScheme='blue'>
            Message
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
});

export default ConnectionCard;
