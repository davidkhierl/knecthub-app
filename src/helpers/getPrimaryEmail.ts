import { find } from 'lodash';

function getPrimaryEmail(emails?: UserEmail[]) {
  const primaryEmail = find(emails, { type: 'primary' });

  return primaryEmail?.email;
}

export default getPrimaryEmail;
