import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOL25HTLkY1erujoWndYhaAEvHUuFuO_w",
  authDomain: "career-ai-2b0ab.firebaseapp.com",
  projectId: "career-ai-2b0ab",
  storageBucket: "career-ai-2b0ab.firebasestorage.app",
  messagingSenderId: "791871220034",
  appId: "1:791871220034:web:1ccb87bfa581476fff00db",
  measurementId: "G-TQW9K0SEYB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export async function ensureAnonymousAuth() {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
}
