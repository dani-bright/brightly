import { useRouter } from 'next/navigation';

export interface UrlProps {
  shortUrl: string;
  url: string;
}

const Url = ({ shortUrl, url }: UrlProps) => {
  const router = useRouter();
  const handleClick = async () => {
    console.log(shortUrl);
    router.push(`/${shortUrl}`);
  };
  return <li onClick={handleClick}>{url}</li>;
};

export default Url;
