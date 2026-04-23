import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonImg, IonCardHeader, IonCardTitle, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonImg, IonCardHeader, IonCardTitle, IonButtons, IonBackButton, CommonModule ]
})
export class FavouritesPage implements OnInit {

  favourites: any[] = [];

  constructor(
    private storage: StorageService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadFavourites();
    


  }

  async ionViewWillEnter() {
  this.favourites = await this.storage.get('favourites') || [];
}


  async loadFavourites() {
    this.favourites = await this.storage.get('favourites') || [];
  }

  openDetails(id: number) {
    this.router.navigate(['/movie', id]);
  }

  async removeFavourite(id: number) {
    this.favourites = this.favourites.filter(m => m.id !== id);
    await this.storage.set('favourites', this.favourites);
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


}
