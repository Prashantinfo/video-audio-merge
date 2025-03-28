// // import { Component, ElementRef, ViewChild } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';

// // @Component({
// //   selector: 'app-media-merger',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   template: `
// //     <div class="container">
// //       <h2>Merge Audio into Video</h2>

// //       <div class="input-group">
// //         <label for="videoUrl">Video URL:</label>
// //         <input id="videoUrl" type="text" [(ngModel)]="videoUrl" placeholder="e.g., https://example.com/video.mp4">
// //       </div>

// //       <div class="input-group">
// //         <label for="audioUrl">Audio URL:</label>
// //         <input id="audioUrl" type="text" [(ngModel)]="audioUrl" placeholder="e.g., https://example.com/audio.mp3">
// //       </div>

// //       <button (click)="mergeMedia()" [disabled]="isProcessing || !videoUrl || !audioUrl">
// //         {{ isProcessing ? 'Processing...' : 'Merge Media' }}
// //       </button>

// //       <div *ngIf="statusMessage" class="status">{{ statusMessage }}</div>

// //       <a #downloadLink [href]="downloadUrl" [download]="downloadFileName" [style.display]="downloadUrl ? 'block' : 'none'">
// //         Download Merged Video
// //       </a>
// //     </div>
// //   `,
// //   styles: [/* unchanged styles */]
// // })
// // export class MediaMergerComponent {
// //   @ViewChild('downloadLink') downloadLink!: ElementRef<HTMLAnchorElement>;

// //   videoUrl: string = '';
// //   audioUrl: string = '';
// //   isProcessing: boolean = false;
// //   statusMessage: string = '';
// //   downloadUrl: string = '';
// //   downloadFileName: string = 'merged-video.mp4';

// //   private ffmpeg: any;

// //   constructor() {
// //     if (typeof SharedArrayBuffer === 'undefined') {
// //       console.error('SharedArrayBuffer is not supported. Ensure cross-origin isolation with COOP/COEP headers.');
// //       this.statusMessage = 'This app requires a browser environment with cross-origin isolation. Please use a compatible setup.';
// //       return;
// //     }

// //     import('@ffmpeg/ffmpeg').then((module) => {
// //       console.log('Imported FFmpeg module:', module);
// //       const createFFmpeg = module.createFFmpeg || (module.default && module.default.createFFmpeg);
// //       if (!createFFmpeg) {
// //         throw new Error('createFFmpeg not found in @ffmpeg/ffmpeg module');
// //       }
// //       this.ffmpeg = createFFmpeg({
// //         log: true,
// //         corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
// //       });
// //     }).catch((err) => {
// //       console.error('Failed to load FFmpeg:', err);
// //       this.statusMessage = 'Failed to initialize FFmpeg. Check console.';
// //     });
// //   }

// //   async mergeMedia() {
// //     if (!this.videoUrl || !this.audioUrl) {
// //       this.statusMessage = 'Please provide both video and audio URLs.';
// //       return;
// //     }

// //     this.isProcessing = true;
// //     this.statusMessage = 'Loading FFmpeg...';
// //     this.downloadUrl = '';

// //     try {
// //       if (!this.ffmpeg) {
// //         throw new Error('FFmpeg not initialized yet. Please wait and try again.');
// //       }

// //       await this.ffmpeg.load();

// //       this.statusMessage = 'Fetching media files...';

// //       const videoResponse = await fetch(this.videoUrl);
// //       const audioResponse = await fetch(this.audioUrl);

// //       if (!videoResponse.ok || !audioResponse.ok) {
// //         throw new Error('Failed to fetch media files');
// //       }

// //       const videoData = new Uint8Array(await videoResponse.arrayBuffer());
// //       const audioData = new Uint8Array(await audioResponse.arrayBuffer());

// //       this.ffmpeg.FS('writeFile', 'input-video.mp4', videoData);
// //       this.ffmpeg.FS('writeFile', 'input-audio.mp3', audioData);

// //       this.statusMessage = 'Merging audio and video...';

// //       await this.ffmpeg.run(
// //         '-i', 'input-video.mp4',
// //         '-i', 'input-audio.mp3',
// //         '-c:v', 'copy',
// //         '-c:a', 'aac',
// //         '-shortest',
// //         '-map', '0:v:0',
// //         '-map', '1:a:0',
// //         'output.mp4'
// //       );

// //       this.statusMessage = 'Generating download...';

