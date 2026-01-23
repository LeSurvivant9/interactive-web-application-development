import { HttpService } from "@nestjs/axios";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Cache } from "cache-manager";
import { firstValueFrom } from "rxjs";
import { MediaType } from "../../prisma/generated/client/enums";
import { TvdbMediaDetails } from "./models/tvdb.model";
import {
  TvdbArtwork,
  TvdbGenre,
  TvdbLoginResponse,
  TvdbMediaDetailsResponse,
  TvdbMediaDetailsResponseItem,
  TvdbPopularResponse,
  TvdbPopularResponseItem,
  TvdbSearchResponse,
  TvdbSearchResponseItem,
  TvdbSearchResult,
  TvdbTranslation,
} from "./tvdb.types";

@Injectable()
export class TvdbService implements OnModuleInit {
  private readonly logger = new Logger(TvdbService.name);
  private readonly baseUrl = "https://api4.thetvdb.com/v4";
  private readonly artworkUrl = "https://artworks.thetvdb.com";
  private token: string | null = null;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async onModuleInit() {
    await this.login();
  }

  private async login() {
    try {
      const apiKey = this.configService.get<string>("TVDB_API_KEY");
      const url = `${this.baseUrl}/login`;

      const response = await firstValueFrom(
        this.httpService.post<TvdbLoginResponse>(url, { apikey: apiKey }),
      );

      this.token = response.data.data.token;
      this.logger.log("✅ Authentification TVDB réussie");
    } catch (error) {
      this.logger.error("❌ Échec de l'authentification TVDB", error);
    }
  }

