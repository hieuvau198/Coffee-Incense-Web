// src/app/modules/firebase/store.ts
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
  CollectionReference,
} from "firebase/firestore";
import { db } from "./firebase";

const generateRandomID = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 16 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
};

export const createData = async <T extends object>(collectionName: string, data: T): Promise<void> => {
  const id = generateRandomID();
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, { id, ...data });
};

export const readData = async <T = any>(collectionName: string, id: string): Promise<T | undefined> => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as T) : undefined;
};

export const updateData = async <T extends object>(collectionName: string, id: string, data: T): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, { id, ...data });
};

export const deleteData = async (collectionName: string, id: string): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

export const readAllData = async <T = any>(collectionName: string): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => doc.data() as T);
};

export const listenToCollection = <T = any>(collectionName: string, callback: (data: T[]) => void) => {
  const collectionRef = collection(db, collectionName);
  return onSnapshot(collectionRef, (querySnapshot) => {
    const newDataArr = querySnapshot.docs.map(doc => doc.data() as T);
    callback(newDataArr);
  });
};