// //       const outputData = this.ffmpeg.FS('readFile', 'output.mp4');
// //       const blob = new Blob([outputData.buffer], { type: 'video/mp4' });
// //       this.downloadUrl = URL.createObjectURL(blob);

// //       // Log the download URL to the console
// //       console.log('Download URL:', this.downloadUrl);

// //       this.statusMessage = 'Merge complete! Click the link to download.';
// //     } catch (error) {
// //       console.error('Error during merging:', error);
// //       this.statusMessage = 'An error occurred. Check the console for details.';
// //       if (error instanceof Error && error.message.includes('CORS')) {
// //         this.statusMessage += ' Ensure the media URLs support CORS.';
// //       }
// //     } finally {
// //       this.isProcessing = false;
// //     }
// //   }
// // }
// //------------------impotant one---------------------------
// // import { Component, ElementRef, ViewChild } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { VideoUrlService } from '../video-url.service';

// // @Component({
// //   selector: 'app-media-merger',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   template: `
// //     <div class="container">
// //       <h2>Merge Audio into Video</h2>

// //       <div class="input-group">
// //         <label for="videoUrl">Video URL:</label>
// //         <input id="videoUrl" type="text" [(ngModel)]="videoUrl" placeholder="e.g., https://example.com/video.mp4">
// //       </div>

// //       <div class="input-group">
// //         <label for="audioUrl">Audio URL:</label>
// //         <input id="audioUrl" type="text" [(ngModel)]="audioUrl" placeholder="e.g., https://example.com/audio.mp3">
// //       </div>

// //       <button (click)="mergeMedia()" [disabled]="isProcessing || !videoUrl || !audioUrl">
// //         {{ isProcessing ? 'Processing...' : 'Merge Media' }}
// //       </button>

// //       <div *ngIf="statusMessage" class="status">{{ statusMessage }}</div>
// //     </div>
// //   `,
// //   styles: [/* unchanged styles */]
// // })
// // export class MediaMergerComponent {
// //   videoUrl: string = '';
// //   audioUrl: string = '';
// //   isProcessing: boolean = false;
// //   statusMessage: string = '';

// //   private ffmpeg: any;

// //   constructor(private videoUrlService: VideoUrlService) {
// //     if (typeof SharedArrayBuffer === 'undefined') {
// //       console.error('SharedArrayBuffer is not supported. Ensure cross-origin isolation with COOP/COEP headers.');
// //       this.statusMessage = 'This app requires a browser environment with cross-origin isolation. Please use http://localhost:3000.';
// //       return;
// //     }

// //     import('@ffmpeg/ffmpeg').then((module) => {
// //       console.log('Imported FFmpeg module:', module);
// //       const createFFmpeg = module.createFFmpeg || (module.default && module.default.createFFmpeg);
// //       if (!createFFmpeg) {
// //         throw new Error('createFFmpeg not found in @ffmpeg/ffmpeg module');
// //       }
// //       this.ffmpeg = createFFmpeg({
// //         log: true,
// //         corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
// //       });
// //     }).catch((err) => {
// //       console.error('Failed to load FFmpeg:', err);
// //       this.statusMessage = 'Failed to initialize FFmpeg. Check console.';
// //     });
// //   }

// //   async mergeMedia() {
// //     if (!this.videoUrl || !this.audioUrl) {
// //       this.statusMessage = 'Please provide both video and audio URLs.';
// //       return;
// //     }

// //     this.isProcessing = true;
// //     this.statusMessage = 'Loading FFmpeg...';

// //     try {
// //       if (!this.ffmpeg) {
// //         throw new Error('FFmpeg not initialized yet. Please wait and try again.');
// //       }

// //       await this.ffmpeg.load();

// //       this.statusMessage = 'Fetching media files...';

// //       const videoResponse = await fetch(this.videoUrl);
// //       const audioResponse = await fetch(this.audioUrl);

// //       if (!videoResponse.ok || !audioResponse.ok) {
// //         throw new Error('Failed to fetch media files');
// //       }

// //       const videoData = new Uint8Array(await videoResponse.arrayBuffer());
// //       const audioData = new Uint8Array(await audioResponse.arrayBuffer());

// //       this.ffmpeg.FS('writeFile', 'input-video.mp4', videoData);
// //       this.ffmpeg.FS('writeFile', 'input-audio.mp3', audioData);

// //       this.statusMessage = 'Merging audio and video...';

