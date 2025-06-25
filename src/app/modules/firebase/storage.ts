// src\app\modules\firebase\storage.ts
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file: File, folder: string): Promise<string> => {
  try {
    const storage = getStorage();
    const timestamp = new Date().getTime();
    const fileName = `${folder}/${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);

    // Upload file
    await uploadBytes(storageRef, file);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}; 