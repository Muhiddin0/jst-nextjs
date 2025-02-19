import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthSession } from "../next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // * Login maydonlarini shu yerga yozish kerak
        // * Misol uchun
        //     phone:{}
        //     password:{}
        //     code:{}
      },

      async authorize(credentials) {
        // * login maydonidagi ma'lumotlarni olish
        // * Misol uchun
        //     credentials.phone
        //     credentials.password
        //     credentials.code

        // =======================================================
        // *** auth uchun requestlarni shu yerga yozish kerak ***
        // =======================================================

        // * chiquvchi misol
        // * Agar responsega o'zgartirish kiritmoqchi bo'lsangiz
        // * next-auth.d.ts fayilidagi MyUser interfaceni o'zgartiring
        // * keyin pastdagi returni ham shunga moslang
        return {
          access: "",
          accessTokenExpires: Date.now() + 5 * 60 * 1000,
          refresh: "",
          avatar: "",
          id: "",
          lang: "uz",
          role: "user",
          email: "",
          first_name: "",
          image: "",
          last_name: "",
          name: "",
          phone: "",
        };
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
      return {
        access: "",
        accessTokenExpires: Date.now() + 5 * 60 * 1000,
        refresh: "",
        avatar: "",
        id: "",
        lang: "uz",
        role: "user",
        email: "",
        first_name: "",
        image: "",
        last_name: "",
        name: "",
        phone: "",
      };
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
