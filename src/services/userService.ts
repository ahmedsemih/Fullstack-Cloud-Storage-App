import { DocumentData, doc, getDoc } from "firebase/firestore";

import { database } from "@/lib/firebase";
import { fetchFilesWithSubfolders } from "./fileService";

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

export const fetchUserRemainingSpace = async (userId: string) => {
  let remainingSpace: number = 0;
  let error = null;

  try {
    const { data: files } = await fetchFilesWithSubfolders(userId);
    const { data: userPlan } = await fetchUserPlanAndLimit(userId);

    if (!userPlan) return { remainingSpace, error };

    const totalUsageSize = files.reduce((a, b) => {
      return (a += b.size);
    }, 0);

    remainingSpace = userPlan.limit - totalUsageSize;
  } catch (err) {
    error = err;
  }

  return { remainingSpace, error };
};
