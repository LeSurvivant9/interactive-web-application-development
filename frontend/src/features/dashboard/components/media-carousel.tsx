"use client";

import { Film, Tv } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MediaItem {
  tvdb_id?: string | null;
  name: string;
  image_url?: string | null;
  type?: string | null;
  year?: string | null;
}

interface MediaCarouselProps {
  title: string;
  items: MediaItem[];
}

export function MediaCarousel({ title, items }: MediaCarouselProps) {
  return (
    <div className="space-y-4 py-4">
      <h2 className="px-4 text-2xl font-bold tracking-tight md:px-0">
        {title}
      </h2>

      <div className="relative">
        <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:px-0 px-4 scrollbar-hide">
          {items.map((item) => (
            <Link
              key={item.tvdb_id}
              href={`/media/${item.type}/${item.tvdb_id}`}
              className="group relative w-37.5 shrink-0 snap-start overflow-hidden rounded-lg border bg-background transition-all hover:scale-105 hover:shadow-lg md:w-[180px]"
            >
              <div className="aspect-2/3 w-full overflow-hidden bg-muted">
                {item.image_url ? (
                  <Image
                    width={150}
                    height={225}
                    src={item.image_url}
                    alt={item.name}
                    className="h-full w-full object-cover transition-all group-hover:opacity-90"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    {item.type === "movie" ? (
                      <Film className="h-8 w-8" />
                    ) : (
                      <Tv className="h-8 w-8" />
                    )}
                  </div>
                )}
              </div>

              <div className="p-3">
                <h3
                  className="truncate text-sm font-medium leading-none"
                  title={item.name}
                >
                  {item.name}
                </h3>
                {item.year && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.year}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
