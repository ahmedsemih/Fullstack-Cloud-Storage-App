import { fetchFiles } from "@/services/fileService";
import { fetchUserPlanAndLimit } from "@/services/userService";

export default async function calculateUserLeftSize(userId: string){
    const { data: files } = await fetchFiles(userId);
    const { data: userPlan } = await fetchUserPlanAndLimit(userId);

    if(!userPlan) return 0;

    const totalUsageSize = files.reduce((a, b) => {
      return (a += b.size);
    }, 0);
    
    return userPlan.limit - totalUsageSize;
  };