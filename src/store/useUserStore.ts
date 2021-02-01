import create from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  setUser: (user: User, replace?: boolean) => void;
};

const useUserStore = create<UserStore>(
  persist(
    (set) => ({
      user: null,
      setUser: (user, replace) => set(() => ({ user }), replace)
    }),
    {
      name: 'user',
      getStorage: () => localStorage
    }
  )
);

export default useUserStore;
