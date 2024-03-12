import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import styles from './page.module.css';
import UrlList from '@/components/UrlList';
import { getUrls } from '@/api/url';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['urls'],
    queryFn: getUrls,
  });

  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UrlList />
      </HydrationBoundary>
    </main>
  );
}
