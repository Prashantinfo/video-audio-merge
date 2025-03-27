// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-media-merger',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="container">
//       <h2>Merge Audio into Video</h2>

//       <div class="input-group">
//         <label for="videoUrl">Video URL:</label>
//         <input id="videoUrl" type="text" [(ngModel)]="videoUrl" placeholder="e.g., https://example.com/video.mp4">
//       </div>

//       <div class="input-group">
//         <label for="audioUrl">Audio URL:</label>
//         <input id="audioUrl" type="text" [(ngModel)]="audioUrl" placeholder="e.g., https://example.com/audio.mp3">
//       </div>

//       <button (click)="mergeMedia()" [disabled]="isProcessing || !videoUrl || !audioUrl">
//         {{ isProcessing ? 'Processing...' : 'Merge Media' }}
//       </button>

//       <div *ngIf="statusMessage" class="status">{{ statusMessage }}</div>

//       <a #downloadLink [href]="downloadUrl" [download]="downloadFileName" [style.display]="downloadUrl ? 'block' : 'none'">
//         Download Merged Video
//       </a>
//     </div>
//   `,
//   styles: [/* unchanged styles */]
// })
// export class MediaMergerComponent {
//   @ViewChild('downloadLink') downloadLink!: ElementRef<HTMLAnchorElement>;

//   videoUrl: string = '';
//   audioUrl: string = '';
//   isProcessing: boolean = false;
//   statusMessage: string = '';
//   downloadUrl: string = '';
//   downloadFileName: string = 'merged-video.mp4';

//   private ffmpeg: any;

//   constructor() {
//     if (typeof SharedArrayBuffer === 'undefined') {
//       console.error('SharedArrayBuffer is not supported. Ensure cross-origin isolation with COOP/COEP headers.');
//       this.statusMessage = 'This app requires a browser environment with cross-origin isolation. Please use a compatible setup.';
//       return;
//     }

//     import('@ffmpeg/ffmpeg').then((module) => {
//       console.log('Imported FFmpeg module:', module);
//       const createFFmpeg = module.createFFmpeg || (module.default && module.default.createFFmpeg);
//       if (!createFFmpeg) {
//         throw new Error('createFFmpeg not found in @ffmpeg/ffmpeg module');
//       }
//       this.ffmpeg = createFFmpeg({
//         log: true,
//         corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
//       });
//     }).catch((err) => {
//       console.error('Failed to load FFmpeg:', err);
//       this.statusMessage = 'Failed to initialize FFmpeg. Check console.';
//     });
//   }

//   async mergeMedia() {
//     if (!this.videoUrl || !this.audioUrl) {
//       this.statusMessage = 'Please provide both video and audio URLs.';
//       return;
//     }

//     this.isProcessing = true;
//     this.statusMessage = 'Loading FFmpeg...';
//     this.downloadUrl = '';

//     try {
//       if (!this.ffmpeg) {
//         throw new Error('FFmpeg not initialized yet. Please wait and try again.');
//       }

//       await this.ffmpeg.load();

//       this.statusMessage = 'Fetching media files...';

//       const videoResponse = await fetch(this.videoUrl);
//       const audioResponse = await fetch(this.audioUrl);

//       if (!videoResponse.ok || !audioResponse.ok) {
//         throw new Error('Failed to fetch media files');
//       }

//       const videoData = new Uint8Array(await videoResponse.arrayBuffer());
//       const audioData = new Uint8Array(await audioResponse.arrayBuffer());

//       this.ffmpeg.FS('writeFile', 'input-video.mp4', videoData);
//       this.ffmpeg.FS('writeFile', 'input-audio.mp3', audioData);

//       this.statusMessage = 'Merging audio and video...';

//       await this.ffmpeg.run(
//         '-i', 'input-video.mp4',
//         '-i', 'input-audio.mp3',
//         '-c:v', 'copy',
//         '-c:a', 'aac',
//         '-shortest',
//         '-map', '0:v:0',
//         '-map', '1:a:0',
//         'output.mp4'
//       );

//       this.statusMessage = 'Generating download...';

//       const outputData = this.ffmpeg.FS('readFile', 'output.mp4');
//       const blob = new Blob([outputData.buffer], { type: 'video/mp4' });
//       this.downloadUrl = URL.createObjectURL(blob);

//       // Log the download URL to the console
//       console.log('Download URL:', this.downloadUrl);

