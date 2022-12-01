import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  latestMovies: Movie[] = [];
  title: string = '';

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getmovies('popular').subscribe((res) => {
      this.popularMovies = res;
      console.log(this.popularMovies);
    });

    this.moviesService.getmovies('upcoming').subscribe((res: any) => {
      this.upcomingMovies = res;
      console.log(this.upcomingMovies);
    });

    this.moviesService.getmovies('top_rated').subscribe((res: any) => {
      this.topRatedMovies = res;
      console.log(this.topRatedMovies);
    });

    this.moviesService.getmoviestv().subscribe((res: any) => {
      this.latestMovies = res.results;
      console.log(this.latestMovies);
    });
  }
}
