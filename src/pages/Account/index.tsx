import {
  Alert,
  AlertIcon,
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  useMediaQuery
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { faAddressCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { find, isMatch } from 'lodash';

import Container from 'components/common/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavLinkRouter from 'components/common/NavLinkRouter';
import UpdatePrimaryEmailForm from 'components/forms/UpdatePrimaryEmailForm';
import UpdateUserForm from 'components/forms/UpdateUserForm';
import useUserStore from 'store/useUserStore';

const Account = () => {
  // Divider doesn't support responsive theme
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const emails = useUserStore((state) => state.user?.emails);

  const [pendingPrimaryEmail, setPendingPrimaryEmail] = useState<UserEmails>();

  useEffect(() => {
    const pendingPrimary = find(emails, (email) => isMatch(email, { type: 'pendingPrimary' }));

    if (pendingPrimary) setPendingPrimaryEmail(pendingPrimary);
  }, [emails]);

  return (
    <Container my={8} h='100%'>
      <Heading>Settings</Heading>
      <Flex mt={4} h='100%' flexDirection='column'>
        <Flex h='100%' flexDirection={['column', 'column', 'row']}>
          <Stack
            w={['288px', '320px']}
            spacing={3}
            flexShrink={0}
            direction={['row', 'row', 'column']}>
            <NavLinkRouter to='/settings/account' isFullWidth size='sm'>
              <Box as='span' mr='10px'>
                <FontAwesomeIcon icon={faAddressCard} />
              </Box>
              Account
            </NavLinkRouter>
            <NavLinkRouter to='/settings/profile' isFullWidth size='sm'>
              <Box as='span' mr='10px'>
                <FontAwesomeIcon icon={faUser} />
              </Box>
              Profile
            </NavLinkRouter>
          </Stack>
          <Divider
            orientation={isLargerThan768 ? 'vertical' : 'horizontal'}
            mx={[0, 0, 6]}
            my={[6, 6, 0]}
          />
          <Box w='100%'>
            <Switch>
              <Route path='/settings/account'>
                <Container maxWidth={[null, null, '768px']}>
                  <Heading as='h4' size='md' mb={4}>
                    General Details
                  </Heading>
                  <UpdateUserForm />
                  <Divider orientation='horizontal' my={6} />
                  <Heading as='h4' size='md' mb={4}>
                    Email
                  </Heading>
                  <UpdatePrimaryEmailForm mb={2} />
                  {pendingPrimaryEmail && (
                    <Alert status='warning'>
                      <AlertIcon />A request to update primary email to {pendingPrimaryEmail.email}{' '}
                      is pending, confirm the email address to complete the changes.
                    </Alert>
                  )}
                </Container>
              </Route>
              <Route path='/settings/profile'>Profile</Route>
            </Switch>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Account;
