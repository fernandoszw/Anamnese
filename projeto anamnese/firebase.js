import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCYpk2SEg30QXq2qf4V9OIpHFXlfsKG9g",
  authDomain: "ficha-de-anamnese-17e6d.firebaseapp.com",
  databaseURL: "https://ficha-de-anamnese-17e6d-default-rtdb.firebaseio.com",
  projectId: "ficha-de-anamnese-17e6d",
  storageBucket: "ficha-de-anamnese-17e6d.firebasestorage.app",
  messagingSenderId: "365449308836",
  appId: "1:365449308836:web:7296b4ad6aaf5b78801431"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };