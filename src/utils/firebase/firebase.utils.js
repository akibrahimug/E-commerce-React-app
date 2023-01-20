import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  //   signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4iDCsZKH4CymZ1g-nYBoPhkItS1_jsIc",
  authDomain: "e-commerce-react-4b3f9.firebaseapp.com",
  projectId: "e-commerce-react-4b3f9",
  storageBucket: "e-commerce-react-4b3f9.appspot.com",
  messagingSenderId: "1047994480984",
  appId: "1:1047994480984:web:5ff5504908cd4e96514d2d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

// All providers
// POPUP
// export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// Redirects you to google page
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

// Firebase Db
export const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //   if user data dosent exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // create and set the document with data from userAuth into my firestore collection
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (e) {
      console.log("error creating the user", e.message);
    }
    // if user data dose exists
    return userDocRef;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPasswords = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
