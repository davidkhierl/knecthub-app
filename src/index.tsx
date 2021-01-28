import 'assets/scss/main.scss';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from 'App';
import PageTitleHelper from 'components/PageTitleHelper';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import store from 'redux/store';
import theme from 'theme';

// import * as Sentry from '@sentry/react';

// import { Integrations } from '@sentry/tracing';

// Initialize Sentry
// Sentry.init({
//   dsn: 'https://fc7cca8c4e3b46919f548fc08592f9c0@o307506.ingest.sentry.io/5513272',
//   integrations: [new Integrations.BrowserTracing()],
//   tracesSampleRate: 1.0
// });

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <Router>
          <PageTitleHelper />
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </Router>
      </ReduxProvider>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
