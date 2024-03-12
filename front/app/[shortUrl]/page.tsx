'use client';
import { useQuery } from '@tanstack/react-query';
import { getUrl } from '@/api/url';
import { useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useUrl } from '@/hooks/useUrl';

export default function RedirectPage({ params }: any) {
  const shortUrl = params['shortUrl'];
  const router = useRouter();

  const { data: url, error } = useUrl(shortUrl);

  useEffect(() => {
    if (error) {
      return;
    }
    // window.open(url, '_ blank');
    // router.push('/');
    url && redirect(url);
  }, [url, error]);

  return (
    <main>
      <h1>{"You're getting to your destination"}</h1>
    </main>
  );
}
