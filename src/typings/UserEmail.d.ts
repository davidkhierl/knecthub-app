interface UserEmail {
  email: string;
  type: 'primary' | 'secondary' | 'pendingPrimary';
  confirmed?: boolean;
  isVisible?: boolean;
}
