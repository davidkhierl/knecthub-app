import React, { useCallback } from 'react';

import useUserStore from 'store/useUserStore';

const ProfileUpdateForm = () => {
  const user = useUserStore((state) => state.user);

  const submitForm = useCallback((values: typeof initialValues) => {
    console.log(values);
  }, []);

  const initialValues = {
    company: user?.profile?.company,
    jobTitle: user?.profile?.jobTitle,
    bio: user?.profile?.bio,
    location: user?.profile?.location,
    contactNumber: user?.profile?.contactNumber
  };

  // return (
  //   <Form
  //     form={form}
  //     layout='vertical'
  //     initialValues={initialValues}
  //     onFinish={submitForm}
  //     preserve={false}>
  //     <Row gutter={16}>
  //       {/* {profile.updateSuccess && (
  //         <Col span={24}>
  //           <Alert message='Profile updated' type='success' showIcon className='mb-3' />
  //         </Col>
  //       )} */}
  //       {!user?.isVerified && (
  //         <Col span={24}>
  //           <Alert
  //             message='Email not yet verified'
  //             description={`Please verify your email to update your profile, if you haven't receive a confirmation email click the button below and check your email.`}
  //             type='info'
  //             showIcon
  //             className='mb-3'
  //           />
  //         </Col>
  //       )}
  //       <Col span={24}>
  //         <Form.Item
  //           label='Company'
  //           name='company'
  //           rules={[{ required: true, message: 'Company is required' }]}
  //           hasFeedback>
  //           <Input disabled={!user?.isVerified} />
  //         </Form.Item>
  //       </Col>
  //       <Col span={24}>
  //         <Form.Item label='Job Title' name='jobTitle'>
  //           <Input disabled={!user?.isVerified} />
  //         </Form.Item>
  //       </Col>
  //       <Col span={24}>
  //         <Form.Item label='Bio' name='bio'>
  //           <Input.TextArea disabled={!user?.isVerified} />
  //         </Form.Item>
  //       </Col>
  //       <Col span={24}>
  //         <Form.Item label='Location' name='location'>
  //           <Input disabled={!user?.isVerified} />
  //         </Form.Item>
  //       </Col>
  //       <Col span={24}>
  //         <Form.Item label='Contact Number' name='contactNumber'>
  //           <Input disabled={!user?.isVerified} />
  //         </Form.Item>
  //       </Col>
  //       <Col span={24}>
  //         <Form.Item>
  //           <Button
  //             type='primary'
  //             htmlType='submit'
  //             block
  //             // loading={profile.updating}
  //             disabled={!user?.isVerified}>
  //             Update
  //           </Button>
  //         </Form.Item>
  //       </Col>
  //     </Row>
  //   </Form>
  // );
  return <div>update profile form</div>;
};

export default ProfileUpdateForm;
