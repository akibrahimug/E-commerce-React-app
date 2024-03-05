import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  //   signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  // observable listener, able to help us hook in to streams of events
  // like signin signout ...
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
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

export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  // create the collection
  const collectionRef = collection(db, collectionKey);

  // store the documents in the collect --transaction
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    // set the location with the obj
    batch.set(docRef, obj);
  });
  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocument = async () => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

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

export const signOutUser = async () => await signOut(auth);

// invoke/ call this whenever a user signs in or out
export const onAuthStateChangedListener = (callback) =>
  // this is an open listener waiting for any changes
  // we need to find a way to stop it
  onAuthStateChanged(auth, callback);
