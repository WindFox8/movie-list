import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'src/app/services/tmdb-api.service';
import { switchMap } from 'rxjs/operators';
import { Movie, PaginatedResponse } from 'src/app/interfaces/imdb-interfaces';

@Component({
  selector: 'app-genre-content',
  templateUrl: './genre-content.component.html',
  styleUrls: ['./genre-content.component.sass']
})
export class GenreContentComponent implements OnInit {
  movies: Movie[] = [];
  genreId: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private route: ActivatedRoute,
    private tmdbApiService: TmdbApiService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.genreId = +params['id'];
        this.currentPage = 1;
        this.movies = []; // Clear current movies list
        return this.tmdbApiService.getMoviesByCategory(this.genreId, this.currentPage);
      })
    ).subscribe((data: PaginatedResponse<Movie>) => {
      this.movies = data.results;
      this.totalPages = data.total_pages;
    }, error => {
      console.error('Erro ao buscar filmes por gênero:', error);
    });
  }

  loadMovies(page: number = 1): void {
    this.tmdbApiService.getMoviesByCategory(this.genreId, page).subscribe((data: PaginatedResponse<Movie>) => {
      this.movies = [...this.movies, ...data.results];
      this.totalPages = data.total_pages;
    }, error => {
      console.error('Erro ao buscar filmes por gênero:', error);
    });
  }

  loadMore(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMovies(this.currentPage);
    }
  }
}
