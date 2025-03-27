import { bootstrapApplication } from '@angular/platform-browser';
import { Mp3Component } from './app/mp3/mp3.component';

bootstrapApplication(Mp3Component)
  .catch(err => console.error(err));
