import { database } from "@/lib/firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";

export const fetchUserPlanAndLimit = async (userId: string) => {
  let data: DocumentData | null = null;
  let error = null;

  try {
    const docRef = doc(database, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) data = docSnap.data();
  } catch (err) {
    error = err;
  }

  return { data, error };
};
