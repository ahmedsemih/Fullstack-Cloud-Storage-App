import { auth } from "@clerk/nextjs";

import DataView from "@/components/dataView";
import { fetchFiles } from "@/services/fileService";
import { filterBySearch } from "@/services/filterService";

type Props = {
  searchParams: {
    q?: string;
  };
};

const LockerPage = async ({ searchParams }: Props) => {
  const { userId } = auth();

  const { data, error } = await fetchFiles(userId!);
  const filteredData = filterBySearch(data, searchParams.q);

  return <DataView data={filteredData} error={error} />;
};

export default LockerPage;
