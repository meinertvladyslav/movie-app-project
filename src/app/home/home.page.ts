import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from '../services/movie-api.service';
import { StorageService } from '../services/storage.service';
import { DatePipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonImg, IonButtons, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonButtons,  NgFor, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonImg, DatePipe, RouterLink, IonButtons, IonSelect, IonSelectOption ]
})
export class HomePage implements OnInit {

  movies: any[] = [];
  status: any;
  filteredMovies: any[] = [];
  years: number[] = [];
  selectedYear: string = '';

  constructor(
    private movieApi: MovieApiService,
    private storage: StorageService,
    private router: Router
  ) {}

  favourites: any[] = [];
search(event: any) {
  const query = event.target.value.toLowerCase();

  if (!query) {
    this.filteredMovies = this.movies;
    return;
  }

  this.filteredMovies = this.movies.filter(movie =>
    movie.title.toLowerCase().includes(query)
  );
}
async ngOnInit() {
  const currentYear = new Date().getFullYear();
  this.years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  this.movieApi.getTrendingMovies().subscribe((result: any) => {
    this.movies = result.results;
    this.filteredMovies = result.results;
  });

  this.favourites = await this.storage.get('favourites') || [];
}
filterByYear(event: any) {
  const year = event.detail.value;

  if (!year) {
    this.filteredMovies = this.movies;
    return;
  }

  this.filteredMovies = this.movies.filter(movie =>
    movie.release_date?.startsWith(year.toString())
  );
}


  openDetails(id: number) {
    this.router.navigate(['/movie-details', id]);
  }
  async openMovie(movie: any) {
  let visited = await this.storage.get('visited') || [];

  if (!visited.find((m: any) => m.id === movie.id)) {
    visited.unshift({
      ...movie,
      year: movie.release_date?.split('-')[0]
    });
  }

  visited = visited.slice(0, 20);

  await this.storage.set('visited', visited);

  this.router.navigate(['/movie', movie.id]);
}

async addToFavourites(movie: any) {
  let favs = await this.storage.get('favourites') || [];

  if (!favs.find((m: any) => m.id === movie.id)) {
    favs.push({ ...movie,
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