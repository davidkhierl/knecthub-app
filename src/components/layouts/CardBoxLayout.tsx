import { Box, Center, Container, Flex, Heading, IconButton, Tooltip } from '@chakra-ui/react';
import { useBreakpointValue, useColorMode, useColorModeValue } from '@chakra-ui/react';

import { BiArrowBack } from 'react-icons/bi';
import Card from '@/components/common/Card';
import { ImSun } from 'react-icons/im';
import { IoMoon } from 'react-icons/io5';
import KnecthubLogo from '@/components/common/KnecthubLogo';
import React from 'react';
import { useRouter } from 'next/router';

export interface CardBoxLayoutProps {
  children?: React.ReactNode;
  heading?: string;
  goBackPath?: string;
}

const CardBoxLayout = ({ children, heading, goBackPath }: CardBoxLayoutProps) => {
  const router = useRouter();

  const logoHeight = useBreakpointValue({ base: '28px', md: '32px' });

  const { toggleColorMode } = useColorMode();

  const colorModeIcon = useColorModeValue(<IoMoon />, <ImSun />);

  return (
    <Container minH='full' py={8} display='flex' flexDirection='column'>
      <Box m='auto' alignSelf='safe center' width='full'>
        <KnecthubLogo to='/' height={logoHeight} />
        <Card mt={6}>
          <Flex>
            {goBackPath && (
              <Tooltip label='Go back' hasArrow rounded='md'>
                <IconButton
                  aria-label='Go back'
                  icon={<BiArrowBack />}
                  onClick={() => router.push(goBackPath)}
                  variant='ghost'
                  size='lg'
                  mr={1}
                />
              </Tooltip>
            )}
            <Heading mb={2}>{heading}</Heading>
          </Flex>
          {children}
        </Card>
        <Center mt={8}>
          <IconButton
            aria-label='Toggle color mode'
            icon={colorModeIcon}
            onClick={toggleColorMode}
            variant='ghost'
          />
        </Center>
      </Box>
    </Container>
  );
};

export default CardBoxLayout;
