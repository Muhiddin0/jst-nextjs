"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import UseAxiosAuth from "@/services/hooks/use-axios-auth";
import { queryGenerator } from "@/lib/query-generator";
import { useDebounces } from "@/hooks/use-debounces";

const useReactQueryAction = <T>({
  url,
  query,
  debounceTime,
  enabled,
}: {
  url: string;
  query?: Record<string, any>;
  debounceTime?: number;
  enabled?: boolean;
}) => {
  let params: any = useParams();
  const axiosAuth = UseAxiosAuth();

  Object.keys(params).map((key) => {
    url = url.replace(`[${key}]`, params[key]);
  });

  // urlga paramslarni qo'shish
  if (query) {
    url = url + queryGenerator(query);
  }

  // Debounced URL
  const debouncedUrl = debounceTime ? useDebounces(url, debounceTime) : url;

  return useQuery<T>({
    queryKey: [debouncedUrl],
    queryFn: async () => {
      try {
        let { data } = await axiosAuth.get(debouncedUrl);
        return data;
      } catch (error) {
        return null;
      }
    },
    enabled: enabled && (!debounceTime || debouncedUrl === url),
  });
};

export default useReactQueryAction;
