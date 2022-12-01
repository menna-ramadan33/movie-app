import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { state, style, trigger, transition, animate } from '@angular/animations';
import { IMAGES_SIZES } from 'src/app/constants/image-sizes';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')])
      // transition('*=> void', [animate('500ms')])
    ])
  ]
})
export class SliderComponent implements OnInit {
  @Input() items: Movie[] = [];
  @Input() isSlider: boolean = false;
  imageSizes = IMAGES_SIZES;

  currentSlideIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    if (!this.isSlider) {
      setInterval(() => {
        this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
      }, 4000);
    }
  }
}