// //       await this.ffmpeg.run(
// //         '-i', 'input-video.mp4',
// //         '-i', 'input-audio.mp3',
// //         '-c:v', 'copy',
// //         '-c:a', 'aac',
// //         '-shortest',
// //         '-map', '0:v:0',
// //         '-map', '1:a:0',
// //         'output.mp4'
// //       );

// //       this.statusMessage = 'Saving video...';

// //       const outputData = this.ffmpeg.FS('readFile', 'output.mp4');
// //       const blob = new Blob([outputData.buffer], { type: 'video/mp4' });

// //       // Send the video to the server
// //       const response = await fetch('http://localhost:3000/save-video', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'video/mp4',
// //         },
// //         body: blob,
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to save video to server');
// //       }

// //       const result = await response.json();
// //       const videoUrl = result.url;

// //       // Log the persistent URL
// //       console.log('Video URL for playback:', videoUrl);

// //       // Store the URL in the service
// //       this.videoUrlService.setVideoUrl(videoUrl);

// //       this.statusMessage = 'Merge complete! Video URL generated.';
// //     } catch (error) {
// //       console.error('Error during merging:', error);
// //       this.statusMessage = 'An error occurred. Check the console for details.';
// //       if (error instanceof Error && error.message.includes('CORS')) {
// //         this.statusMessage += ' Ensure the media URLs support CORS.';
// //       }
// //     } finally {
// //       this.isProcessing = false;
// //     }
// //   }
// // }
// // import { Component } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';

// // @Component({
// //   selector: 'app-media-merger',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule],
// //   template: `
// //     <div class="container">
// //       <h2>Merge Audio into Video</h2>

// //       <div class="input-group">
// //         <label for="videoUrl">Video URL:</label>
// //         <input id="videoUrl" type="text" [(ngModel)]="videoUrl" placeholder="e.g., https://example.com/video.mp4">
// //       </div>

// //       <div class="input-group">
// //         <label for="audioUrl">Audio URL:</label>
// //         <input id="audioUrl" type="text" [(ngModel)]="audioUrl" placeholder="e.g., https://example.com/audio.mp3">
// //       </div>

// //       <button (click)="mergeMedia()" [disabled]="isProcessing || !videoUrl || !audioUrl">
// //         {{ isProcessing ? 'Processing...' : 'Merge Media' }}
// //       </button>

// //       <div *ngIf="statusMessage" class="status">{{ statusMessage }}</div>
      
// //       <a #downloadLink style="display: none;"></a>
// //     </div>
// //   `,
// //   styles: [/* unchanged styles */]
// // })
// // export class MediaMergerComponent {
// //   videoUrl: string = '';
// //   audioUrl: string = '';
// //   isProcessing: boolean = false;
// //   statusMessage: string = '';
// //   private ffmpeg: any;

// //   constructor() {
// //     if (typeof SharedArrayBuffer === 'undefined') {
// //       console.error('SharedArrayBuffer is not supported. Ensure cross-origin isolation with COOP/COEP headers.');
// //       this.statusMessage = 'This app requires a browser environment with cross-origin isolation.';
// //       return;
// //     }

// //     import('@ffmpeg/ffmpeg').then((module) => {
// //       console.log('Imported FFmpeg module:', module);
// //       const createFFmpeg = module.createFFmpeg || (module.default && module.default.createFFmpeg);
// //       if (!createFFmpeg) {
// //         throw new Error('createFFmpeg not found in @ffmpeg/ffmpeg module');
// //       }
// //       this.ffmpeg = createFFmpeg({
// //         log: true,
// //         corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
// //       });
// //     }).catch((err) => {
// //       console.error('Failed to load FFmpeg:', err);
// //       this.statusMessage = 'Failed to initialize FFmpeg. Check console.';
// //     });
// //   }

// //   async mergeMedia() {
// //     if (!this.videoUrl || !this.audioUrl) {
// //       this.statusMessage = 'Please provide both video and audio URLs.';
// //       return;
// //     }

// //     this.isProcessing = true;
// //     this.statusMessage = 'Loading FFmpeg...';

// //     try {
// //       if (!this.ffmpeg) {
// //         throw new Error('FFmpeg not initialized yet. Please wait and try again.');
// //       }

// //       await this.ffmpeg.load();

// //       this.statusMessage = 'Fetching media files...';

