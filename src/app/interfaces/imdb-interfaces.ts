export interface Genre {
  id: number;
  name: string;
}

export interface Country {
  iso_3166_1: string;
  name: string;
}

export interface Company {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number; 
  vote_count: number;
  genres: Genre[];                   
  runtime: number;                  
  original_title: string;           
  original_language: string;         
  budget: number;                   
  revenue: number;                   
  production_countries: Country[];   
  production_companies: Company[]; 
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
