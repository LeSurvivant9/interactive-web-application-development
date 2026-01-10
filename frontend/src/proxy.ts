import { NextResponse } from "next/server";
import { auth } from "@/auth";

const publicRoutes = [
  "/", // Landing page
  "/auth/login", // Page de connexion
  "/auth/register", // Page d'inscription
];
const apiAuthPrefix = "/api/auth";
const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isPublicRoute) {
    if (isLoggedIn && nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return; // Laisser passer
  }

  // CAS 3 : Tout le reste (Routes Privées par défaut)
  // Si on n'est pas connecté et que ce n'est pas une route publique -> Redirect Login
  if (!isLoggedIn) {
    // On peut passer l'URL demandée en callback pour le rediriger après login (UX)
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  // Si connecté et route privée -> OK
  return;
});

// Configuration du matcher pour ignorer les fichiers statiques et internes
export const config = {
  matcher: [
    // Exclut les fichiers statiques (_next, images, favicon)
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
