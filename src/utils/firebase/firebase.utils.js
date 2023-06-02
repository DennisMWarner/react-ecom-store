import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD8Mdqj8nHIL5R7ztAIOySvtPOUk3-LamI",
  authDomain: "ecom-store-db-a34df.firebaseapp.com",
  projectId: "ecom-store-db-a34df",
  storageBucket: "ecom-store-db-a34df.appspot.com",
  messagingSenderId: "581126546424",
  appId: "1:581126546424:web:c96927416676884231ac0d"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const userAuth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(userAuth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(userAuth, googleProvider)

export const db = getFirestore();

export const creatUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log("user: ", userSnapshot)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation })
    }
    catch (e) {
      console.log(e)
    }
  }

  return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password, displayName) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(userAuth, email, password)
}