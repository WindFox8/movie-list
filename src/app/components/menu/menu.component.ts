import { Component, OnInit } from '@angular/core';
import { TmdbApiService } from 'src/app/services/tmdb-api.service';
import { Genre, GenresResponse } from 'src/app/interfaces/imdb-interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  genres: Genre[] = [];

  constructor(private tmdbApiService: TmdbApiService) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.tmdbApiService.getGenres().subscribe((data: GenresResponse) => {
      this.genres = data.genres;
    }, error => {
      console.error('Erro ao buscar gêneros:', error);
    });
  }
}