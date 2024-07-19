import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'src/app/services/tmdb-api.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass']
})
export class MovieComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private tmdbApiService: TmdbApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = +params['id'];
      this.tmdbApiService.getMovieDetails(movieId).subscribe(data => {
        this.movie = data;
      }, error => {
        console.error('Erro ao buscar detalhes do filme:', error);
      });
    });
  }
}
