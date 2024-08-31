declare module '@mapbox/search-js-react' {
  import { FC, RefAttributes } from 'react';

  interface SearchBoxProps {
    accessToken: string;
    map: mapboxgl.Map;
    mapboxgl: typeof mapboxgl;
    // 他の必要なプロパティを追加
  }

  export const SearchBox: FC<SearchBoxProps & RefAttributes<unknown>>;
}
