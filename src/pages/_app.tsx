import '../styles/globals.css';
import 'nprogress/nprogress.css';

import { AppPropsWithLayout } from '@/typings/page';
import Chakra from '@/chakra-ui/chakra';
import NProgress from 'nprogress';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Router from 'next/router';
import queryClient from '@/lib/queryClient';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      <Chakra cookies={pageProps.cookies}>{getLayout(<Component {...pageProps} />)}</Chakra>
    </QueryClientProvider>
  );
}

export default App;
