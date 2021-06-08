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
          isActive={router.pathname === href}
          variant='ghost'
          isFullWidth
          justifyContent='start'
          as='a'
          fontSize='sm'
          fontWeight='normal'
          ref={ref}
          {...props}
        />
      </Link>
    );

  return (
    <Button
      variant='ghost'
      isFullWidth
      justifyContent='start'
      fontSize='sm'
      fontWeight='normal'
      ref={ref}
      {...props}
    />
  );
});

export default SidebarMenuItem;
