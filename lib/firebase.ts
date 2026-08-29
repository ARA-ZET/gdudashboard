'use client';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

/**
 * Firebase web config for the existing `gdu-dashboard` project.
 * These are PUBLIC client keys (safe to ship); access is enforced by
 * Firebase Auth + Firestore security rules (see firestore.rules).
 * Values can be overridden with NEXT_PUBLIC_FIREBASE_* env vars.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCff_CmqWE1CymgZR1d61pMC9McmudUKig',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'gdu-dashboard.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'gdu-dashboard',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'gdu-dashboard.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID || '505881172582',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:505881172582:web:3b34089fc510212370aba7',
};

export const firebaseApp: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth: Auth = getAuth(firebaseApp);
export const db: Firestore = getFirestore(firebaseApp);
