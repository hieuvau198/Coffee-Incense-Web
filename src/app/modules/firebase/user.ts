// src\app\modules\firebase\user.ts
import { db, storage } from './firebase';
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  deleteDoc
} from 'firebase/firestore';
import { User } from '../../models/user';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';


const usersCollection = collection(db, 'users');

export const getUsers = async (): Promise<User[]> => {
  const querySnapshot = await getDocs(usersCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
};

export const getUserById = async (id: string): Promise<User | null> => {
  const docRef = doc(usersCollection, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as User;
  }
  return null;
};

export const subscribeToUsers = (callback: (users: User[]) => void) => {
  return onSnapshot(usersCollection, (snapshot: QuerySnapshot<DocumentData>) => {
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    callback(users);
  });
}; 

export const updateUser = async (id: string, data: Partial<User>): Promise<void> => {
  const userDocRef = doc(usersCollection, id);
  await updateDoc(userDocRef, data);
};

export const deleteUser = async (id: string): Promise<void> => {
  const userDocRef = doc(usersCollection, id);
  await deleteDoc(userDocRef);
};


export const uploadProfileImage = async (userId: string, file: File): Promise<string> => {
  const storageRef = ref(storage, `avatars/${userId}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const deleteProfileImage = async (userId: string): Promise<void> => {
  const storageRef = ref(storage, `avatars/${userId}`);
  await deleteObject(storageRef).catch(() => {}); // ignore if file doesn't exist
};