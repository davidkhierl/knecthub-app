import api from '@/services/api';
import create from 'zustand';

type AuthStore = {
  user: User | null;
  authenticated: boolean;
  error?: StandardErrorResponse;
  isLoading: boolean;
  isSilentLoadingUser: boolean;
  setIsLoading: (loading: boolean) => void;
  setIsSilentLoadingUser: (loading: boolean) => void;
  loadSignedUser: () => void;
  authSuccess: (user: User) => void;
  authFailed: (error?: StandardErrorResponse) => void;
  signOut: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  authenticated: false,
  error: undefined,
  isLoading: true,
  isSilentLoadingUser: false,
  setIsLoading: (loading) => {
    set({ isLoading: loading });
  },
  setIsSilentLoadingUser: (loading) => {
    set({ isSilentLoadingUser: loading });
  },
  loadSignedUser: async () => {
    const hasUserSigned =
      typeof window !== 'undefined' ? localStorage.getItem('pre-fetch-user') : false;

    if (hasUserSigned) {
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
    } else {
      set({ user: null, isLoading: false, authenticated: false });
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
      await api.get<StandardResponse>('auth/signout');

      localStorage.removeItem('pre-fetch-user');

      set({ user: null, isLoading: false, authenticated: false });
    } catch (error) {
      localStorage.removeItem('pre-fetch-user');

      set({ user: null, isLoading: false, authenticated: false });
    }
  },
  user: null
}));
export default useAuthStore;
