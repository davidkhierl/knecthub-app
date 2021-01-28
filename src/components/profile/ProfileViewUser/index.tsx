import ProfileBanner from '../ProfileBanner';
import React from 'react';

// import ProfileCard from '../ProfileCard';

const ProfileViewUser = () => {
  return (
    <div className="flex flex-col">
      <ProfileBanner />
      {/* <ProfileCard
      profile={{
        ...profile,
        fullName: `${user?.firstName} ${user?.lastName}`,
        email: `${user?.email}`,
      }}
    /> */}
    </div>
  );
};

export default ProfileViewUser;