// //       const videoResponse = await fetch(this.videoUrl, { mode: 'cors' });
// //       const audioResponse = await fetch(this.audioUrl, { mode: 'cors' });

// //       if (!videoResponse.ok || !audioResponse.ok) {
// //         throw new Error('Failed to fetch media files');
// //       }

// //       const videoData = new Uint8Array(await videoResponse.arrayBuffer());
// //       const audioData = new Uint8Array(await audioResponse.arrayBuffer());

// //       this.ffmpeg.FS('writeFile', 'input-video.mp4', videoData);
// //       this.ffmpeg.FS('writeFile', 'input-audio.mp3', audioData);

// //       this.statusMessage = 'Merging audio and video...';

// //       await this.ffmpeg.run(
// //         '-i', 'input-video.mp4',
// //         '-i', 'input-audio.mp3',
// //         '-c:v', 'copy',
// //         '-c:a', 'aac',
// //         '-shortest',
// //         '-map', '0:v:0',
// //         '-map', '1:a:0',
// //         'output.mp4'
// //       );

// //       this.statusMessage = 'Preparing download...';

// //       const outputData = this.ffmpeg.FS('readFile', 'output.mp4');
// //       const blob = new Blob([outputData.buffer], { type: 'video/mp4' });
// //       const url = URL.createObjectURL(blob);

// //       // Create a temporary download link
// //       const link = document.createElement('a');
// //       link.href = url;
// //       link.download = 'merged-video.mp4';
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
      
// //       // Clean up the URL object
// //       URL.revokeObjectURL(url);

// //       this.statusMessage = 'Merge complete! Video downloaded.';
// //     } catch (error) {
// //       console.error('Error during merging:', error);
// //       this.statusMessage = 'An error occurred. Check the console for details.';
// //       if (error instanceof Error && error.message.includes('CORS')) {
// //         this.statusMessage += ' Ensure the media URLs support CORS.';
// //       }
// //     } finally {
// //       this.isProcessing = false;
// //     }
// //   }
// // }

//---------------------------working on meging 2 audio with backend----------------------

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { VideoUrlService } from '../video-url.service';

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
//         <label for="audioUrl1">Audio URL 1:</label>
//         <input id="audioUrl1" type="text" [(ngModel)]="audioUrl1" placeholder="e.g., https://example.com/audio1.mp3">
//       </div>

//       <div class="input-group">
//         <label for="audioUrl2">Audio URL 2:</label>
//         <input id="audioUrl2" type="text" [(ngModel)]="audioUrl2" placeholder="e.g., https://example.com/audio2.mp3">
//       </div>

//       <button (click)="mergeMedia()" [disabled]="isProcessing || !videoUrl || !audioUrl1 || !audioUrl2">
//         {{ isProcessing ? 'Processing...' : 'Merge Media' }}
//       </button>

//       <div *ngIf="statusMessage" class="status">{{ statusMessage }}</div>
//     </div>
//   `,
//   styles: [/* unchanged styles */]
// })
// export class MediaMergerComponent {
//   videoUrl: string = '';
//   audioUrl1: string = ''; // First audio file
//   audioUrl2: string = ''; // Second audio file
//   isProcessing: boolean = false;
//   statusMessage: string = '';

//   private ffmpeg: any;

//   constructor(private videoUrlService: VideoUrlService) {
//     if (typeof SharedArrayBuffer === 'undefined') {
//       console.error('SharedArrayBuffer is not supported. Ensure cross-origin isolation with COOP/COEP headers.');
//       this.statusMessage = 'This app requires a browser environment with cross-origin isolation. Please use http://localhost:3000.';
//       return;
//     }

//     import('@ffmpeg/ffmpeg').then((module) => {
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
//     if (!this.videoUrl || !this.audioUrl1 || !this.audioUrl2) {
//       this.statusMessage = 'Please provide a video URL and both audio URLs.';
//       return;
//     }
  
//     this.isProcessing = true;
//     this.statusMessage = 'Loading FFmpeg...';
  
//     try {
//       if (!this.ffmpeg) {
//         throw new Error('FFmpeg not initialized yet. Please wait and try again.');
//       }
  
//       await this.ffmpeg.load();
  
//       this.statusMessage = 'Fetching media files...';
  
//       const videoResponse = await fetch(this.videoUrl);
//       const audioResponse1 = await fetch(this.audioUrl1);
//       const audioResponse2 = await fetch(this.audioUrl2);
  
