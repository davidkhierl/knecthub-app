import ButtonLinkRouter, { ButtonLinkRouterProps } from '../ButtonLinkRouter';
import { Tooltip, forwardRef, useColorModeValue } from '@chakra-ui/react';

import React from 'react';
import { useRouteMatch } from 'react-router-dom';

export interface NavLinkRouterProps extends ButtonLinkRouterProps {
  tooltipLabel?: string;
}

const NavLinkRouter = forwardRef<NavLinkRouterProps, 'button'>(
  ({ tooltipLabel, ...props }, ref) => {
    const match = useRouteMatch({ path: props.to, exact: true });

    const matchedBg = useColorModeValue('gray.50', 'gray.600');

    return (
      <Tooltip label={tooltipLabel} hasArrow arrowSize={6} borderRadius='6px'>
        <ButtonLinkRouter bg={match ? matchedBg : ''} ref={ref} variant='ghost' {...props} />
      </Tooltip>
    );
  }
);

export default NavLinkRouter;
