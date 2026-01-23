import { PrismaPg } from "@prisma/adapter-pg";
import * as argon2 from "argon2";
import {
  MediaType,
  PrismaClient,
  WatchStatus,
} from "./generated/client/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
  log: ["query", "info", "warn", "error"],
});

async function main() {
  console.log("🌱 Début du seeding...");

  await prisma.comment.deleteMany();
  await prisma.userMedia.deleteMany();
  await prisma.media.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Base de données nettoyée.");

  const passwordHash = await argon2.hash("Password123!");

  const admin = await prisma.user.create({
    data: {
      email: "admin@mediatracker.com",
      username: "AdminUser",
      passwordHash,
      role: "ADMIN",
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      username: "JohnDoe",
      passwordHash,
    },
  });

  console.log("👤 Utilisateurs créés.");

  const arcane = await prisma.media.create({
    data: {
      tvdbId: "385687",
      title: "Arcane",
      originalTitle: "Arcane",
      synopsis:
        "Au milieu du conflit entre les villes jumelles de Piltover et Zaun...",
      posterPath:
        "https://artworks.thetvdb.com/banners/v4/series/385687/posters/619c3cd366092.jpg",
      type: MediaType.SERIES,
      releaseDate: new Date("2021-11-06"),
      status: "Continuing",
      syncStatus: "READY",
    },
  });

  const inception = await prisma.media.create({
    data: {
      tvdbId: "166", // ID fictif pour l'exemple
      title: "Inception",
      originalTitle: "Inception",
      synopsis: "Dom Cobb est un voleur expérimenté...",
      type: MediaType.MOVIE,
      releaseDate: new Date("2010-07-16"),
      status: "Released",
      syncStatus: "READY",
    },
  });

  console.log("🎬 Médias créés.");

  await prisma.userMedia.create({
    data: {
      userId: admin.id,
      mediaId: arcane.id,
      status: WatchStatus.COMPLETED,
      rating: 10,
    },
  });

  await prisma.userMedia.create({
    data: {
      userId: user1.id,
      mediaId: inception.id,
      status: WatchStatus.PLAN_TO_WATCH,
    },
  });

  console.log("📚 Collections peuplées.");

  await prisma.comment.create({
    data: {
      content: "C'est un chef d'œuvre absolu, l'animation est dingue !",
      containsSpoiler: false,
      userId: admin.id,
      mediaId: arcane.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "Attention à la fin de la saison 1...",
      containsSpoiler: true,
      userId: user1.id,
      mediaId: arcane.id,
    },
  });

  console.log("💬 Commentaires ajoutés.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
