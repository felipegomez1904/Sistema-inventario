import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'pro-gruas',
        appId: '1:349115072106:web:46771744156ff91fb41413',
        storageBucket: 'pro-gruas.firebasestorage.app',
        apiKey: 'AIzaSyC14L8BhXIitqhzNQzQTpVDRZZoMoG_Zng',
        authDomain: 'pro-gruas.firebaseapp.com',
        messagingSenderId: '349115072106',
      })
    ),
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()), 
    provideStorage(() => getStorage()), 
    ReactiveFormsModule, 
    provideAnimations(),
  ],
};


