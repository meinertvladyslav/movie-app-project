import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'fbdacf48b48db1b4e2501a4b1219ef38'; // Replace with your TMDb key

  constructor(private http: HttpClient) {}

  getTrendingMovies() {
    return this.http.get(
      `${this.apiUrl}/trending/movie/day?api_key=${this.apiKey}`
    );
  }

  getMovieDetails(id: number) {
    return this.http.get(
      `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`
    );
  }

  searchMovies(query: string) {
    return this.http.get(
      `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}`
    );
  }
}
