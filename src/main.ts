import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { setLogLevel, LogLevel } from '@angular/fire';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { getAuth, provideAuth } from '@angular/fire/auth';

/**
 * @description Firebase configuration object containing API keys and project identifiers.
 */
const firebaseConfig = {
  apiKey: "AIzaSyAsc9ZmtYpXCFUIgupsjoi2Za97p59yXgk",
  authDomain: "join-f599b.firebaseapp.com",
  projectId: "join-f599b",
  storageBucket: "join-f599b.firebasestorage.app",
  messagingSenderId: "485703034081",
  appId: "1:485703034081:web:55489768cccc8ad9ca03a0",
  measurementId: "G-LC3EMJV3MH"
};

/**
 * Sets the Firebase log level to verbose, but only when running in a browser environment.
 */
if (typeof window !== 'undefined') {
  setLogLevel(LogLevel.VERBOSE);
}

/**
 * @description Conditionally creates and returns Firebase providers only when the application
 * is running in a browser environment. This prevents errors during Server-Side Rendering (SSR).
 * @returns {any[]} An array of Firebase providers or an empty array if not in a browser.
 */
const getFirebaseProviders = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return [];
  }

  return [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ];
};

/**
 * @description Bootstraps the Angular application.
 * It merges the base application config with browser-specific providers like animations
 * and Firebase services.
 */
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideAnimations(),
    ...getFirebaseProviders(),
    provideAuth(() => getAuth()),
  ],
}).catch((err) => console.error(err));
