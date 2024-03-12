import { fetchApi } from './fetchApi';

export const getUrls = async (): Promise<
  { url: string; shortUrl: string }[]
> => {
  try {
    return fetchApi('GET', 'url');
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getUrl = async (shortUrl: string): Promise<string> => {
  return fetchApi('GET', `url/${shortUrl}`);
};
