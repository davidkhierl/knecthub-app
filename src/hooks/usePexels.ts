import { useEffect, useState } from 'react';

import pexels from 'services/pexels';

export interface pexelsOptions {
  type?: 'search' | 'curated';
  query?: string;
  searchOptions?: {
    orientation?: 'landscape' | 'portrait' | 'square';
    size?: 'large' | 'medium' | 'small';
    color?: string;
    locale?: string;
    per_page?: number;
    page?: number;
  };
}

export interface PexelsResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
  next_page: string;
}

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: Src;
  liked: boolean;
}

export interface Src {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;

  tiny: string;
}

const usePexels = ({ type = 'search', query = '', ...props }: pexelsOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<PexelsResponse | undefined>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const url = `/${type}?${type === 'search' ? `query=${query}` : ''}${
        props.searchOptions?.orientation ? `&orientation=${props.searchOptions?.orientation}` : ``
      }`;
      pexels.get<PexelsResponse>(url).then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
    })();
  }, [props.searchOptions?.orientation, query, type]);

  return { data, isLoading };
};

export default usePexels;
