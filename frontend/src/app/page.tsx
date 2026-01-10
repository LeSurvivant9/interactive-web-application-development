import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar simple pour la landing */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link
          className="flex items-center justify-center font-bold text-xl"
          href="#"
        >
          MediaTracker
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 flex items-center"
            href="/auth/login"
          >
            Connexion
          </Link>
          <Link href="/auth/register">
            <Button size="sm">S'inscrire</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Ne perdez plus le fil de vos séries.
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Suivez vos films, séries et animés préférés. Découvrez de
                  nouvelles pépites et partagez vos listes.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth/register">
                  <Button className="h-11 px-8">Commencer maintenant</Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" className="h-11 px-8">
                    J'ai déjà un compte
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2026 MediaTracker. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
