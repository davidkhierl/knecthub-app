const hasSignedUser =
  typeof window !== 'undefined' ? !!localStorage.getItem('pre-fetch-user') : false;

export default hasSignedUser;
