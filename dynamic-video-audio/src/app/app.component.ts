import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Customer {
  name: string;
  id: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  customers: Customer[] = [
    { name: 'John Doe', id: '123' },
    { name: 'Jane Smith', id: '456' },
    { name: 'Alex Brown', id: '789' },
  ];

  selectedCustomer: Customer | null = null;
  private speechUtterance: SpeechSynthesisUtterance | null = null;

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;
    video.muted = true; // Ensure video is silent

    // Check Speech Synthesis support
    if ('speechSynthesis' in window) {
      console.log('Speech Synthesis API is supported');
      // Pre-warm the API to avoid initialization delay
      const testUtterance = new SpeechSynthesisUtterance('');
      window.speechSynthesis.speak(testUtterance);
      window.speechSynthesis.cancel();
      console.log('Speech Synthesis pre-warmed');
    } else {
      console.error('Speech Synthesis API is not supported in this browser');
    }
  }

  onCustomerChange() {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      video.pause();
      video.currentTime = 0;
      this.stopAudio();
    }
    if (this.selectedCustomer) {
      this.preloadAudio(); // Preload TTS when customer is selected
    }
  }

  onVideoPlay() {
    if (this.selectedCustomer) {
      console.log('Video play event triggered');
      if (!this.speechUtterance) {
        this.preloadAudio(); // Ensure TTS is preloaded
      }
      this.playDynamicAudio();
    } else {
      console.log('No customer selected');
    }
  }

  onVideoPause() {
    console.log('Video paused');
    this.stopAudio();
  }

  preloadAudio() {
    if (!this.selectedCustomer) return;

    const { name, id } = this.selectedCustomer;
    const text = `"Meet [Your Brand Name]—the ultimate solution to [problem]; say goodbye to [pain point] and enjoy [key benefits] effortlessly—try it today!" 🚀`;
    console.log('Preloading TTS with text:', text);

    this.speechUtterance = new SpeechSynthesisUtterance(text);
    this.speechUtterance.volume = 1.0;
    this.speechUtterance.rate = 1.0;
    this.speechUtterance.pitch = 1.0;

    this.speechUtterance.onstart = () => console.log('TTS started');
    this.speechUtterance.onend = () => console.log('TTS ended');
    this.speechUtterance.onerror = (event) => console.error('TTS error:', event.error);
  }

  playDynamicAudio() {
    if (!this.speechUtterance) {
      console.error('No preloaded TTS available, cannot play');
      return; // Exit if TTS isn’t preloaded
    }

    this.stopAudio(); // Clear any existing audio
    window.speechSynthesis.resume(); // Ensure API is active
    window.speechSynthesis.speak(this.speechUtterance); // Type-safe: speechUtterance is guaranteed non-null here
    console.log('TTS play command issued');
  }

  stopAudio() {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
      console.log('Audio stopped');
    }
    // Keep the preloaded utterance intact for reuse
  }
}