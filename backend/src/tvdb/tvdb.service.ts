import { HttpService } from "@nestjs/axios";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { TvdbSearchResult } from "./tvdb.interfaces";

@Injectable()
export class TvdbService implements OnModuleInit {
  private readonly logger = new Logger(TvdbService.name);
  private readonly baseUrl = "https://api4.thetvdb.com/v4";
  private token: string | null = null;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.login();
  }

  private async login() {
    try {
      const apiKey = this.configService.get<string>("TVDB_API_KEY");
      const url = `${this.baseUrl}/login`;

      const { data } = await firstValueFrom(
        this.httpService.post(url, { apikey: apiKey }),
      );

      this.token = data.data.token;
      this.logger.log("✅ Authentification TVDB réussie");
    } catch (error) {
      this.logger.error("❌ Échec de l'authentification TVDB", error);
    }
  }

  /**
   * Recherche un film ou une série sur TVDB
   * @param query Le texte entré dans la barre de recherche
   */
  async search(query: string): Promise<TvdbSearchResult[]> {
    if (!this.token) {
      await this.login();
    }

    const encodedQuery = encodeURIComponent(query);
    const url = `${this.baseUrl}/search?query=${encodedQuery}`;

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${this.token}` },
        }),
      );

      return data.data || [];
    } catch (error) {
      this.logger.error(`Erreur recherche TVDB pour : "${query}"`, error);
      return [];
    }
  }

  async checkConnection() {
    try {
      if (!this.token) {
        await this.login();
      }
      if (!this.token) {
        return false;
      }

      const url = `${this.baseUrl}/countries`;
      await firstValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${this.token}` },
        }),
      );
      return true;
    } catch (error) {
      this.logger.error("❌ Échec de la vérification de connexion TVDB", error);
      return false;
    }
  }
}
