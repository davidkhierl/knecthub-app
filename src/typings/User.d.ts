interface User {
  email: string;
  firstName: string;
  fullName: string;
  googleId?: string;
  id: string;
  isVerified: boolean;
  lastName: string;
  profile: Profile;
}
// interface UserEmail {
//   email: string;
//   type: 'primary' | 'secondary' | 'pendingPrimary';
//   confirmed?: boolean;
//   isVisible?: boolean;
// }
