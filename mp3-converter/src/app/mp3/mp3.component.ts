import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mp3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Text to MP3</h2>
      <textarea [(ngModel)]="text" placeholder="Enter text..."></textarea>
      <button (click)="convertToMp3()" [disabled]="!text">Convert to MP3</button>

      <div *ngIf="mp3Url">
        <p>MP3 Generated:</p>
        <audio controls [src]="mp3Url"></audio>
        <a [href]="mp3Url" download="speech.mp3">Download MP3</a>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 400px; margin: auto; text-align: center; }
    textarea { width: 100%; height: 100px; margin-bottom: 10px; }
    button { padding: 10px 20px; cursor: pointer; }
  `]
})
export class Mp3Component {
  text: string = '';
  mp3Url: string | null = null;

  async convertToMp3() {
    if (!this.text) return;

    const apiUrl = `https://api.voicerss.org/?key=669e4649acd248caa3ebcbcba620a7f7&hl=en-us&src=${encodeURIComponent(this.text)}`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch MP3');

      this.mp3Url = apiUrl;
      console.log('Generated MP3 URL:', this.mp3Url);
    } catch (error) {
      console.error('MP3 conversion error:', error);
    }
  }
}
