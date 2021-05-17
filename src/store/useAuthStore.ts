import api from '@/services/api';
import create from 'zustand';
import hasSignedUser from '@/lib/hasSignedUser';

export type AuthStore = {
  authFailed: (error?: StandardErrorResponse) => void;
  authSuccess: (user: User) => void;
  authenticated: boolean;
  error?: StandardErrorResponse;
  isLoading: boolean;
  isSilentLoadingUser: boolean;
  loadSignedUser: () => void;
  setIsLoading: (loading: boolean) => void;
  setIsSilentLoadingUser: (loading: boolean) => void;
  setUser: (user: User | null) => void;
  signOut: () => void;
  user: User | null;
};

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
