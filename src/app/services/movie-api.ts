import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieApi {
  
   private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'YOUR_API_KEY';
  
  constructor(private http:HttpClient){}

  getTrending(){
    return this.http.get();
  }
}