//       if (!videoResponse.ok || !audioResponse1.ok || !audioResponse2.ok) {
//         throw new Error('Failed to fetch media files');
//       }
  
//       const videoData = new Uint8Array(await videoResponse.arrayBuffer());
//       const audioData1 = new Uint8Array(await audioResponse1.arrayBuffer());
//       const audioData2 = new Uint8Array(await audioResponse2.arrayBuffer());
  
//       this.ffmpeg.FS('writeFile', 'input-video.mp4', videoData);
//       this.ffmpeg.FS('writeFile', 'input-audio1.raw', audioData1); // Use .raw since it's PCM
//       this.ffmpeg.FS('writeFile', 'input-audio2.raw', audioData2);
  
//       this.statusMessage = 'Converting audio files to MP3...';
  
//       // Convert PCM to MP3 (assuming pcm_u8, 8000 Hz, mono)
//       await this.ffmpeg.run(
//         '-f', 'u8',           // Input format: 8-bit unsigned PCM
//         '-ar', '8000',        // Sample rate: 8000 Hz
//         '-ac', '1',           // Channels: mono
//         '-i', 'input-audio1.raw',
//         '-c:a', 'libmp3lame', // Encode to MP3
//         'audio1.mp3'
//       );
  
//       await this.ffmpeg.run(
//         '-f', 'u8',
//         '-ar', '8000',
//         '-ac', '1',
//         '-i', 'input-audio2.raw',
//         '-c:a', 'libmp3lame',
//         'audio2.mp3'
//       );
  
//       this.statusMessage = 'Concatenating audio files...';
  
//       // Create concat list with MP3 files
//       this.ffmpeg.FS('writeFile', 'concat-list.txt', "file 'audio1.mp3'\nfile 'audio2.mp3'");
  
//       // Concatenate the MP3 files
//       await this.ffmpeg.run(
//         '-f', 'concat',
//         '-safe', '0',
//         '-i', 'concat-list.txt',
//         '-c:a', 'copy',
//         'combined-audio.mp3'
//       );
  
//       if (!this.ffmpeg.FS('readdir', '/').includes('combined-audio.mp3')) {
//         throw new Error('Audio concatenation failed. Check FFmpeg logs in console.');
//       }
  
//       this.statusMessage = 'Merging combined audio with video...';
  
//       await this.ffmpeg.run(
//         '-i', 'input-video.mp4',
//         '-i', 'combined-audio.mp3',
//         '-c:v', 'copy',
//         '-c:a', 'aac',
//         '-shortest',
//         '-map', '0:v:0',
//         '-map', '1:a:0',
//         'output.mp4'
//       );
  
//       if (!this.ffmpeg.FS('readdir', '/').includes('output.mp4')) {
//         throw new Error('Merge failed. Check FFmpeg logs in console.');
//       }
  
//       this.statusMessage = 'Saving video...';
  
//       const outputData = this.ffmpeg.FS('readFile', 'output.mp4');
//       const blob = new Blob([outputData.buffer], { type: 'video/mp4' });
  
//       const response = await fetch('http://localhost:3000/save-video', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'video/mp4',
//         },
//         body: blob,
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to save video to server');
//       }
  
//       const result = await response.json();
//       const videoUrl = result.url;
  
//       console.log('Video URL for playback:', videoUrl);
//       this.videoUrlService.setVideoUrl(videoUrl);
  
//       this.statusMessage = 'Merge complete! Video URL generated.';
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


//----------------always goes in fallback without backend-----------------------------------------
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { VideoUrlService } from '../video-url.service';

// @Component({
//   selector: 'app-media-merger',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="container">
//       <h2>Merge Audio into Video</h2>

//       <div *ngIf="processingMode === 'unsupported'" class="compatibility-warning">
//         <h3>Browser Compatibility Limited</h3>
//         <p>Your current browser has limited support for advanced media processing.</p>
//       </div>

//       <div class="input-group">
//         <label for="videoUrl">Video URL:</label>
//         <input id="videoUrl" type="text" [(ngModel)]="videoUrl" placeholder="e.g., https://example.com/video.mp4">
//       </div>

//       <div class="input-group">
//         <label for="audioUrl1">Audio URL 1:</label>
//         <input id="audioUrl1" type="text" [(ngModel)]="audioUrl1" placeholder="e.g., https://example.com/audio1.mp3">
//       </div>

