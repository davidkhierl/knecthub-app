import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Chakra from '@/chakra-ui/chakra';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import queryClient from '@/lib/queryClient';

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </QueryClientProvider>
  );
}

export default App;
