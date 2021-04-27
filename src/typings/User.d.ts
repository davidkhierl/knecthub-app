interface User {
  emails: UserEmail[];
  firstName: string;
  fullName: string;
  id: string;
  isVerified: boolean;
  lastName: string;
  profile: Profile;
}
interface UserEmail {
  email: string;
  type: 'primary' | 'secondary' | 'pendingPrimary';
  confirmed?: boolean;
  isVisible?: boolean;
}
