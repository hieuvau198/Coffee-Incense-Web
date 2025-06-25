// src/app/modules/firebase/auth.ts
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import Cookies from "js-cookie";

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
  // Thêm vào collection customers
  const customerDocRef = doc(db, "customers", user.uid);
  await setDoc(customerDocRef, {
    name: (userData.firstName || "") + " " + (userData.lastName || ""),
    email,
    phone: userData.phone || "",
    status: "active",
    totalBookings: 0,
    totalSpent: 0,
    lastBooking: "",
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

  if (!userDoc.exists()) {
    // Parse names from Google displayName
    let firstName = "";
    let lastName = "";
    if (user.displayName) {
      const nameParts = user.displayName.trim().split(" ");
      if (nameParts.length === 1) {
        firstName = nameParts[0];
      } else if (nameParts.length > 1) {
        firstName = nameParts.slice(0, -1).join(" "); // All but last
        lastName = nameParts.slice(-1)[0]; // Last word
      }
    }

    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      firstName,
      lastName,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      role: "customer",
      provider: "google",
      createdAt: new Date().toISOString()
    });
    // Thêm vào collection customers
    const customerDocRef = doc(db, "customers", user.uid);
    await setDoc(customerDocRef, {
      name: (firstName || "") + " " + (lastName || ""),
      email: user.email || "",
      phone: "",
      status: "active",
      totalBookings: 0,
      totalSpent: 0,
      lastBooking: "",
    });
    return { user, role: "customer" };
  } else {
    const userData = userDoc.data();
    return { user, role: userData.role };
  }
};

export const doSignOut = async () => {
  auth.signOut();
  Cookies.remove("user");
}
  

export const logout = async (): Promise<void | unknown> => {
  try {
    await auth.signOut();
    Cookies.remove("user");
  } catch (error) {
    return error;
  }
};