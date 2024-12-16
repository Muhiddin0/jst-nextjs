"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./use-refresh-toke";
import instance from "../instance";
import { useParams } from "next/navigation";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const { lang }: { lang: Lang } = useParams();
  const refreshToken = useRefreshToken(session);

  useEffect(() => {
    const requestIntercept = instance.interceptors.request.use(
      (config) => {
        if (session) {
          config.headers["Authorization"] = `Bearer ${session?.user?.access}`;
        }
        config.headers["Accept-Language"] = lang;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${session?.user.access}`;
          return instance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestIntercept);
      instance.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return instance;
};

export default useAxiosAuth;
