import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TmdbApiService } from './tmdb-api.service';
import { PaginatedResponse, GenresResponse, Movie, Genre } from 'src/app/interfaces/imdb-interfaces';

describe('TmdbApiService', () => {
  let service: TmdbApiService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'https://api.themoviedb.org/3';
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmI4ZGYyNWJiNzA4ZGVhZjlkNTY3MTJhMDZiMjhjZCIsIm5iZiI6MTcyMDkyMDAwNC4wMjc0MzgsInN1YiI6IjY2OGJmMGVmYWYzNGE5NDExYWU1ZDkyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dZiBFyX59MzVClK9PhGJJFoYKIWO3Z9QaxvC4A1q2H8';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TmdbApiService]
    });
    service = TestBed.inject(TmdbApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get top rated movies', () => {
    const mockResponse: PaginatedResponse<Movie> = { page: 1, results: [{ id: 1, title: 'Movie 1', overview: '', release_date: '', poster_path: '' }, { id: 2, title: 'Movie 2', overview: '', release_date: '', poster_path: '' }], total_pages: 1, total_results: 2 };

    service.getTopRatedMovies().subscribe((movies) => {
      expect(movies.results.length).toBe(2);
      expect(movies.results[0].title).toBe('Movie 1');
    });

    const req = httpTestingController.expectOne(`${apiUrl}/movie/top_rated`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    req.flush(mockResponse);
  });

  it('should get genres', () => {
    const mockResponse: GenresResponse = { genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Comedy' }] };

    service.getGenres().subscribe((genres) => {
      expect(genres.genres.length).toBe(2);
      expect(genres.genres[0].name).toBe('Action');
    });

    const req = httpTestingController.expectOne(`${apiUrl}/genre/movie/list`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    req.flush(mockResponse);
  });

  it('should get top movies of the week', () => {
    const mockResponse: PaginatedResponse<Movie> = { page: 1, results: [{ id: 1, title: 'Trending Movie 1', overview: '', release_date: '', poster_path: '' }], total_pages: 1, total_results: 1 };

    service.getTopMoviesOfWeek().subscribe((movies) => {
      expect(movies.results.length).toBe(1);
      expect(movies.results[0].title).toBe('Trending Movie 1');
    });

    const req = httpTestingController.expectOne(`${apiUrl}/trending/movie/week`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    req.flush(mockResponse);
  });

  it('should get latest movies', () => {
    const mockResponse: PaginatedResponse<Movie> = { page: 1, results: [{ id: 1, title: 'Latest Movie 1', overview: '', release_date: '', poster_path: '' }], total_pages: 1, total_results: 1 };

    service.getLatestMovies().subscribe((movies) => {
      expect(movies.results.length).toBe(1);
      expect(movies.results[0].title).toBe('Latest Movie 1');
    });

    const req = httpTestingController.expectOne(`${apiUrl}/movie/now_playing`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    req.flush(mockResponse);
  });

  it('should search movies', () => {
    const query = 'test';
    const mockResponse: PaginatedResponse<Movie> = { page: 1, results: [{ id: 1, title: 'Search Movie 1', overview: '', release_date: '', poster_path: '' }], total_pages: 1, total_results: 1 };

    service.searchMovies(query).subscribe((movies) => {
      expect(movies.results.length).toBe(1);
      expect(movies.results[0].title).toBe('Search Movie 1');
    });

    const req = httpTestingController.expectOne(`${apiUrl}/search/movie?query=${query}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    req.flush(mockResponse);
  });

  it('should get movie details', () => {
    const movieId = 1;
    const mockResponse: Movie = { id: movieId, title: 'Movie 1', overview: 'Overview of Movie 1', release_date: '', poster_path: '' };

    service.getMovieDetails(movieId).subscribe((movie) => {
      expect(movie.title).toBe('Movie 1');
      expect(movie.overview).toBe('Overview of Movie 1');
    });

    const req = httpTestingController.expectOne(`${apiUrl}/movie/${movieId}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    req.flush(mockResponse);
  });
});
