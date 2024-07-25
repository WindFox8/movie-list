import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TmdbApiService } from 'src/app/services/tmdb-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  latestMovies: any[] = [];
  topMoviesOfWeek: any[] = [];
  topRatedMovies: any[] = [];

  @ViewChild('latestTrack', { static: false }) latestTrack!: ElementRef;
  @ViewChild('weekTrack', { static: false }) weekTrack!: ElementRef;
  @ViewChild('topRatedTrack', { static: false }) topRatedTrack!: ElementRef;

  constructor(private tmdbApiService: TmdbApiService) {}

  ngOnInit(): void {
    this.tmdbApiService.getLatestMovies().subscribe(data => {
      this.latestMovies = data.results;
    });

    this.tmdbApiService.getTopMoviesOfWeek().subscribe(data => {
      this.topMoviesOfWeek = data.results;
    });

    this.tmdbApiService.getTopRatedMovies().subscribe(data => {
      this.topRatedMovies = data.results;
    });
  }

  nextSlide(type: string): void {
    const track = this.getTrack(type).nativeElement;
    const slideWidth = track.querySelector('.carousel-slide').offsetWidth + 20; 
    const currentTransform = track.style.transform.replace(/[^-\d.]/g, '');
    const newTransform = currentTransform ? +currentTransform - slideWidth : -slideWidth;
    track.style.transform = `translateX(${newTransform}px)`;
  }

  prevSlide(type: string): void {
    const track = this.getTrack(type).nativeElement;
    const slideWidth = track.querySelector('.carousel-slide').offsetWidth + 20; 
    const currentTransform = track.style.transform.replace(/[^-\d.]/g, '');
    const newTransform = currentTransform ? +currentTransform + slideWidth : slideWidth;
    track.style.transform = `translateX(${newTransform}px)`;
  }

  private getTrack(type: string): ElementRef {
    switch (type) {
      case 'latest': return this.latestTrack;
      case 'week': return this.weekTrack;
      case 'topRated': return this.topRatedTrack;
      default: throw new Error('Invalid track type');
    }
  }
}
