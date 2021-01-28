import { Box } from '@chakra-ui/react';
import CatInBox from 'assets/animations/cat-in-box.json';
import KnecthubLogo from 'components/common/KnecthubLogo';
import LottieLoader from 'components/common/LottieLoader';
import React from 'react';

// const NotFoundContainer = styled.div`
//   align-self: center;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

const NotFound = () => {
  return (
    <Box>
      <LottieLoader animationData={CatInBox} />
      <h1 style={{ textAlign: 'center' }}>Oops! page not found...</h1>

      <KnecthubLogo />
    </Box>
  );
};

export default NotFound;
