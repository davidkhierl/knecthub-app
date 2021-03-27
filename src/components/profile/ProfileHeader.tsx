import {
  Avatar,
  Box,
  Heading,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  forwardRef,
  useBreakpointValue,
  useColorModeValue
} from '@chakra-ui/react';
import Container, { ContainerProps } from 'components/common/Container';

import ButtonLinkRouter from 'components/common/LinkRouter/ButtonLinkRouter';
import { FontAwesomeIcon } from 'components/chakra-factory';
import MotionBox from 'components/motions/MotionBox';
import MotionContainer from 'components/motions/MotionContainer';
import React from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import useUser from 'queries/useUser';

const ProfileHeader = forwardRef<ContainerProps, 'div'>((props, ref) => {
  const profileBoxBg = useColorModeValue('white', 'gray.700');

  const profileBoxMaxWidth = useBreakpointValue(['640px', '768px', '800px', '800px', '1200px']);

  const secondaryHeadingColor = useColorModeValue('gray.500', 'gray.100');

  const profileBannerHeight = useBreakpointValue(['120px', '120px', '200px']);

  const { data, isLoading } = useUser();

  return (
    <Container ref={ref} px={[0, 4]} {...props}>
      <Box
        px={[0, 4]}
        pb={4}
        borderBottomRadius={12}
        bg={profileBoxBg}
        transition='all .3s'
        boxShadow='lg'>
        <Skeleton isLoaded={!isLoading} borderBottomRadius={12}>
          <MotionBox
            h={profileBannerHeight}
            initial={false}
            animate={{ height: profileBannerHeight }}
            bgGradient='linear(to-t, knectTeal.100, knectTeal.400)'
            borderBottomRadius={12}
          />
        </Skeleton>
        <MotionContainer
          position='relative'
          display='flex'
          flexDirection='column'
          px={4}
          initial={false}
          maxWidth={profileBoxMaxWidth ?? '1200px'}
          animate={{ maxWidth: profileBoxMaxWidth ?? '1200px' }}>
          {isLoading ? (
            <SkeletonCircle isLoaded={!isLoading} size='128px' position='absolute' insetY='-20' />
          ) : (
            <Avatar
              name={data?.data.data.fullName}
              size='2xl'
              position='absolute'
              insetY='-20'
              src='https://randomuser.me/api/portraits/men/1.jpg'
              boxShadow='lg'
            />
          )}
          {isLoading ? (
            <Stack spacing={3} mt={14}>
              <Skeleton height='43px' width='320px' />
              <Skeleton height='20px' width='160px' />
              <Skeleton height='20px' width='160px' />
            </Stack>
          ) : (
            <Stack spacing={3} mt={14}>
              <Heading>{data?.data.data.fullName}</Heading>
              <Heading size='sm' color={secondaryHeadingColor}>
                {data?.data.data.emails[0].email}
              </Heading>
              {(data?.data.data.profile.jobTitle || data?.data.data.profile.company) && (
                <Heading
                  as='h3'
                  size='sm'
                  color={secondaryHeadingColor}
                  p={2}
                  border='1px'
                  rounded='md'
                  alignSelf='flex-start'>
                  {data?.data.data.profile.jobTitle}
                  {data?.data.data.profile.company
                    ? `${data.data.data.profile.jobTitle ? ' at ' : ''}${
                        data?.data.data.profile.company
                      }`
                    : null}
                </Heading>
              )}
              {data?.data.data.profile.bio && <Text>{data?.data.data.profile.bio}</Text>}
              <ButtonLinkRouter
                to='/settings/profile'
                right={0}
                size='sm'
                alignSelf='flex-start'
                rightIcon={<FontAwesomeIcon icon={faPencilAlt} />}>
                Edit Profile
              </ButtonLinkRouter>
            </Stack>
          )}
        </MotionContainer>
      </Box>
    </Container>
  );
});

export default ProfileHeader;
