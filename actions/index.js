import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

// We are using useSWR hook to client-side fetch the data from
// our /products endpoint, and cache the response as initialData
// More info: https://swr.vercel.app
export const useGetProducts = initialData => useSWR(`/api/products`, fetcher, { initialData });

export const useGetPosts = initialData => useSWR(`/api/posts`, fetcher, { initialData });