//       <div class="input-group">
//         <label for="audioUrl2">Audio URL 2:</label>
//         <input id="audioUrl2" type="text" [(ngModel)]="audioUrl2" placeholder="e.g., https://example.com/audio2.mp3">
//       </div>

//       <div class="processing-mode" *ngIf="processingMode === 'fallback'">
//         <p class="warning">⚠️ Using limited processing mode</p>
//       </div>

//       <button 
//         (click)="mergeMedia()" 
//         [disabled]="isProcessing || !videoUrl || !audioUrl1 || !audioUrl2"
//       >
//         {{ isProcessing ? 'Processing...' : 'Merge Media' }}
//       </button>

//       <div *ngIf="statusMessage" class="status">{{ statusMessage }}</div>
      
//       <div *ngIf="generatedVideoUrl" class="generated-url">
//         <h3>Generated Video URL:</h3>
//         <pre>{{ generatedVideoUrl }}</pre>
//         <button (click)="copyUrlToClipboard()">Copy URL</button>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .container { 
//       max-width: 500px; 
//       margin: 0 auto; 
//       padding: 20px; 
//       font-family: Arial, sans-serif; 
//     }
//     .generated-url {
//       margin-top: 15px;
//       background-color: #f4f4f4;
//       padding: 10px;
//       border-radius: 5px;
//     }
//     .generated-url pre {
//       word-wrap: break-word;
//       white-space: pre-wrap;
//       max-width: 100%;
//       overflow-x: auto;
//     }
//   `]
// })
// export class MediaMergerComponent implements OnInit {
//   videoUrl: string = '';
//   audioUrl1: string = '';
//   audioUrl2: string = '';
//   isProcessing: boolean = false;
//   statusMessage: string = '';
//   generatedVideoUrl: string = '';
  
//   // Processing mode can be 'ffmpeg', 'fallback', or 'unsupported'
//   processingMode: 'ffmpeg' | 'fallback' | 'unsupported' = 'unsupported';

//   private ffmpeg: any;

//   constructor(private videoUrlService: VideoUrlService) {}

//   ngOnInit() {
//     this.detectProcessingCapabilities();
//   }

//   copyUrlToClipboard() {
//     if (this.generatedVideoUrl) {
//       navigator.clipboard.writeText(this.generatedVideoUrl).then(() => {
//         alert('URL copied to clipboard!');
//       }).catch(err => {
//         console.error('Failed to copy URL', err);
//       });
//     }
//   }

//   private detectProcessingCapabilities() {
//     // Check for advanced processing capabilities
//     const hasSharedArrayBuffer = typeof SharedArrayBuffer !== 'undefined';
//     const hasCrossOriginIsolation = window.crossOriginIsolated;
    
//     if (hasSharedArrayBuffer && hasCrossOriginIsolation) {
//       this.processingMode = 'ffmpeg';
//       this.initFFmpeg();
//     } else if (this.supportsBasicMediaProcessing()) {
//       this.processingMode = 'fallback';
//     } else {
//       this.processingMode = 'unsupported';
//     }
//   }

//   private supportsBasicMediaProcessing(): boolean {
//     // Check for basic media processing capabilities
//     return !!(
//       window.File && 
//       window.FileReader && 
//       window.Blob && 
//       window.URL
//     );
//   }

//   private async initFFmpeg() {
//     try {
//       const module = await import('@ffmpeg/ffmpeg');
//       const createFFmpeg = module.createFFmpeg || (module.default && module.default.createFFmpeg);
      
//       if (!createFFmpeg) {
//         throw new Error('createFFmpeg not found');
//       }

//       this.ffmpeg = createFFmpeg({
//         log: true,
//         corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
//       });

//       await this.ffmpeg.load();
//     } catch (error) {
//       console.error('FFmpeg initialization failed', error);
//       this.processingMode = 'fallback';
//     }
//   }

//   async mergeMedia() {
//     this.isProcessing = true;
//     this.statusMessage = 'Preparing to merge media...';
//     this.generatedVideoUrl = ''; // Reset previous URL

//     try {
//       switch (this.processingMode) {
//         case 'ffmpeg':
//           await this.mergeMediaWithFFmpeg();
//           break;
//         case 'fallback':
//           await this.mergeMediaFallback();
//           break;
//         default:
//           throw new Error('No processing method available');
//       }
//     } catch (error) {
//       console.error('Merge process error:', error);
//       this.statusMessage = this.handleErrorMessage(error);
//     } finally {
//       this.isProcessing = false;
//     }
//   }

