"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AddToCollectionDocument,
  GetCollectionEntryDocument,
  IMediaType,
  IWatchStatus,
  RemoveFromCollectionDocument,
} from "@/graphql/generated";

interface AddToCollectionButtonProps {
  tvdbId: string;
  type: IMediaType;
  title: string;
}

export function AddToCollectionButton({
  tvdbId,
  type,
  title,
}: AddToCollectionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { data: queryData, loading: queryLoading } = useQuery(
    GetCollectionEntryDocument,
    {
      variables: { tvdbId },
    },
  );

  const [addToCollection, { loading: addLoading }] = useMutation(
    AddToCollectionDocument,
    {
      refetchQueries: [
        { query: GetCollectionEntryDocument, variables: { tvdbId } },
      ],
    },
  );

  const [removeFromCollection, { loading: removeLoading }] = useMutation(
    RemoveFromCollectionDocument,
    {
      refetchQueries: [
        { query: GetCollectionEntryDocument, variables: { tvdbId } },
      ],
    },
  );

  const isAdded = !!queryData?.collectionEntry;
  const isLoading = queryLoading || addLoading || removeLoading;

  const handleAction = async () => {
    try {
      if (isAdded) {
        await removeFromCollection({ variables: { tvdbId } });
        toast.success(`${title} retiré de votre liste.`);
      } else {
        await addToCollection({
          variables: {
            input: { tvdbId, type, status: IWatchStatus.PlanToWatch },
          },
        });
        toast.success(`${title} ajouté à votre liste !`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue.");
    }
  };

  const variant = !isAdded
    ? "default"
    : isHovered
      ? "destructive"
      : "secondary";

  return (
    <Button
      onClick={handleAction}
      disabled={isLoading}
      variant={variant}
      className="w-full sm:w-[200px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ButtonContent
        isLoading={isLoading}
        isAdded={isAdded}
        isHovered={isHovered}
      />
    </Button>
  );
}

interface ButtonContentProps {
  isLoading: boolean;
  isAdded: boolean;
  isHovered: boolean;
}

function ButtonContent({ isLoading, isAdded, isHovered }: ButtonContentProps) {
  if (isLoading) {
    return (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Chargement...
      </>
    );
  }

  if (isAdded) {
    return isHovered ? (
      <>
        <Trash2 className="mr-2 h-4 w-4" />
        Supprimer
      </>
    ) : (
      <>
        <Check className="mr-2 h-4 w-4" />
        Dans la collection
      </>
    );
  }

  return (
    <>
      <Plus className="mr-2 h-4 w-4" />
      Ajouter à ma liste
    </>
  );
}
