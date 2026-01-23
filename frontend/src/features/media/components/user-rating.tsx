"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  GetCollectionEntryDocument,
  RateMediaDocument,
} from "@/graphql/generated";
import { cn } from "@/lib/utils";

interface UserRatingProps {
  tvdbId: string;
}

export function UserRating({ tvdbId }: UserRatingProps) {
  const { data } = useQuery(GetCollectionEntryDocument, {
    variables: { tvdbId },
  });

  const [rateMedia, { loading }] = useMutation(RateMediaDocument, {
    refetchQueries: ["GetCollectionEntry"],
  });

  const currentRating = data?.collectionEntry?.rating || 0;
  const isInCollection = !!data?.collectionEntry;

  const [hoverRating, setHoverRating] = useState(0);

  const handleRate = async (score: number) => {
    if (!isInCollection) {
      return;
    }

    const newRating = score === currentRating ? 0 : score;

    try {
      await rateMedia({
        variables: { tvdbId, rating: newRating },
      });
      toast.success(newRating === 0 ? "Note retirée" : `Noté ${newRating}/10`);
    } catch {
      toast.error("Erreur lors de la notation");
    }
  };

  if (!isInCollection) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Label
        className="text-sm font-medium text-muted-foreground"
        id="rating-label"
      >
        Votre note
      </Label>
      <div
        className="flex items-center"
        onMouseLeave={() => setHoverRating(0)}
        role="toolbar"
        aria-labelledby="rating-label"
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = (hoverRating || currentRating) >= star;

          return (
            <div key={star} className="flex flex-col items-center">
              <Button
                disabled={loading}
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHoverRating(star)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 focus:outline-none transition-transform hover:scale-110 hover:bg-transparent"
                type="button"
              >
                <Star
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isFilled
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-transparent text-muted-foreground/30 hover:text-yellow-400",
                  )}
                />
              </Button>
              <span className="text-[10px] text-muted-foreground select-none">
                {star}
              </span>
            </div>
          );
        })}

        {currentRating > 0 && (
          <span className="ml-2 text-sm font-bold text-yellow-500">
            {currentRating}/5
          </span>
        )}
      </div>
    </div>
  );
}
