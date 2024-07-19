import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'src/app/services/tmdb-api.service';

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
    private tmdbApiService: TmdbApiService
  ) {}

  ngOnInit(): void {
    const movieId = +this.route.snapshot.paramMap.get('id')!;
    this.tmdbApiService.getMovieDetails(movieId).subscribe(data => {
      this.movie = data;
    });

    this.tmdbApiService.getMovieCredits(movieId).subscribe(data => {
      this.cast = data.cast;
      this.crew = data.crew;
    });
  }

  nextSlide(type: string): void {
    const track = type === 'cast' ? this.castTrack.nativeElement : this.crewTrack.nativeElement;
    const slideWidth = track.querySelector('.carousel-slide').offsetWidth;
    track.style.transform = `translateX(-${slideWidth}px)`;
  }

  prevSlide(type: string): void {
    const track = type === 'cast' ? this.castTrack.nativeElement : this.crewTrack.nativeElement;
    track.style.transform = `translateX(0px)`;
  }
}
