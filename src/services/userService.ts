import {
  DocumentData,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { database } from "@/lib/firebase";
import { STORAGE_PLANS } from "@/utils/constants";
import { fetchFilesWithSubfolders } from "./fileService";

export const fetchUserPlanAndLimit = async (userId: string) => {
  let data: DocumentData | null = null;
  let error = null;

  try {
    const docRef = doc(database, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const user = docSnap.data();
      data = user;
    }
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

export const createSubscription = async (
  userId: string,
  plan: keyof typeof STORAGE_PLANS,
  customer: string,
  subscription: string
) => {
  let data;
  let error = null;

  try {
    const docRef = doc(database, "users", userId);

    await setDoc(docRef, {
      userId,
      plan: STORAGE_PLANS[plan].name,
      limit: STORAGE_PLANS[plan].limit,
      customer,
      subscription,
    });

    data = {
      message: `Successfully subscribed to ${plan} plan.`,
    };
  } catch (err) {
    error = err;
  }

  return { data, error };
};

export const changeSubscription = async (
  userId: string,
  subscription: string,
  plan: keyof typeof STORAGE_PLANS,
) => {
  let data;
  let error = null;

  try {
    const docRef = doc(database, "users", userId);

    updateDoc(docRef, {
      plan: STORAGE_PLANS[plan].name,
      limit: STORAGE_PLANS[plan].limit,
      subscription,
    });

    data = { message: "Your subscription changed successfully." };
  } catch (err) {
    error = err;
  }

  return { data, error };
};
