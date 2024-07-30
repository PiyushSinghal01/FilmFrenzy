import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkFNGCvPM7miuOVh6V8JFYP3Sd3QBk5Ak",
  authDomain: "bookishview-8dee3.firebaseapp.com",
  projectId: "bookishview-8dee3",
  storageBucket: "bookishview-8dee3.appspot.com",
  messagingSenderId: "106767952104",
  appId: "1:106767952104:web:e80267c124c928fd13815d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");
 
// export const auth = getAuth(app);

export default app;