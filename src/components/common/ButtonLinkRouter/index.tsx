import { Button, ButtonProps, forwardRef } from '@chakra-ui/react';

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface ButtonLinkRouterProps extends ButtonProps {
  to: string;
}

const ButtonLinkRouter = forwardRef<ButtonLinkRouterProps, 'button'>((props, ref) => {
  return <Button as={RouterLink} ref={ref} {...props} />;
});
export default ButtonLinkRouter;
