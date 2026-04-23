import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from '../services/movie-api.service';
import { StorageService } from '../services/storage.service';
import { DatePipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonImg, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButtons,  NgFor, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonImg, DatePipe, RouterLink, IonButtons]
})
export class HomePage implements OnInit {

  movies: any[] = [];
  status: any;

  constructor(
    private movieApi: MovieApiService,
    private storage: StorageService,
    private router: Router
  ) {}

  favourites: any[] = [];

async ngOnInit() {
  this.movieApi.getTrendingMovies().subscribe((result: any) => {
    this.movies = result.results;
  });

  this.favourites = await this.storage.get('favourites') || [];
}


  openDetails(id: number) {
    this.router.navigate(['/movie-details', id]);
  }
  openMovie(movie: any) {
  this.router.navigate(['/movie', movie.id]);
}
async addToFavourites(movie: any) {
  let favs = await this.storage.get('favourites') || [];

  if (!favs.find((m: any) => m.id === movie.id)) {
    favs.push({
      ...movie,
      year: movie.release_date?.split('-')[0]
    });
  }

  await this.storage.set('favourites', favs);
  this.favourites = favs;
}

isFavourite(id: number): boolean {
  return this.favourites?.some((m: any) => m.id === id);
}
async removeFromFavourites(id: number) {
  let favs = await this.storage.get('favourites') || [];

  favs = favs.filter((m: any) => m.id !== id);

  await this.storage.set('favourites', favs);
  this.favourites = favs; 
}

}