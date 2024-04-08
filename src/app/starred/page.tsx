import { auth } from "@clerk/nextjs";

import Options from "@/components/options";
import DataView from "@/components/dataView";
import DetailBox from "@/components/detailBox";
import { fetchStarredFiles } from "@/services/fileService";

const StarredPage = async () => {
  const { userId } = auth();
  const { data, error } = await fetchStarredFiles(userId!);

  return (
    <div className="w-full xl:h-[calc(100vh-218px)]">
      <Options hideUploadButton />
      <div className="flex flex-row gap-4 h-full">
        <div className="w-full">
          <DataView data={data} error={error} />
        </div>
        <DetailBox />
      </div>
    </div>
  );
};

export default StarredPage;
