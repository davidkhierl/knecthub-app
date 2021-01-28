import { authFailed, reloadAuth } from 'redux/authSlice';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

/**
 * A hook for triggering loadUser and userExpired dispatch on initial page load
 */
const useUserInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.localStorage.getItem('user') ? dispatch(reloadAuth()) : dispatch(authFailed());
  }, [dispatch]);
};

export default useUserInitializer;