//   private async mergeMediaWithFFmpeg() {
//     // Simulate FFmpeg processing (you'd replace with actual FFmpeg logic)
//     const [videoResponse, audioResponse1, audioResponse2] = await Promise.all([
//       fetch(this.videoUrl),
//       fetch(this.audioUrl1),
//       fetch(this.audioUrl2)
//     ]);

//     const videoBlob = await videoResponse.blob();
//     const audioBlob1 = await audioResponse1.blob();
//     const audioBlob2 = await audioResponse2.blob();

//     // Create a blob URL for the combined media
//     const combinedBlob = new Blob([videoBlob, audioBlob1, audioBlob2], { type: 'video/mp4' });
//     this.generatedVideoUrl = URL.createObjectURL(combinedBlob);

//     // Log the generated URL
//     console.log('Generated Video URL (FFmpeg Mode):', this.generatedVideoUrl);

//     // Optional: Use VideoUrlService if needed
//     this.videoUrlService.setVideoUrl(this.generatedVideoUrl);

//     this.statusMessage = 'Media merged using advanced processing.';
//   }

//   private async mergeMediaFallback() {
//     // Simplified fallback processing
//     const [videoResponse, audioResponse1, audioResponse2] = await Promise.all([
//       fetch(this.videoUrl),
//       fetch(this.audioUrl1),
//       fetch(this.audioUrl2)
//     ]);

//     // Basic validation and error handling
//     if (!videoResponse.ok || !audioResponse1.ok || !audioResponse2.ok) {
//       throw new Error('Failed to fetch media files');
//     }

//     const videoBlob = await videoResponse.blob();
//     const audioBlob1 = await audioResponse1.blob();
//     const audioBlob2 = await audioResponse2.blob();

//     // Create a blob URL for the combined media
//     const combinedBlob = new Blob([videoBlob, audioBlob1, audioBlob2], { type: 'video/mp4' });
//     this.generatedVideoUrl = URL.createObjectURL(combinedBlob);

//     // Log the generated URL
//     console.log('Generated Video URL (Fallback Mode):', this.generatedVideoUrl);

//     // Optional: Trigger download
//     const downloadLink = document.createElement('a');
//     downloadLink.href = this.generatedVideoUrl;
//     downloadLink.download = 'combined-media.mp4';
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);

//     this.statusMessage = 'Media combined using basic processing.';
//   }

