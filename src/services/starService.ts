import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { database } from "@/lib/firebase";

export const checkIsStarred = async (
  path: string
): Promise<{ data: null | { id: string }; error: unknown }> => {
  let data = null;
  let error = null;

  try {
    const collectionRef = collection(database, "starred");
    const q = query(collectionRef, where("path", "==", path));

    const querySnapshot = await getDocs(q);

    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        return (data = { id: doc.id });
      });
    }
  } catch (err) {
    error = err;
  }

  return { data, error };
};

export const addStar = async (userId: string, path: string) => {
  let data = null;
  let error = null;

  try {
    const collectionRef = collection(database, "starred");
    const docRef = await addDoc(collectionRef, {
      userId,
      path,
    });

    data = {
      id: docRef.id,
      path: docRef.path,
      message: "Star added successfully.",
    };
  } catch (err) {
    error = err;
  }

  return { data, error };
};

export const removeStar = async (id: string) => {
  let data = null;
  let error = null;

  try {
    const docRef = doc(database, "starred", id);
    await deleteDoc(docRef);

    data = {
      message: "Star removed successfully.",
    };
  } catch (err) {
    error = err;
  }

  return { data, error };
};
