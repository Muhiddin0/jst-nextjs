import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { RefreshAccessToken } from "./requests/auth";

const instanceAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

// interceptors
instanceAuth.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    config.headers["Authorization"] = `Bearer ${session?.user?.access}`;

    return config;
  },
  (error) => Promise.reject(error),
);

instanceAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    const session = await getSession();

    if (
      error?.response?.status === 401 &&
      !prevRequest?.sent &&
      session?.user
    ) {
      prevRequest.sent = true;

      const user = await RefreshAccessToken(session.user);

      prevRequest.headers["Authorization"] = `Bearer ${session.user.access}`;

      session.user = user;

      return instanceAuth(prevRequest);
    }

    // log out if user is not authenticated
    await signOut();

    return Promise.reject(error);
  },
);

export default instanceAuth;
