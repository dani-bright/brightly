import { getUrl, getUrls } from '@/api/url';
import { useQuery } from '@tanstack/react-query';

export const useUrl = (shortUrl: string) =>
  useQuery({
    queryKey: ['url'],
    queryFn: () => getUrl(shortUrl),
    retry: false,
  });

export const useUrls = () =>
  useQuery({
    queryKey: ['urls'],
    queryFn: getUrls,
  });
