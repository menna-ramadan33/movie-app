import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;
  constructor(private movieServies: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMovieByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getPagedMovies(page: number, searchKey?: string) {
    this.movieServies.searchmovies(page, searchKey).subscribe((res) => {
      console.log(res, 'paged movie');
      this.movies = res;
    });
  }
  getMovieByGenre(genreId: string, page: number) {
    this.movieServies.getmovieGenreById(genreId, page).subscribe((res) => {
      console.log(res, 'by genre');

      this.movies = res;
    });
  }
  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMovieByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue);
      } else {
        this.getPagedMovies(pageNumber);
      }
    }
  }
  searchChanged() {
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    } else {
      this.getPagedMovies(1);
    }
  }
}
