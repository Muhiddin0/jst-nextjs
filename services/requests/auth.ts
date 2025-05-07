import { RegisterSchemaType } from "@/schema/auth";
import { instance } from "../instance";
import { Session } from "next-auth";

export async function Login<T>(data: { phone: string; password: string }) {
  let config = {
    method: "post",
    url: "/auth/token/",
    data: data,
  };

  return await instance.request<T>(config);
}

export async function Register<T>(data: RegisterSchemaType, lang: Lang) {
  const formData = new FormData();
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("phone", data.phone);
  formData.append("password", data.password);

  let config = {
    method: "post",
    url: "/auth/register/",
    data: formData,
  };

  instance.interceptors.request.use(async (config) => {
    config.headers["Accept-Language"] = lang;
    return config;
  });

  return await instance.request<T>(config);
}

export async function Confirm<T>(phone: string, code: string) {
  let formData = new FormData();
  formData.append("phone", phone);
  formData.append("code", code);

  let config = {
    method: "post",
    url: "/auth/confirm/",
    data: formData,
  };

  return await instance.request<T>(config);
}

export async function GetMe<T>({ access }: { access: string }) {
  let config = {
    method: "get",
    url: "/auth/me/",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  };

  return await instance.request<T>(config);
}

// Token yangilash funksiyasi
export async function RefreshAccessToken(token: Session["user"]) {
  try {
    // Refresh token orqali yangi access token olish
    const response = await instance.post("/auth/token/refresh/", {
      refresh: token.refresh,
    });

    const refreshedTokens = response.data;

    return {
      ...token,
      access: refreshedTokens.access,
      accessTokenExpires: Date.now() + 5 * 60 * 1000, // Yangi access token muddati
      refresh: refreshedTokens.refresh ?? token.refresh, // Refresh tokenni yangilash
    };
  } catch (error) {
    console.error("Access token yangilanmadi", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
