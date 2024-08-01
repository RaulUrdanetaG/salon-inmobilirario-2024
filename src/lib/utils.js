// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "multirepos.firebaseapp.com",
  projectId: "multirepos",
  storageBucket: "multirepos.appspot.com",
  messagingSenderId: "543787682717",
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: "G-7D3MCCEZMR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function uploadToDb(name, email, id, phone, prize) {
  try {
    const docRef = await setDoc(doc(db, "DBSalonInmueble", email), {
      nombre: name,
      correo: email,
      cedula: id,
      telefono: phone,
      premio: prize,
      fecha: Timestamp.now(),
    });
    console.log(docRef);
  } catch (error) {
    console.log(error);
  }
}
