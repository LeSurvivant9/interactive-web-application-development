"use client";
import { useQuery } from "@apollo/client/react";
import { Calendar, Film, Loader2, Tv } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SearchDocument } from "@/graphql/generated";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

export function GlobalSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  const { data, loading, error } = useQuery(SearchDocument, {
    variables: { query: debouncedQuery },
    skip: debouncedQuery.length < 3,
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (id: string, type: string) => {
    setOpen(false);
    router.push(`/media/${type}/${id}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Rechercher...</span>
        <span className="inline-flex lg:hidden">Rechercher...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="[&>div]:max-w-3xl [&>div]:max-h-150"
      >
        <CommandInput
          placeholder="Rechercher un film ou une série..."
          value={query}
          onValueChange={setQuery}
          className="text-lg h-14"
        />
        <CommandList className="max-h-125">
          {loading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {!loading &&
            data?.searchMedia?.length === 0 &&
            debouncedQuery.length >= 3 && (
              <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            )}

          {data?.searchMedia && data.searchMedia.length > 0 && (
            <CommandGroup heading="Résultats">
              {data.searchMedia.map((media) => (
                <CommandItem
                  key={media.tvdb_id}
                  value={`${media.name} ${media.tvdb_id}`}
                  onSelect={() =>
                    handleSelect(media.tvdb_id || "", media.type || "unknown")
                  }
                  className="flex cursor-pointer items-start gap-4 p-4 aria-selected:bg-accent"
                >
                  <div className="relative aspect-2/3 w-20 shrink-0 overflow-hidden rounded-md bg-muted shadow-md sm:w-24">
                    {media.image_url ? (
                      <Image
                        width={128}
                        height={128}
                        src={media.image_url}
                        alt={media.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                        {media.type === "movie" ? (
                          <Film className="h-4 w-4" />
                        ) : (
                          <Tv className="h-4 w-4" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold leading-none tracking-tight">
                        {media.name}
                      </h4>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                          media.type === "movie"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
                        )}
                      >
                        {media.type === "series" ? "Série TV" : "Film"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{media.year || "Année inconnue"}</span>
                    </div>
                    {media.overview && (
                      <p className="mt-1 line-clamp-3 text-sm text-muted-foreground/80 leading-relaxed">
                        {media.overview}
                      </p>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
