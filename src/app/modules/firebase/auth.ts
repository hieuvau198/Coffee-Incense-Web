// src/app/modules/firebase/auth.ts
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (
  email: string,
  password: string,
  userData: Record<string, any>
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const userDocRef = doc(db, "users", user.uid);
  await setDoc(userDocRef, {
    ...userData,
    uid: user.uid,
    email,
    role: "customer",
    password,
  });
  return user;
};

export const signIn = async (email: string, password: string): Promise<{ user: User; role: string }> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    return { user, role: userData.role };
  } else {
    throw new Error("No such user document!");
  }
};

export const doSignInWithGoogle = async (): Promise<{ user: User; role: string }> => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    return { user, role: userData.role };
  } else {
    throw new Error("No such user document!");
  }
};

export const doSignOut = () => auth.signOut();

export const logout = async (): Promise<void | unknown> => {
  try {
    await auth.signOut();
  } catch (error) {
    return error;
  }
};