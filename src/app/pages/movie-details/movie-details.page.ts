import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonImg } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieApiService } from '../../services/movie-api.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonImg, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink, IonBackButton,IonImg]
})
export class MovieDetailsPage implements OnInit {

movie: any;


 constructor(
  private route: ActivatedRoute,
  private api: MovieApiService,
  private storage:StorageService
) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  this.loadMovie(Number(id));
}
loadMovie(id: number) {
  this.api.getMovieDetails(id).subscribe((movie :any)=> {
    this.movie = {
      ...movie,
      year: movie.release_date?.split('-')[0]
    };
  });
}
async addToFavourites() {
  let favs = await this.storage.get('favourites') || [];
  favs.push(this.movie);
  await this.storage.set('favourites', favs);
}
}
