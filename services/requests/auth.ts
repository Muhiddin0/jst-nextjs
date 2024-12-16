import { RegisterSchemaType } from "@/schema/auth";
import instance from "../instance";

export async function Register<T>(data: RegisterSchemaType, lang: Lang) {
  const formData = new FormData();
  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("phone", data.phone);
  formData.append("password", data.password);

  console.log(formData);

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

export async function Confirm<T>(phone: string, code: string, lang: Lang) {
  let formData = new FormData();
  formData.append("phone", phone);
  formData.append("code", code);

  let config = {
    method: "post",
    url: "/auth/confirm/",
    data: formData,
  };

  instance.interceptors.request.use(async (config) => {
    config.headers["Accept-Language"] = lang;
    return config;
  });

  return await instance.request<T>(config);
}

export async function GetMe<T>() {
  let config = {
    method: "get",
    url: "/auth/me/",
  };

  return await instance.request<T>(config);
}

// Token yangilash funksiyasi
export async function RefreshAccessToken(token: any) {
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
