import { ReactComponent as KnecthubLogoPrimary } from './logo-primary.svg';
import { ReactComponent as KnecthubLogoWithTextPrimary } from './logo-with-text-primary.svg';
import { ReactComponent as KnecthubLogoWithTextPrimaryDark } from './logo-with-text-primary-dark.svg';
import { Link } from 'react-router-dom';
import React from 'react';
import { useColorMode } from '@chakra-ui/react';

interface KnecthubLogoProps {
  to?: string;
  variant?: 'logo-with-text-primary' | 'logo-only-primary';
}

const KnecthubLogo: React.VFC<
  KnecthubLogoProps &
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
> = ({ to, variant, height = '32px', ...props }) => {
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
      <Link to={to}>
        <Logo />
      </Link>
    );

  return <Logo />;
};

export default KnecthubLogo;
