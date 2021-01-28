import { Box, Divider, Flex, Heading, VStack } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';
import { faAddressCard, faUser } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavLinkRouter from 'components/common/NavLinkRouter';
import React from 'react';

const Account = () => {
  return (
    <Flex p={6} h='100%' flexDirection='column'>
      <Heading as='h4' size='md'>
        Settings
      </Heading>
      <Flex mt={4} h='100%'>
        <VStack w='320px' spacing={3}>
          <NavLinkRouter to='/settings/account' isFullWidth>
            <Box as='span' mr='10px'>
              <FontAwesomeIcon icon={faAddressCard} />
            </Box>
            Account
          </NavLinkRouter>
          <NavLinkRouter to='/settings/profile' isFullWidth>
            <Box as='span' mr='10px'>
              <FontAwesomeIcon icon={faUser} />
            </Box>
            Profile
          </NavLinkRouter>
        </VStack>
        <Divider orientation='vertical' mx={6} />
        <div className='px-4 dark:text-white'>
          <Switch>
            <Route path='/settings/account'>Account</Route>
            <Route path='/settings/profile'>Profile</Route>
          </Switch>
        </div>
      </Flex>
    </Flex>
  );
};

export default Account;
