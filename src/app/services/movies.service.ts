import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieCreddits, MovieDto, MovieImages, MovieSimilar, MovieVedeosDto } from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovieGenre } from '../models/genre';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '94e67533763dc0193454eea7716266a3';
  constructor(private http: HttpClient) {}

  getmovies(type: string = 'upcoming', count: number = 12) {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getvideos(id: string) {
    return this.http.get<MovieVedeosDto>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }
  getimages(id: string) {
    return this.http.get<MovieImages>(`${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`);
  }

  getcredits(id: string) {
    return this.http.get<MovieCreddits>(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`);
  }
  getSimilarMovies(id: string) {
    return this.http.get<MovieSimilar>(`${this.baseUrl}/movie/${id}/similar?api_key=${this.apiKey}`);
  }

  getmovie(id: number) {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  searchmovies(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/movie' : '/movie/popular';
    return this.http
      .get<MovieDto>(`${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getmoviestv() {
    return this.http.get(`${this.baseUrl}/tv/popular?api_key=${this.apiKey}`);
  }

  getgenre() {
    return this.http.get<MovieGenre>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }

  getmovieGenreById(genreId: string, page: number) {
    return this.http
      .get<MovieDto>(`${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
}
