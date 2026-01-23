/**
 * Styles disponibles (populaires) :
 * - 'notionists' : Style dessiné type Notion
 * - 'lorelei' : Style artistique/cartoon
 * - 'adventurer' : Style RPG
 * - 'initials' : Juste les lettres
 * - 'bottts' : Robots
 */
type AvatarStyle =
  | "notionists"
  | "lorelei"
  | "adventurer"
  | "initials"
  | "bottts";

export function getDicebearAvatar(
  seed: string,
  style: AvatarStyle = "adventurer",
): string {
  const encodedSeed = encodeURIComponent(seed);

  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodedSeed}`;
}
