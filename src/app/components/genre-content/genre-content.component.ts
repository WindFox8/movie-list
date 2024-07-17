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
  genreId!: number;

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

  loadMovies(): void {
    this.tmdbApiService.getMoviesByCategory(this.genreId).subscribe(data => {
      this.movies = data.results;
    }, error => {
      console.error('Erro ao buscar filmes por gênero:', error);
    });
  }
}
