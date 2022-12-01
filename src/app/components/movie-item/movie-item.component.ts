import { Component, OnInit, Input } from '@angular/core';
import { IMAGES_SIZES } from 'src/app/constants/image-sizes';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  @Input() itemData: Movie | null = null;

  imageSizes = IMAGES_SIZES;

  constructor() {}

  ngOnInit(): void {}
}
