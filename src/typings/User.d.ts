interface User {
  emails: UserEmails[];
  firstName: string;
  fullName: string;
  id: string;
  isVerified: boolean;
  lastName: string;
  profile: Profile;
}
interface UserEmails {
  email: string;
  type: 'primary' | 'secondary' | 'pendingPrimary';
  confirmed?: boolean;
  isVisible?: boolean;
}
