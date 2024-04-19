import { auth } from "@clerk/nextjs";

import DataView from "@/components/dataView";
import { filterBySearch } from "@/services/filterService";
import { fetchFiles, fetchFilesWithSubfolders } from "@/services/fileService";

type Props = {
  searchParams: {
    q?: string;
  };
};

const LockerPage = async ({ searchParams }: Props) => {
  const { userId } = auth();

  if (searchParams.q) {
    const { data, error } = await fetchFilesWithSubfolders(userId!);
    const filteredData = filterBySearch(data, searchParams.q);

    return <DataView data={filteredData} error={error} />;
  }
  
  const { data, error } = await fetchFiles(userId!);
  return <DataView data={data} error={error} />;
};

export default LockerPage;
