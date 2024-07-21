import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'src/app/services/tmdb-api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass']
})
export class MovieComponent implements OnInit {
  movie: any;
  cast: any[] = [];
  crew: any[] = [];

  @ViewChild('castTrack') castTrack!: ElementRef;
  @ViewChild('crewTrack') crewTrack!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private tmdbApiService: TmdbApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = +params['id'];
      this.loadMovieDetails(movieId);
    });
  }

  loadMovieDetails(id: number): void {
    this.tmdbApiService.getMovieDetails(id).subscribe(data => {
      this.movie = data;
    });

    this.tmdbApiService.getMovieCredits(id).subscribe(data => {
      this.cast = data.cast.slice(0, 10);
      this.crew = data.crew.slice(0, 6);
    });
  }

  nextSlide(type: string): void {
    const track = type === 'cast' ? this.castTrack.nativeElement : this.crewTrack.nativeElement;
    const slideWidth = track.querySelector('.carousel-slide').offsetWidth;
    track.scrollBy({ left: slideWidth, behavior: 'smooth' });
  }

  prevSlide(type: string): void {
    const track = type === 'cast' ? this.castTrack.nativeElement : this.crewTrack.nativeElement;
    const slideWidth = track.querySelector('.carousel-slide').offsetWidth;
    track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  }
}
