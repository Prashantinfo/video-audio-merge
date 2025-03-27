import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoUrlService } from './video-url.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="videoUrl$ | async as videoUrl" class="video-container">
      <h3>Preview Merged Video</h3>
      <video controls [src]="videoUrl" width="640" height="360">
        Your browser does not support the video tag.
      </video>
    </div>
  `,
  styles: [`
    .video-container { margin-top: 20px; }
  `]
})
export class VideoPlayerComponent {
  videoUrl$: Observable<string>;

  constructor(private videoUrlService: VideoUrlService) {
    this.videoUrl$ = this.videoUrlService.videoUrl$;
  }
}