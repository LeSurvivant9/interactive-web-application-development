"use client";

import { useQuery } from "@apollo/client/react";
import { Calendar, Clock, Loader2 } from "lucide-react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { AddToCollectionButton } from "@/components/media/add-to-collection-button";
import { CommentsSection } from "@/components/media/comments-section";
import { UserRating } from "@/components/media/user-rating";
import {
  GetMediaDetailsDocument,
  IGetMediaDetailsQuery,
  IMediaType,
} from "@/graphql/generated";

function MediaLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-muted-foreground">Chargement des détails...</p>
    </div>
  );
}

function MediaError({ message }: { message?: string }) {
  return (
    <div className="container mx-auto py-10 text-center">
      <h2 className="text-2xl font-bold text-destructive">Erreur</h2>
      <p className="text-muted-foreground">{message || "Média introuvable"}</p>
    </div>
  );
}

function MediaDetails({
  media,
  mediaType,
  id,
}: {
  media: NonNullable<IGetMediaDetailsQuery["mediaDetails"]>;
  mediaType: IMediaType;
  id: string;
}) {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <Image
          width={200}
          height={200}
          src={media.image_url || "/placeholder-media.png"}
          alt={media.name}
          className="w-full rounded-lg shadow-lg border space-y-4"
        />

        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-4xl font-bold">{media.name}</h1>
            {media.original_name && media.original_name !== media.name && (
              <p className="text-xl text-muted-foreground italic">
                {media.original_name}
              </p>
            )}
            <AddToCollectionButton
              tvdbId={id}
              type={mediaType}
              title={media.name}
            />
            <UserRating tvdbId={media.tvdb_id} />
          </div>

          <div className="flex flex-wrap gap-4 items-center text-sm">
            {media.year && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{media.year}</span>
              </div>
            )}
            {media.runtime && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{media.runtime} min</span>
              </div>
            )}
            <span className="bg-primary/10 text-primary px-2 py-1 rounded uppercase font-semibold text-xs">
              {media.status}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {media.genres?.map((genre: { name: string }) => (
              <span
                key={genre.name}
                className="px-3 py-1 bg-secondary rounded-full text-xs"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Synopsis</h3>
            <p className="text-muted-foreground leading-relaxed">
              {media.overview || "Aucun synopsis disponible."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MediaDetailsPage() {
  const params = useParams();
  const type = params?.type as string;
  const id = params?.id as string;

  const mediaType =
    type === "movie"
      ? IMediaType.Movie
      : type === "series"
        ? IMediaType.Series
        : null;

  const { data, loading, error } = useQuery(GetMediaDetailsDocument, {
    variables: { tvdbId: id, type: mediaType as IMediaType },
    skip: !id || !mediaType,
  });

  if (!mediaType) {
    return notFound();
  }

  if (loading) {
    return <MediaLoading />;
  }

  if (error || !data?.mediaDetails) {
    return <MediaError message={error?.message} />;
  }

  return (
    <>
      <MediaDetails media={data.mediaDetails} mediaType={mediaType} id={id} />
      <CommentsSection tvdbId={data.mediaDetails.tvdb_id} type={mediaType} />
    </>
  );
}
