import NextAuth from "next-auth";
import { string } from "zod";

export interface User {
  refresh: string;
  access: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  accessTokenExpires: number; // Access token muddati
}

export interface AuthSession extends User {
  lang: string;
}

declare module "next-auth" {
  interface User extends AuthSession {}
  interface Session {
    user: User;
  }
}

// Extend the default NextAuth JWT
declare module "next-auth/jwt" {
  interface JWT extends AuthSession {}
}
