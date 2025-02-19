import NextAuth from "next-auth";
import { string } from "zod";

export interface MyUser {
  refresh: string;
  access: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  accessTokenExpires: number;
  role: Role;
  avatar: string | null;
  lang: Lang;
  id: any;
}

export interface AuthSession extends MyUser {}

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
