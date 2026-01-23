export interface TvdbSearchResult {
  tvdb_id: string;
  name: string;
  image_url: string | null;
  overview: string;
  type: "movie" | "series";
  year: string;
}

export interface TvdbLoginResponse {
  data: {
    token: string;
  };
}

export interface TvdbSearchResponseItem {
  objectID?: string;
  id?: number;
  image_url?: string;
  image?: string;
  tvdb_id?: number | string;
  year?: string;
  first_air_time?: string;
  type?: string;
}

export interface TvdbSearchResponse {
  data: TvdbSearchResponseItem[];
}

export interface TvdbTranslation {
  name?: string;
  overview?: string;
  language?: string;
}

export interface TvdbArtwork {
  id?: number;
  image?: string;
  type?: number;
}

export interface TvdbGenre {
  id?: number;
  name?: string;
}

export interface TvdbStatus {
  id?: number;
  name?: string;
}

export interface TvdbMediaDetailsResponseItem {
  id: number;
  name?: string;
  originalName?: string;
  image?: string;
  overview?: string;
  year?: string;
  firstAired?: string;
  runtime?: number;
  score?: number;
  status?: TvdbStatus;
  genres?: TvdbGenre[];
  translations?: {
    nameTranslations?: TvdbTranslation[];
    overviewTranslations?: TvdbTranslation[];
  };
  artworks?: TvdbArtwork[];
}

export interface TvdbMediaDetailsResponse {
  data: TvdbMediaDetailsResponseItem;
}

export interface TvdbPopularResponseItem {
  id: number;
  name?: string;
  translations?: {
    fra?: string;
  };
  image?: string;
  overview?: string;
  year?: string;
}

export interface TvdbPopularResponse {
  data: TvdbPopularResponseItem[];
}
