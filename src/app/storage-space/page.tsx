import { auth } from "@clerk/nextjs";

import {
  fetchUserPlanAndLimit,
  fetchUserRemainingSpace,
} from "@/services/userService";
import Options from "@/components/options";
import DetailBox from "@/components/detailBox";
import SpaceView from "@/components/spaceView";
import { fetchFilesWithSubfolders } from "@/services/fileService";

const StorageSpacePage = async () => {
  const { userId } = auth();

  const { data, error } = await fetchFilesWithSubfolders(userId!);
  const { data: userPlan, error: planError } = await fetchUserPlanAndLimit(
    userId!
  );
  const { remainingSpace, error: spaceError } = await fetchUserRemainingSpace(
    userId!
  );

  return (
    <div className="w-full xl:h-[calc(100vh-218px)] relative">
      <h1 className="text-xl capitalize mt-6 font-semibold">Storage Space</h1>
      <div className="w-full">
        <SpaceView
          data={data}
          remainingSpace={remainingSpace}
          userPlan={userPlan as PlanType}
          error={error || planError || spaceError}
        />
      </div>
    </div>
  );
};

export default StorageSpacePage;
