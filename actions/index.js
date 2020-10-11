import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export const useGetProducts = initialData => useSWR(`/api/products`, fetcher, { initialData });
