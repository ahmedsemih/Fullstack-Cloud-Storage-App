import { auth } from "@clerk/nextjs";

import DataView from "@/components/dataView";
import { fetchFiles } from "@/services/fileService";
import generateFolderPath from "@/utils/generateFolderPath";

type Props = {
  params: {
    subFolders: string[];
  };
};

const SubFolderPage = async ({ params }: Props) => {
  const { userId } = auth();

  const path = generateFolderPath(params.subFolders, userId!);
  const { data, error } = await fetchFiles(path);

  return <DataView data={data} error={error} />;
};

export default SubFolderPage;
