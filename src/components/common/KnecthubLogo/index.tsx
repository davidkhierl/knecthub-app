import KnecthubLogoPrimary from './logo-primary.svg';
import KnecthubLogoWithTextPrimary from './logo-with-text-primary.svg';
import KnecthubLogoWithTextPrimaryDark from './logo-with-text-primary-dark.svg';
import Link from 'next/link';
import React from 'react';
import { useColorMode } from '@chakra-ui/react';

interface KnecthubLogoProps {
  to?: string;
  variant?: 'logo-with-text-primary' | 'logo-only-primary';
}

const KnecthubLogo = ({
  to,
  variant,
  height = '32px',
  ...props
}: KnecthubLogoProps &
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }) => {
  const { colorMode } = useColorMode();

  const Logo = () => {
    switch (variant) {
      case 'logo-with-text-primary':
        return colorMode === 'dark' ? (
          <KnecthubLogoWithTextPrimaryDark {...props} height={height} />
        ) : (
          <KnecthubLogoWithTextPrimary {...props} height={height} />
        );

      case 'logo-only-primary':
        return <KnecthubLogoPrimary {...props} height={height} />;

      default:
        return colorMode === 'dark' ? (
          <KnecthubLogoWithTextPrimaryDark {...props} height={height} />
        ) : (
          <KnecthubLogoWithTextPrimary {...props} height={height} />
        );
    }
  };

  if (to)
    return (
      <Link href={to}>
        <a>
          <Logo />
        </a>
      </Link>
    );

  return <Logo />;
};

export default KnecthubLogo;
