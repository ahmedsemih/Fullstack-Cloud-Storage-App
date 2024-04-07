import { storage } from "@/lib/firebase";
import { getMetadata, listAll, ref } from "firebase/storage";

export const fetchFiles = async (path: string) => {
  const data: FileType[] = [];
  let error = null;

  try {
    const folderRef = ref(storage, path);
    const listRef = await listAll(folderRef);

    const folders = listRef.prefixes;
    const files = listRef.items;

    for (let i = 0; i < folders.length; i++) {
      data.push({
        name: folders[i].name,
        size: 0,
        type: "folder",
        path: folders[i].fullPath,
      });
    }

    for (let i = 0; i < files.length; i++) {
      const metadata = await getMetadata(files[i]);

      if (metadata.name !== ".ghostfile")
        data.push({
          name: metadata.name,
          size: metadata.size,
          type: metadata.contentType!,
          lastModification: metadata.updated,
          path: metadata.fullPath,
        });
    }
  } catch (err) {
    error = err;
  }

  return { data, error };
};
