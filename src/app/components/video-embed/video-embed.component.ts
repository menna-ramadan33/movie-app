import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss']
})
export class VideoEmbedComponent implements OnInit {
  @Input() site: string = '';
  @Input() key: string | null = null;
  videoUrl: SafeResourceUrl = '';

  constructor(private sanatizer: DomSanitizer) {}

  ngOnInit(): void {
    this.videoUrl = this.getSaveUrl('https://www.youtube.com/embed/' + this.key);
  }

  getSaveUrl(url: string) {
    return this.sanatizer.bypassSecurityTrustResourceUrl(url);
  }
}
