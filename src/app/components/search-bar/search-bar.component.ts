import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TmdbApiService } from 'src/app/services/tmdb-api.service';
import { Movie, PaginatedResponse } from 'src/app/interfaces/imdb-interfaces';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent {
  query: string = '';
  movies: Movie[] = [];

  constructor(
    private tmdbApiService: TmdbApiService,
    private router: Router
  ) {}

  onSearch(event: any): void {
    const query = event.target.value.trim();
    if (query.length > 0) {
      this.tmdbApiService.searchMovies(query).subscribe((data: PaginatedResponse<Movie>) => {
        this.movies = data.results;
      });
    } else {
      this.movies = [];
    }
  }

  goToMovie(id: number): void {
    this.movies = [];
    this.query = '';
    this.router.navigate(['/movie', id]);
  }
}