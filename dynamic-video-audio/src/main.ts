

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent  } from './app/app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent , {
  ...appConfig,
  providers: [
    importProvidersFrom(ReactiveFormsModule)
  ]
}).catch(err => console.error(err));