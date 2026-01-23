import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDicebearAvatar } from "@/lib/dicebear";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user:
    | {
        id: string;
        name?: string | null;
      }
    | null
    | undefined;
  className?: string;
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  if (!user) {
    return null;
  }

  const avatarSource = getDicebearAvatar(user.id);
  const name = user.name ?? "";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <Avatar className={cn("h-10 w-10 border border-muted", className)}>
      <AvatarImage src={avatarSource} alt={name} className="object-cover" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
