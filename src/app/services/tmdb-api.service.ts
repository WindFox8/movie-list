import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Genre,
  Movie,
  MovieCredits,
  PaginatedResponse,
  GenresResponse
} from 'src/app/interfaces/imdb-interfaces';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmI4ZGYyNWJiNzA4ZGVhZjlkNTY3MTJhMDZiMjhjZCIsIm5iZiI6MTcyMDkyMDAwNC4wMjc0MzgsInN1YiI6IjY2OGJmMGVmYWYzNGE5NDExYWU1ZDkyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dZiBFyX59MzVClK9PhGJJFoYKIWO3Z9QaxvC4A1q2H8';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };

  constructor(private http: HttpClient) {}

  getTopRatedMovies(): Observable<PaginatedResponse<Movie>> {
    return this.http.get<PaginatedResponse<Movie>>(`${this.apiUrl}/movie/top_rated`, this.httpOptions);
  }

  getGenres(): Observable<GenresResponse> {
    return this.http.get<GenresResponse>(`${this.apiUrl}/genre/movie/list`, this.httpOptions);
  }

  getMoviesByCategory(genreId: number, page: number = 1): Observable<PaginatedResponse<Movie>> {
    return this.http.get<PaginatedResponse<Movie>>(`${this.apiUrl}/discover/movie?with_genres=${genreId}&page=${page}`, this.httpOptions);
  }

  searchMovies(query: string): Observable<PaginatedResponse<Movie>> {
    return this.http.get<PaginatedResponse<Movie>>(`${this.apiUrl}/search/movie?query=${query}`, this.httpOptions);
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${movieId}`, this.httpOptions);
  }

  getTopMoviesOfWeek(): Observable<PaginatedResponse<Movie>> {
    return this.http.get<PaginatedResponse<Movie>>(`${this.apiUrl}/trending/movie/week`, this.httpOptions);
  }

  getLatestMovies(): Observable<PaginatedResponse<Movie>> {
    return this.http.get<PaginatedResponse<Movie>>(`${this.apiUrl}/movie/now_playing`, this.httpOptions);
  }

  getMovieCredits(movieId: number): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(`${this.apiUrl}/movie/${movieId}/credits`, this.httpOptions);
  }
}
