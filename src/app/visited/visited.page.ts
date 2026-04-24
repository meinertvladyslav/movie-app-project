import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StorageService } from '../services/storage.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg
} from '@ionic/angular/standalone';



@Component({
  selector: 'app-visited',
  templateUrl: './visited.page.html',
  styleUrls: ['./visited.page.scss'],
  standalone: true,
  imports: [ NgFor, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonImg ]
})
export class VisitedPage implements OnInit {

  visited: any[] = [];

  constructor(private storage: StorageService) {}

  async ngOnInit() {
    this.visited = await this.storage.get('visited') || [];
  }
}
