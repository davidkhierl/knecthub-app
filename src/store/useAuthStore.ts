import api from '@/services/api';
import create from 'zustand';
import hasSignedUser from '@/lib/hasSignedUser';

export type AuthStore = {
  /**
   * Sets authentication to failed and error object.
   */
  authFailed: (error?: StandardErrorResponse) => void;
  /**
   * Sets authentication to success and user object.
   */
  authSuccess: (user: User) => void;
  /**
   * Boolean value to check if the user is authenticated.
   */
  authenticated: boolean;
  /**
   * Authentication errors.
   */
  error?: StandardErrorResponse;
  /**
   * Authentication in progress, useful for showing loading indicator.
   */
  isLoading: boolean;
  /**
   * Boolean value to check if the user authentication is being processed on the background.
   */
  isSilentLoadingUser: boolean;
  /**
   * Fetch signed-in user data from the api.
   */
  loadSignedUser: () => void;
  /**
   * Sets authentication `isLoading` state.
   */
  setIsLoading: (loading: boolean) => void;
  /**
   * Sets authentication `isSilentLoadingUser` state.
   */
  setIsSilentLoadingUser: (loading: boolean) => void;
  /**
   * Sets user object.
   */
  setUser: (user: User | null) => void;
  /**
   * Sign-out user and remove all data.
   */
  signOut: () => void;
  /**
   * User object.
   */
  user: User | null;
};

/**
 * User authentication store.
 */
const useAuthStore = create<AuthStore>((set) => ({
  authenticated: false,
  error: undefined,
  isLoading: hasSignedUser,
  isSilentLoadingUser: false,
  setIsLoading: (loading) => {
    set({ isLoading: loading });
  },
  setIsSilentLoadingUser: (loading) => {
    set({ isSilentLoadingUser: loading });
  },
  loadSignedUser: async () => {
    if (hasSignedUser) {
      try {
        set({ isSilentLoadingUser: true });

        const res = await api.get<StandardResponse<User>>('users/me');

        set({
          user: res.data.data,
          isLoading: false,
          isSilentLoadingUser: false,
          authenticated: true,
          error: undefined
        });
      } catch (error) {
        localStorage.removeItem('pre-fetch-user');

        set({ user: null, isLoading: false, isSilentLoadingUser: false, authenticated: false });
      }
    }
  },
  authSuccess: (user) => {
    localStorage.setItem('pre-fetch-user', 'true');

    set({ user, authenticated: true, isLoading: false, error: undefined });
  },
  authFailed: (error) => {
    set({ user: null, authenticated: false, isLoading: false, error });
  },
  signOut: async () => {
    try {
      localStorage.removeItem('pre-fetch-user');

      await api.get<StandardResponse>('auth/signout');

      set({ user: null, isLoading: false, authenticated: false });
    } catch (error) {
      localStorage.removeItem('pre-fetch-user');

      set({ user: null, isLoading: false, authenticated: false });
    }
  },
  user: null,
  setUser: (user) => set({ user })
}));

export default useAuthStore;
