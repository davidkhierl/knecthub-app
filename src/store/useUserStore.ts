import create from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
};

const useUserStore = create<UserStore>(
  persist(
    (set, _get) => ({
      user: null,
      setUser: (user) => set(() => ({ user }))
    }),
    {
      name: 'user',
      getStorage: () => localStorage
    }
  )
);

export default useUserStore;
