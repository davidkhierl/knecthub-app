import LottieLoader from 'components/common/LottieLoader';
import React from 'react';
import programming from 'assets/animations/programming.json';
import { useHistory } from 'react-router-dom';

// const InvisibleButton = styled(Button)`
//   position: absolute;
//   top: 15px;
//   right: 15px;
//   opacity: 0;
//   :hover {
//     opacity: 1;
//   }
// `;

const LandingPage = () => {
  return (
    <div className='relative flex flex-col items-center justify-center w-full h-full px-4 overflow-auto bg-white dark:bg-gray-900'>
      <LottieLoader animationData={programming} size='400px' />
      <h1 className='text-center dark:text-white'>
        The developers are crafting something awesome!
      </h1>
      {/* <Space>
        <Button
          type='primary'
          onClick={() => message.success('Horray! you will get notified when we go live!')}>
          Notify Me!
        </Button>
        <Button onClick={() => message.info('Get in touch with us!')}>Contact Us</Button>
      </Space> */}
    </div>
  );
};

export default LandingPage;