  private normalizeImageUrl(url: string | null | undefined): string | null {
    if (!url) {
      return null;
    }
    if (url.startsWith("http")) {
      return url;
    }
    return `${this.artworkUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  }

  private async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cached = await this.cacheManager.get<T>(key);
    if (cached) {
      return cached;
    }

    const result = await factory();

    if (result) {
      await this.cacheManager.set(key, result, ttl);
    }

    return result;
  }

  /**
   * Recherche un film ou une série sur TVDB
   * @param query Le texte entré dans la barre de recherche
   */
  async search(query: string): Promise<TvdbSearchResult[]> {
    return this.getOrSet(`tvdb_search_${query}`, async () => {
      if (!this.token) {
        await this.login();
      }

      const encodedQuery = encodeURIComponent(query);
      const url = `${this.baseUrl}/search?query=${encodedQuery}`;

      try {
        const response = await firstValueFrom(
          this.httpService.get<TvdbSearchResponse>(url, {
            headers: { Authorization: `Bearer ${this.token}` },
          }),
        );

        return (response.data.data || []).map(
          (item: TvdbSearchResponseItem) => ({
            ...item,
            image_url: this.normalizeImageUrl(item.image_url || item.image),
            tvdb_id: (item.tvdb_id || item.id || "").toString(),
            year: item.year || item.first_air_time?.split("-")[0] || "",
          }),
        ) as TvdbSearchResult[];
      } catch (error) {
        this.logger.error(`Erreur recherche TVDB pour : "${query}"`, error);
        return [];
      }
    });
  }

  /**
   * Récupère les détails complets d'un média pour insertion en BDD
   */
  async getMediaDetails(
    tvdbId: string,
    type: MediaType,
  ): Promise<TvdbMediaDetails> {
    return this.getOrSet(`tvdb_details_${type}_${tvdbId}`, async () => {
      if (!this.token) {
        await this.login();
      }

      const endpoint = type === MediaType.MOVIE ? "movies" : "series";
      const url = `${this.baseUrl}/${endpoint}/${tvdbId}/extended`;

      try {
        const item = await this.fetchExtendedDetails(url);

        return {
          tvdb_id: item.id.toString(),
          name: this.extractTranslatedName(item),
          original_name: item.originalName || item.name || "",
          image_url: item.image || null,
          banner_url: this.extractBannerUrl(item),
          overview: this.extractTranslatedOverview(item),
          type: type,
          year: this.extractYear(item),
          release_date: item.firstAired ? new Date(item.firstAired) : null,
          status: item.status?.name || null,
          runtime: item.runtime || null,
          genres: this.mapGenres(item.genres),
        };
      } catch (error) {
        this.logger.error(`Erreur getMediaDetails pour ${tvdbId}`, error);
        throw error;
      }
    });
  }

  private async fetchExtendedDetails(
    url: string,
  ): Promise<TvdbMediaDetailsResponseItem> {
    const { data } = await firstValueFrom(
      this.httpService.get<TvdbMediaDetailsResponse>(url, {
        headers: { Authorization: `Bearer ${this.token}` },
      }),
    );
    return data.data;
  }

  private extractYear(item: TvdbMediaDetailsResponseItem): string {
    return item.year || item.firstAired?.split("-")[0] || "";
  }

  private mapGenres(genres?: TvdbGenre[]): { id: number; name: string }[] {
    return (
      genres?.map((g: TvdbGenre) => ({
        id: g.id || 0,
        name: g.name || "",
      })) || []
    );
  }

  private extractTranslatedName(item: TvdbMediaDetailsResponseItem): string {
    const frTitleObj = item.translations?.nameTranslations?.find(
      (t: TvdbTranslation) => t.language === "fra",
    );
    return frTitleObj?.name || item.name || "Titre inconnu";
  }

  private extractTranslatedOverview(
    item: TvdbMediaDetailsResponseItem,
  ): string {
    const frOverviewObj = item.translations?.overviewTranslations?.find(
      (t: TvdbTranslation) => t.language === "fra",
    );
    return frOverviewObj?.overview || item.overview || "";
  }

  private extractBannerUrl(item: TvdbMediaDetailsResponseItem): string | null {
    return (
      item.artworks?.find((a: TvdbArtwork) => a.type === 2 || a.type === 3)
        ?.image ||
      item.image ||
      null
    );
  }

  /**
   * Récupère les films populaires (Top 20)
   */
  async getPopularMovies(): Promise<TvdbSearchResult[]> {
    return this.getOrSet("tvdb_popular_movies", async () => {
      if (!this.token) {
        await this.login();
      }

      const url = `${this.baseUrl}/movies/filter?sortType=desc&sort=score`;

      try {
        const response = await firstValueFrom(
          this.httpService.get<TvdbPopularResponse>(url, {
            headers: { Authorization: `Bearer ${this.token}` },
          }),
        );
        return (response.data.data || [])
          .slice(0, 20)
          .map((item: TvdbPopularResponseItem) => ({
            tvdb_id: item.id.toString(),
            name: item.name || item.translations?.fra || "Titre inconnu",
            image_url: this.normalizeImageUrl(item.image),
            overview: item.overview || "",
            type: "movie",
            year: item.year || "",
          }));
      } catch (error) {
        this.logger.error("Erreur getPopularMovies", error);
        return [];
      }
    });
  }

  /**
   * Récupère les séries populaires (Top 20)
   */
  async getPopularSeries(): Promise<TvdbSearchResult[]> {
    return this.getOrSet("tvdb_popular_series", async () => {
      if (!this.token) {
        await this.login();
      }

      const url = `${this.baseUrl}/series/filter?sortType=desc&sort=score`;

      try {
        const response = await firstValueFrom(
          this.httpService.get<TvdbPopularResponse>(url, {
            headers: { Authorization: `Bearer ${this.token}` },
          }),
        );

        return (response.data.data || [])
          .slice(0, 20)
          .map((item: TvdbPopularResponseItem) => ({
            tvdb_id: item.id.toString(),
            name: item.name || item.translations?.fra || "Titre inconnu",
            image_url: this.normalizeImageUrl(item.image),
            overview: item.overview || "",
            type: "series",
            year: item.year || "",
          }));
      } catch (error) {
        this.logger.error("Erreur getPopularSeries", error);
        return [];
      }
    });
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
