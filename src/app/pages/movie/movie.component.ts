import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGES_SIZES } from 'src/app/constants/image-sizes';
import { Movie, MovieCreddits, MovieImages, MovieSimilar, Movievideo } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  movieVideo: Movievideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCreddits | null = null;
  movieSimilar: MovieSimilar | null = null;
  imageSizes = IMAGES_SIZES;

  constructor(private route: ActivatedRoute, private movirservice: MoviesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideo(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getMovieSimilar(id);
    });
  }

  getMovie(id: number) {
    this.movirservice.getmovie(id).subscribe((res) => {
      this.movie = res;
    });
  }
  getMovieVideo(id: string) {
    this.movirservice.getvideos(id).subscribe((res) => {
      this.movieVideo = res;
    });
  }

  getMovieImages(id: string) {
    this.movirservice.getimages(id).subscribe((res) => {
      this.movieImages = res;
    });
  }

  getMovieCredits(id: string) {
    this.movirservice.getcredits(id).subscribe((res) => {
      this.movieCredits = res;
    });
  }

  getMovieSimilar(id: string) {
    this.movirservice.getSimilarMovies(id).subscribe((res) => {
      this.movieSimilar = res;
    });
  }
  ngOnDestroy(): void {}
}
