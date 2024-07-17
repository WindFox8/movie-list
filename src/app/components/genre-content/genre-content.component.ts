import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'src/app/services/tmdb-api.service';

@Component({
  selector: 'app-genre-content',
  templateUrl: './genre-content.component.html',
  styleUrls: ['./genre-content.component.sass']
})
export class GenreContentComponent implements OnInit {
  movies: any[] = [];
  genreId: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private route: ActivatedRoute,
    private tmdbApiService: TmdbApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genreId = +params['id'];
      this.loadMovies();
    });
  }

  loadMovies(page: number = 1): void {
    this.tmdbApiService.getMoviesByCategory(this.genreId, page).subscribe(data => {
      this.movies = [...this.movies, ...data.results]; // Append new movies to the existing list
      this.totalPages = data.total_pages; // Update the total number of pages
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
