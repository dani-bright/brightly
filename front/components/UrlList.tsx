'use client';

import { getUrl, getUrls } from '@/api/url';
import { useQuery } from '@tanstack/react-query';
import Url from './Url';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUrls } from '@/hooks/useUrl';

const UrlList = () => {
  const { data: urls } = useUrls();

  return (
    <ul>
      {urls?.map(({ url, shortUrl }, index) => (
        <Url key={`${shortUrl}${index}`} shortUrl={shortUrl} url={url} />
      ))}
    </ul>
  );
};

export default UrlList;
