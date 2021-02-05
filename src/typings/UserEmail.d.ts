interface UserEmails {
  email: string;
  type: 'primary' | 'secondary' | 'pendingPrimary';
  confirmed?: boolean;
  isVisible?: boolean;
}
