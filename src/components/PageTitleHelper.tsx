import config from 'config';
import useAppStore from 'store/useAppStore';
import useCurrentRoute from 'hooks/useCurrentRoute';
import { useEffect } from 'react';

const PageTitleHelper = () => {
  const currentRoute = useCurrentRoute();
  const pageTitle = useAppStore((state) => state.pageTitle);
  const setPageTitle = useAppStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle(
      currentRoute?.pageTitle
        ? `${currentRoute.pageTitle} | ${config.websiteName}`
        : config.websiteName
    );
  }, [currentRoute?.pageTitle, setPageTitle]);

  useEffect(() => {
    window.document.title = pageTitle || config.websiteName;
  }, [pageTitle]);

  return null;
};

export default PageTitleHelper;
