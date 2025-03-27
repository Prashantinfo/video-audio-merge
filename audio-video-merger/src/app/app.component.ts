import { Component } from '@angular/core';
import { MediaMergerComponent } from '../app/media-merger/media-merger.component';
import { VideoPlayerComponent } from './video-player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MediaMergerComponent, VideoPlayerComponent],
  template: `
    <app-media-merger></app-media-merger>
    <app-video-player></app-video-player>
  `,
})
export class AppComponent {}