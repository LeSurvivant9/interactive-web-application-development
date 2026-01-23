"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { AlertTriangle, Loader2, Pencil, Send, Trash2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/user-avatar";
import {
  AddCommentDocument,
  GetMediaCommentsDocument,
  IGetMediaCommentsQuery,
  IMediaType,
  RemoveCommentDocument,
  UpdateCommentDocument,
} from "@/graphql/generated";

interface CommentsSectionProps {
  tvdbId: string;
  type: IMediaType;
}

export function CommentsSection({ tvdbId, type }: CommentsSectionProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);

  const { data, loading } = useQuery(GetMediaCommentsDocument, {
    variables: { tvdbId },
    fetchPolicy: "cache-and-network",
  });

  const [addComment, { loading: submitting }] = useMutation(
    AddCommentDocument,
    {
      refetchQueries: ["GetMediaComments"],
    },
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Vous devez être connecté pour commenter");
      return;
    }
    if (content.trim().length < 3) {
      return;
    }

    try {
      await addComment({
        variables: {
          input: {
            tvdbId,
            type,
            content,
            containsSpoiler: isSpoiler,
          },
        },
      });
      setContent("");
      setIsSpoiler(false);
      toast.success("Commentaire publié !");
    } catch (error) {
      toast.error(`Erreur lors de l'envoi. ${error}`);
    }
  };

  return (
    <div className="mt-12 max-w-3xl space-y-8">
      <h3 className="text-2xl font-bold">Commentaires communautaires</h3>

      {session ? (
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Partagez votre avis..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-25"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="spoiler-mode"
                  checked={isSpoiler}
                  onCheckedChange={setIsSpoiler}
                />
                <Label
                  htmlFor="spoiler-mode"
                  className="flex items-center cursor-pointer"
                >
                  <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                  Contient des spoilers
                </Label>
              </div>
              <Button type="submit" disabled={submitting || content.length < 3}>
                {submitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Publier
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="rounded-lg border bg-muted p-4 text-center">
          <p className="text-muted-foreground">
            Connectez-vous pour laisser un commentaire.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-4">
            <Loader2 className="mx-auto animate-spin" />
          </div>
        ) : data?.mediaComments.length === 0 ? (
          <p className="text-center text-muted-foreground italic">
            Soyez le premier à commenter !
          </p>
        ) : (
          data?.mediaComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={session?.user?.id}
            />
          ))
        )}
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  currentUserId,
}: {
  comment: IGetMediaCommentsQuery["mediaComments"][0];
  currentUserId?: string;
}) {
  const [revealSpoiler, setRevealSpoiler] = useState(!comment.containsSpoiler);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const isOwner = currentUserId === comment.user.id;

  const [updateComment, { loading: updating }] = useMutation(
    UpdateCommentDocument,
    {
      refetchQueries: ["GetMediaComments"],
    },
  );

  const [removeComment, { loading: deleting }] = useMutation(
    RemoveCommentDocument,
    {
      refetchQueries: ["GetMediaComments"],
    },
  );

  const handleRemove = async () => {
    if (!confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
      return;
    }
    try {
      await removeComment({ variables: { commentId: comment.id } });
      toast.success("Commentaire supprimé");
    } catch {
      toast.error("Erreur suppression");
    }
  };

  const handleUpdate = async () => {
    if (editContent.trim().length < 3) {
      return;
    }
    try {
      await updateComment({
        variables: {
          commentId: comment.id,
          content: editContent,
          containsSpoiler: comment.containsSpoiler,
        },
      });
      setIsEditing(false);
      toast.success("Commentaire modifié");
    } catch {
      toast.error("Erreur modification");
    }
  };

  return (
    <div className="flex gap-4">
      <UserAvatar user={{ id: comment.user.id, name: comment.user.username }} />

      <div className="flex-1 space-y-1">
        <CommentHeader
          comment={comment}
          isOwner={isOwner}
          isEditing={isEditing}
          updating={updating}
          deleting={deleting}
          onEdit={() => setIsEditing(true)}
          onRemove={handleRemove}
        />

        {isEditing ? (
          <CommentEditForm
            editContent={editContent}
            setEditContent={setEditContent}
            updating={updating}
            onCancel={() => {
              setIsEditing(false);
              setEditContent(comment.content);
            }}
            onUpdate={handleUpdate}
          />
        ) : (
          <CommentContent
            comment={comment}
            revealSpoiler={revealSpoiler}
            onReveal={() => setRevealSpoiler(true)}
          />
        )}
      </div>
    </div>
  );
}

function CommentHeader({
  comment,
  isOwner,
  isEditing,
  updating,
  deleting,
  onEdit,
  onRemove,
}: {
  comment: IGetMediaCommentsQuery["mediaComments"][0];
  isOwner: boolean;
  isEditing: boolean;
  updating: boolean;
  deleting: boolean;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="font-semibold">{comment.user.username}</span>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(comment.postedAt), {
            addSuffix: true,
            locale: fr,
          })}
        </span>
        {comment.containsSpoiler && !isEditing && (
          <span className="text-[10px] bg-yellow-500/20 text-yellow-600 px-1.5 py-0.5 rounded font-medium uppercase">
            Spoiler
          </span>
        )}
      </div>

      {isOwner && !isEditing && (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-green-600"
            onClick={onEdit}
            disabled={updating || deleting}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Pencil className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Modifier commentaire</p>
              </TooltipContent>
            </Tooltip>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
            disabled={updating || deleting}
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Trash2 className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Supprimer commentaire</p>
                </TooltipContent>
              </Tooltip>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

function CommentEditForm({
  editContent,
  setEditContent,
  updating,
  onCancel,
  onUpdate,
}: {
  editContent: string;
  setEditContent: (val: string) => void;
  updating: boolean;
  onCancel: () => void;
  onUpdate: () => void;
}) {
  return (
    <div className="space-y-2 mt-2">
      <Textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        className="min-h-20"
      />
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={updating}
        >
          <X className="mr-2 h-3 w-3" /> Annuler
        </Button>
        <Button
          size="sm"
          onClick={onUpdate}
          disabled={updating || editContent.trim().length < 3}
        >
          {updating ? (
            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
          ) : (
            <Send className="mr-2 h-3 w-3" />
          )}
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

function CommentContent({
  comment,
  revealSpoiler,
  onReveal,
}: {
  comment: { content: string; containsSpoiler: boolean };
  revealSpoiler: boolean;
  onReveal: () => void;
}) {
  if (comment.containsSpoiler && !revealSpoiler) {
    return (
      <Button
        type="button"
        className="relative w-full text-left rounded-md bg-muted/50 p-3 text-sm transition-colors hover:bg-muted"
        onClick={onReveal}
      >
        <div className="blur-sm select-none">{comment.content}</div>

        <div className="absolute inset-0 flex items-center justify-center font-bold text-yellow-600/80">
          <div className="flex items-center bg-background/80 px-3 py-1 rounded-full shadow-sm">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Spoiler ! Cliquez pour voir
          </div>
        </div>
      </Button>
    );
  }

  return (
    <div className="rounded-md bg-muted/50 p-3 text-sm">{comment.content}</div>
  );
}
