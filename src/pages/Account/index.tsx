import { Alert, AlertIcon, Box, Divider, Heading, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { faAddressCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { find, isMatch } from 'lodash';

import ChangePasswordForm from 'components/forms/ChangePasswordForm';
import Container from 'components/common/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavLinkRouter from 'components/common/LinkRouter/NavLinkRouter';
import UpdatePrimaryEmailForm from 'components/forms/UpdatePrimaryEmailForm';
import UpdateProfileForm from 'components/forms/UpdateProfileForm';
import UpdateUserForm from 'components/forms/UpdateUserForm';
import useUserStore from 'store/useUserStore';

const Account = () => {
  const emails = useUserStore((state) => state.user?.emails);

  const [pendingPrimaryEmail, setPendingPrimaryEmail] = useState<UserEmail>();

  useEffect(() => {
    const pendingPrimary = find(emails, (email) => isMatch(email, { type: 'pendingPrimary' }));

    if (pendingPrimary) setPendingPrimaryEmail(pendingPrimary);
  }, [emails]);

  return (
    <Container py={4} flexGrow={1}>
      <Heading>Settings</Heading>
      <Stack flexGrow={1} mt={4} direction={['column', 'column', 'row']} spacing='24px'>
        <Stack
          w={['100%', '288px', '320px']}
          spacing={3}
          flexShrink={0}
          direction={['column', 'row', 'column']}>
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
        <Box w='100%'>
          <Switch>
            <Route path='/settings/account'>
              <Container maxWidth={[null, '487px', '487px']} px={0}>
                <Heading as='h4' size='md' mb={4}>
                  General Details
                </Heading>
                <UpdateUserForm />
                <Divider orientation='horizontal' my={6} />
                <Heading as='h4' size='md' mb={4}>
                  Email
                </Heading>
                {pendingPrimaryEmail && (
                  <Alert status='warning' mb={2} rounded='md'>
                    <AlertIcon />
                    <Text fontSize='sm'>
                      A request to update primary email to{' '}
                      <strong>{pendingPrimaryEmail.email}</strong> is pending, confirm the email
                      address to complete the changes.
                    </Text>
                  </Alert>
                )}
                <UpdatePrimaryEmailForm />
                <Divider orientation='horizontal' my={6} />
                <Heading as='h4' size='md' mb={4}>
                  Password
                </Heading>
                <ChangePasswordForm />
              </Container>
            </Route>
            <Route path='/settings/profile'>
              <Container maxWidth={[null, '487px', '487px']} px={0}>
                <Heading as='h4' size='md' mb={4}>
                  About You
                </Heading>
                <UpdateProfileForm />
              </Container>
            </Route>
          </Switch>
        </Box>
      </Stack>
    </Container>
  );
};

export default Account;