//       this.statusMessage = 'Merge complete! Click the link to download.';
//     } catch (error) {
//       console.error('Error during merging:', error);
//       this.statusMessage = 'An error occurred. Check the console for details.';
//       if (error instanceof Error && error.message.includes('CORS')) {
//         this.statusMessage += ' Ensure the media URLs support CORS.';
//       }
//     } finally {
//       this.isProcessing = false;
//     }
//   }
// }
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideoUrlService } from '../video-url.service';

@Component({
  selector: 'app-media-merger',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Merge Audio into Video</h2>

      <div class="input-group">
        <label for="videoUrl">Video URL:</label>
        <input id="videoUrl" type="text" [(ngModel)]="videoUrl" placeholder="e.g., https://example.com/video.mp4">
      </div>

      <div class="input-group">
        <label for="audioUrl">Audio URL:</label>
        <input id="audioUrl" type="text" [(ngModel)]="audioUrl" placeholder="e.g., https://example.com/audio.mp3">
      </div>

      <button (click)="mergeMedia()" [disabled]="isProcessing || !videoUrl || !audioUrl">
        {{ isProcessing ? 'Processing...' : 'Merge Media' }}
      </button>

      <div *ngIf="statusMessage" class="status">{{ statusMessage }}</div>
    </div>
  `,
  styles: [/* unchanged styles */]
})
export class MediaMergerComponent {
  videoUrl: string = '';
  audioUrl: string = '';
  isProcessing: boolean = false;
  statusMessage: string = '';

  private ffmpeg: any;

  constructor(private videoUrlService: VideoUrlService) {
    if (typeof SharedArrayBuffer === 'undefined') {
      console.error('SharedArrayBuffer is not supported. Ensure cross-origin isolation with COOP/COEP headers.');
      this.statusMessage = 'This app requires a browser environment with cross-origin isolation. Please use http://localhost:3000.';
      return;
    }

    import('@ffmpeg/ffmpeg').then((module) => {
      console.log('Imported FFmpeg module:', module);
      const createFFmpeg = module.createFFmpeg || (module.default && module.default.createFFmpeg);
      if (!createFFmpeg) {
        throw new Error('createFFmpeg not found in @ffmpeg/ffmpeg module');
      }
      this.ffmpeg = createFFmpeg({
        log: true,
        corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
      });
    }).catch((err) => {
      console.error('Failed to load FFmpeg:', err);
      this.statusMessage = 'Failed to initialize FFmpeg. Check console.';
    });
  }

  async mergeMedia() {
    if (!this.videoUrl || !this.audioUrl) {
      this.statusMessage = 'Please provide both video and audio URLs.';
      return;
    }

    this.isProcessing = true;
    this.statusMessage = 'Loading FFmpeg...';

    try {
      if (!this.ffmpeg) {
        throw new Error('FFmpeg not initialized yet. Please wait and try again.');
      }

      await this.ffmpeg.load();

      this.statusMessage = 'Fetching media files...';

      const videoResponse = await fetch(this.videoUrl);
      const audioResponse = await fetch(this.audioUrl);

      if (!videoResponse.ok || !audioResponse.ok) {
        throw new Error('Failed to fetch media files');
      }

      const videoData = new Uint8Array(await videoResponse.arrayBuffer());
      const audioData = new Uint8Array(await audioResponse.arrayBuffer());

      this.ffmpeg.FS('writeFile', 'input-video.mp4', videoData);
      this.ffmpeg.FS('writeFile', 'input-audio.mp3', audioData);

      this.statusMessage = 'Merging audio and video...';

      await this.ffmpeg.run(
        '-i', 'input-video.mp4',
        '-i', 'input-audio.mp3',
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-shortest',
        '-map', '0:v:0',
        '-map', '1:a:0',
        'output.mp4'
      );

      this.statusMessage = 'Saving video...';

      const outputData = this.ffmpeg.FS('readFile', 'output.mp4');
      const blob = new Blob([outputData.buffer], { type: 'video/mp4' });

      // Send the video to the server
      const response = await fetch('http://localhost:3000/save-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'video/mp4',
        },
        body: blob,
      });

      if (!response.ok) {
        throw new Error('Failed to save video to server');
      }

      const result = await response.json();
      const videoUrl = result.url;

      // Log the persistent URL
      console.log('Video URL for playback:', videoUrl);

      // Store the URL in the service
      this.videoUrlService.setVideoUrl(videoUrl);

      this.statusMessage = 'Merge complete! Video URL generated.';
    } catch (error) {
      console.error('Error during merging:', error);
      this.statusMessage = 'An error occurred. Check the console for details.';
      if (error instanceof Error && error.message.includes('CORS')) {
        this.statusMessage += ' Ensure the media URLs support CORS.';
      }
    } finally {
      this.isProcessing = false;
    }
  }
}