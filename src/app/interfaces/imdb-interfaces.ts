export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  cast_id: number;
  character: string;
  name: string;
  profile_path: string;
}

export interface CrewMember {
  department: string;
  job: string;
  name: string;
  profile_path: string;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface GenresResponse {
  genres: Genre[];
}