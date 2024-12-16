"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import UseAxiosAuth from "@/services/hooks/use-axios-auth";

const useReactQueryAction = <T>(url: string) => {
  let params: any = useParams();
  const axiosAuth = UseAxiosAuth();

  Object.keys(params).map((key) => {
    url = url.replace(`[${key}]`, params[key]);
  });

  return useQuery<T>({
    queryKey: [url],
    queryFn: async () => {
      try {
        let { data } = await axiosAuth.get(url);
        return data;
      } catch (error) {
        return null;
      }
    },
  });
};

export default useReactQueryAction;
