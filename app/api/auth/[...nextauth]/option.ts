import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Confirm, RefreshAccessToken } from "@/services/requests/auth";
import { AuthSession } from "../next-auth";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        code: {},
        phone: {},
        lang: {},
      },

      async authorize(credentials) {
        const phone = credentials?.phone as string;
        const code = credentials?.code as string;
        const lang = credentials?.lang as Lang;

        // Avval Confirm API orqali tasdiqlash tokenlarini olish
        let { data } = await Confirm<{
          detail: string;
          token: {
            refresh: string;
            access: string;
          };
        }>(phone, code, lang);

        const { access } = data?.token;

        // Foydalanuvchi haqida ma'lumot olish uchun API chaqiruvi
        const { data: user } = await axios.get(
          "https://article.jscorp.uz/auth/me/",
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        if (data) {
          // Foydalanuvchi ob'ektini qaytarish
          return {
            id: phone,
            access: data.token.access,
            refresh: data.token.refresh,
            first_name: user.first_name,
            last_name: user.last_name,
            phone: user.phone,
            lang: lang,
            accessTokenExpires: Date.now() + 5 * 60 * 1000,
          };
        } else {
          console.log(data);
          throw new Error(JSON.stringify({ errors: false, status: false }));
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, trigger, user, session: sessionUser }) {
      // Agar trigger update bo'lsa, tokenni yangilash
      if (trigger === "update" && sessionUser.user) {
        const session = sessionUser as AuthSession;

        token.access = session.access;
        token.refresh = session.refresh;
        token.first_name = session.first_name;
        token.last_name = session.last_name;
        token.phone = session.phone;
        token.lang = session.lang;
        token.accessTokenExpires = session.accessTokenExpires;

        return token;
      }

      // Foydalanuvchi mavjud bo'lsa, yangi token yaratish
      if (user) {
        token.access = user.access;
        token.refresh = user.refresh;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.phone = user.phone;
        token.lang = user.lang;

        // Access token muddati 5 daqiqa bo'lishi uchun
        token.accessTokenExpires = Date.now() + 5 * 60 * 1000; // 5 daqiqa
      }

      // Token muddati tugaganmi?
      if (Date.now() < token.accessTokenExpires) {
        return token; // Hali amal qilmoqda
      }

      // Token yangilash funksiyasini chaqirish
      return await RefreshAccessToken(token);
    },

    async session({ session, token }) {
      // Token sessionga qo'shish
      if (token) {
        session.user.access = token.access;
        session.user.refresh = token.refresh;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.phone = token.phone;
        session.user.lang = token.lang;
        session.user.accessTokenExpires = token.accessTokenExpires;
      }
      return session;
    },
  },
};
