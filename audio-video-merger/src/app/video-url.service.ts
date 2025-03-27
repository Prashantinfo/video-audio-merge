// src/app/video-url.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoUrlService {
  private videoUrlSource = new BehaviorSubject<string>('');
  videoUrl$ = this.videoUrlSource.asObservable();

  setVideoUrl(url: string) {
    this.videoUrlSource.next(url);
  }
}