//   private handleErrorMessage(error: any): string {
//     if (error instanceof Error) {
//       if (error.message.includes('SharedArrayBuffer')) {
//         return 'Advanced processing not supported. Try simplified mode.';
//       }
//       if (error.message.includes('Failed to fetch')) {
//         return 'Network error. Check your media URLs.';
//       }
//     }
//     return 'Processing failed. Check console for details.';
//   }
// }

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
        <label for="audioUrl1">Audio URL 1:</label>
        <input id="audioUrl1" type="text" [(ngModel)]="audioUrl1" placeholder="e.g., https://example.com/audio1.mp3">
      </div>

      <div class="input-group">
        <label for="audioUrl2">Audio URL 2:</label>
        <input id="audioUrl2" type="text" [(ngModel)]="audioUrl2" placeholder="e.g., https://example.com/audio2.mp3">
      </div>

      <button 
        (click)="mergeMedia()" 
        [disabled]="isProcessing || !videoUrl || !audioUrl1 || !audioUrl2"
      >
        {{ isProcessing ? 'Processing...' : 'Merge Media' }}
      </button>

      <div *ngIf="statusMessage" class="status">{{ statusMessage }}</div>
      
      <div *ngIf="mergedVideoUrl" class="video-preview">
        <h3>Merged Video Preview</h3>
        <video 
          #videoPlayer 
          controls 
          [src]="mergedVideoUrl" 
          style="max-width: 100%; margin-top: 15px;"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  `,
  styles: [`
    .container { 
      max-width: 500px; 
      margin: 0 auto; 
      padding: 20px; 
      font-family: Arial, sans-serif; 
    }
    .input-group { 
      margin-bottom: 15px; 
    }
    .input-group label { 
      display: block; 
      margin-bottom: 5px; 
      font-weight: bold; 
    }
    .input-group input { 
      width: 100%; 
      padding: 8px; 
      border: 1px solid #ddd; 
      border-radius: 4px; 
    }
    button {
      width: 100%; 
      padding: 10px; 
      background-color: #4CAF50; 
      color: white; 
      border: none; 
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
    .status {
      margin-top: 15px; 
      text-align: center;
      color: #333;
    }
    .video-preview {
      margin-top: 20px;
      text-align: center;
    }
  `]
})
export class MediaMergerComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  videoUrl: string = '';
  audioUrl1: string = '';
  audioUrl2: string = '';
  isProcessing: boolean = false;
  statusMessage: string = '';
  mergedVideoUrl: string = '';

  private ffmpeg: any;

  constructor(private videoUrlService: VideoUrlService) {}

  ngOnInit() {
    this.initFFmpeg();
  }

  private async initFFmpeg() {
    try {
      const module = await import('@ffmpeg/ffmpeg');
      const createFFmpeg = module.createFFmpeg || (module.default && module.default.createFFmpeg);
      
      if (!createFFmpeg) {
        throw new Error('createFFmpeg not found');
      }

      this.ffmpeg = createFFmpeg({
        log: true,
        corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
      });

      await this.ffmpeg.load();
    } catch (error) {
      console.error('FFmpeg initialization failed', error);
      this.statusMessage = 'Failed to initialize FFmpeg. Please try again.';
    }
  }

  async mergeMedia() {
    // Ensure FFmpeg is initialized
    if (!this.ffmpeg) {
      await this.initFFmpeg();
    }

    if (!this.ffmpeg) {
      this.statusMessage = 'FFmpeg could not be initialized.';
      return;
    }

    this.isProcessing = true;
    this.statusMessage = 'Preparing to merge media...';
    this.mergedVideoUrl = ''; // Reset previous URL

    try {
      // Fetch media files
      const [videoResponse, audioResponse1, audioResponse2] = await Promise.all([
        fetch(this.videoUrl),
        fetch(this.audioUrl1),
        fetch(this.audioUrl2)
      ]);

      // Check if fetch was successful
      if (!videoResponse.ok || !audioResponse1.ok || !audioResponse2.ok) {
        throw new Error('Failed to fetch media files');
      }

      // Convert responses to array buffers
      const videoData = new Uint8Array(await videoResponse.arrayBuffer());
      const audioData1 = new Uint8Array(await audioResponse1.arrayBuffer());
      const audioData2 = new Uint8Array(await audioResponse2.arrayBuffer());

      // Write files to FFmpeg virtual filesystem
      this.ffmpeg.FS('writeFile', 'input-video.mp4', videoData);
      this.ffmpeg.FS('writeFile', 'input-audio1.mp3', audioData1);
      this.ffmpeg.FS('writeFile', 'input-audio2.mp3', audioData2);

      // Create concat list file
      this.ffmpeg.FS('writeFile', 'concat-list.txt', "file 'input-audio1.mp3'\nfile 'input-audio2.mp3'");

      // Merge audio files
      await this.ffmpeg.run(
        '-f', 'concat',
        '-safe', '0',
        '-i', 'concat-list.txt',
        '-c', 'copy',
        'combined-audio.mp3'
      );

      // Merge video with combined audio
      await this.ffmpeg.run(
        '-i', 'input-video.mp4',
        '-i', 'combined-audio.mp3',
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-shortest',
        'output.mp4'
      );

      // Read the output file
      const outputData = this.ffmpeg.FS('readFile', 'output.mp4');

      // Create a blob URL for preview
      const blob = new Blob([outputData.buffer], { type: 'video/mp4' });
      this.mergedVideoUrl = URL.createObjectURL(blob);

      // Log the URL and set it in the video URL service
      console.log('Merged Video URL:', this.mergedVideoUrl);
      this.videoUrlService.setVideoUrl(this.mergedVideoUrl);

      // Update status
      this.statusMessage = 'Media merged successfully!';

      // Trigger video preview
      if (this.videoPlayer) {
        const videoElement = this.videoPlayer.nativeElement;
        videoElement.src = this.mergedVideoUrl;
        videoElement.load();
      }
    } catch (error) {
      console.error('Merge process error:', error);
      this.statusMessage = this.handleErrorMessage(error);
    } finally {
      this.isProcessing = false;
    }
  }

  private handleErrorMessage(error: any): string {
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        return 'Network error. Check your media URLs.';
      }
      if (error.message.includes('SharedArrayBuffer')) {
        return 'Browser does not support advanced media processing.';
      }
    }
    return 'Processing failed. Check console for details.';
  }
}