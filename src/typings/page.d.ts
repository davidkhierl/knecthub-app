import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';

export interface PageWithLayout {
  getLayout?: (page: ReactElement) => ReactNode;
}

export type AppPropsWithLayout<P = {}> = AppProps & {
  Component: NextComponentType<NextPageContext, any, P> & PageWithLayout;
};
