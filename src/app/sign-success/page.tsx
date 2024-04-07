"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { database } from "@/lib/firebase";
import { STORAGE_PLANS } from "@/utils/constants";

const SignSuccessPage = () => {
  const router = useRouter();
  const { userId } = useAuth();

  useEffect(() => {
    const createUserDocIfNotExists = async () => {
      try {
        if (userId) {
          const docRef = doc(database, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) return router.push("/locker");

          await setDoc(docRef, {
            userId: userId,
            plan: STORAGE_PLANS.free.name,
            limit: STORAGE_PLANS.free.limit,
          });

          return router.push("/locker");
        }
      } catch {
        return router.push("/locker");
      }
    };

    userId && createUserDocIfNotExists();
  }, [userId, router]);

  return (
    <div className="w-full h-[600px] flex items-center justify-center">
      <div>
        <h1 className="text-4xl">Authentication successful!</h1>
        <p className="text-2xl mt-2">
          You are redirecting to your storage...
        </p>
      </div>
    </div>
  );
};

export default SignSuccessPage;
