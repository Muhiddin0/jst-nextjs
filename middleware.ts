import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { localeConfig } from "./i18n/routing";

const publicRoutes = /^(\/[a-z]{2})?(\/auth\/login)?$/; // Public routelar

const intlMiddleware = createIntlMiddleware(localeConfig);

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null, // Faqat login qilganlar kirishi mumkin
    },
    pages: {
      signIn: `/${localeConfig.defaultLocale}/auth/login`, // Foydalanuvchi login qilmagan bo‘lsa, shu sahifaga yo‘naltiriladi
    },
  },
);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1️⃣ Agar til yo'q bo'lsa, default til qo'shish
  const hasLocale = localeConfig.locales.some((locale) =>
    pathname.startsWith(`/${locale}`),
  );
  if (!hasLocale) {
    return intlMiddleware(req);
  }

  // 2️⃣ Agar route public bo'lsa ("/auth/login" yoki "/en"), faqat intlMiddleware ishlatish
  if (publicRoutes.test(pathname)) {
    return intlMiddleware(req);
  }

  // 3️⃣ Agar route private bo'lsa, autentifikatsiyani tekshirish
  return (authMiddleware as any)(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Middleware faqat sahifalar uchun ishlaydi
};
