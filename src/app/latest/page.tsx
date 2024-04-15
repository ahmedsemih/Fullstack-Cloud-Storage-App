import { auth } from "@clerk/nextjs";

import Options from "@/components/options";
import DetailBox from "@/components/detailBox";
import GroupedView from "@/components/groupedView";
import { fetchFilesWithSubfolders } from "@/services/fileService";

const LatestPage = async () => {
  const { userId } = auth();
  const { data, error } = await fetchFilesWithSubfolders(userId!);

  return (
    <div className="w-full relative">
      <Options hideUploadButton />
      <div className="flex flex-row gap-4 h-full">
        <GroupedView data={data} error={error} />
        <DetailBox />
      </div>
    </div>
  );
};

export default LatestPage;
