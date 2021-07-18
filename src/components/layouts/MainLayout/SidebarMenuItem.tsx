import { Button, ButtonProps, forwardRef } from '@chakra-ui/react';

import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export interface SidebarMenuItemProps extends ButtonProps {
  href?: string;
}

const SidebarMenuItem = forwardRef<SidebarMenuItemProps, 'button'>(({ href, ...props }, ref) => {
  const router = useRouter();

  if (href)
    return (
      <Link href={href} passHref>
        <Button
          as='a'
          colorScheme='cyan'
          fontSize='sm'
          fontWeight='normal'
          isActive={router.pathname === href}
          isFullWidth
          justifyContent='start'
          ref={ref}
          variant='sidebar-menu-item'
          {...props}
        />
      </Link>
    );

  return (
    <Button
      colorScheme='cyan'
      fontSize='sm'
      fontWeight='normal'
      isFullWidth
      justifyContent='start'
      ref={ref}
      variant='sidebar-menu-item'
      {...props}
    />
  );
});

export default SidebarMenuItem;
