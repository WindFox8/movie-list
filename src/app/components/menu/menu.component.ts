
import { Component, OnInit } from '@angular/core';
import { TmdbApiService } from 'src/app/services/tmdb-api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  genres: any[] = [];

  constructor(private tmdbApiService: TmdbApiService) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.tmdbApiService.getGenres().subscribe(data => {
      console.log(data); // Adicione isso para verificar a resposta
      this.genres = data.genres;
    }, error => {
      console.error('Erro ao buscar gêneros:', error); // Para capturar erros
    });
  }
}
