"use client";

import { useSession } from "next-auth/react";
import { RefreshAccessToken } from "../requests/auth";

export const useRefreshToken = (token: any) => {
  const { data: session } = useSession();

  console.log("%cRefresh token", "font-weight: bold; color: #04d");

  const refreshToken = async () => {
    const res = await RefreshAccessToken(token);

    if (session) session.user.access = res.access;
  };

  return refreshToken;
};
