import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../../prisma/generated/client/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(private configService: ConfigService) {
    const pool = new Pool({
      connectionString: configService.get<string>("DATABASE_URL"),
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    const url = this.configService.get<string>("DATABASE_URL");
    const safeUrl = url ? url.replace(/:([^:@]+)@/, ":****@") : "UNDEFINED";

    this.logger.log("🔌 Tentative de connexion Prisma...");
    this.logger.log(`🔍 DATABASE_URL vue par NestJS : ${safeUrl}`);

    try {
      await this.$connect();
      this.logger.log("✅ Connexion BDD réussie !");
    } catch (error) {
      this.logger.error("❌ Echec connexion BDD");
      this.logger.error(error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
