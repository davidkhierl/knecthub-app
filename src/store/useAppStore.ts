import routes, { Routes } from 'routes';

import config from 'config';
import create from 'zustand';

type AppStore = {
  pageTitle: string;
  pages: Routes;
  setPageTitle: (pageTitle: string) => void;
};

const useAppStore = create<AppStore>((set) => ({
  pages: routes,
  pageTitle: config.websiteName,
  setPageTitle: (pageTitle) => set(() => ({ pageTitle }))
}));

export default useAppStore;
