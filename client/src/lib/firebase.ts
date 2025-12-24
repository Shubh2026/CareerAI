import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDBAVIhFiqX4mwKnGpBICZIdnahQBroKus",
    authDomain: "ai-career-e4ac2.firebaseapp.com",
    projectId: "ai-career-e4ac2",
    storageBucket: "ai-career-e4ac2.firebasestorage.app",
    messagingSenderId: "218047253424",
    appId: "1:218047253424:web:85356ada266c799bff6475",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const ensureAnonymousAuth = async () => {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
};