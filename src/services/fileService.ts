import {
  StorageReference,
  deleteObject,
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
} from "firebase/storage";
import { collection, getDocs, query, where } from "firebase/firestore";

import { database, storage } from "@/lib/firebase";

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
      const { name, size, contentType, updated, fullPath } = await getMetadata(
        files[i]
      );

      if (name !== ".ghostfile") {
        const downloadUrl = await getDownloadURL(files[i]);

        data.push({
          name,
          size,
          type: contentType!,
          lastModification: updated,
          path: fullPath,
          downloadUrl,
        });
      }
    }
  } catch (err) {
    error = err;
  }

  return { data, error };
};

export const fetchStarredFiles = async (userId: string) => {
  const data: FileType[] = [];
  let error = null;

  try {
    const q = query(
      collection(database, "starred"),
      where("userId", "==", userId)
    );
    const querySnapshots = await getDocs(q);
    let starredPaths: string[] = [];

    querySnapshots.forEach((starred) => {
      starredPaths.push(starred.data().path);
    });

    for (let i = 0; i < starredPaths.length; i++) {
      const starredRef = ref(storage, starredPaths[i]);

      const { name, size, contentType, updated, fullPath } = await getMetadata(starredRef);

      if (name !== ".ghostfile") {
        const downloadUrl = await getDownloadURL(starredRef);

        data.push({
          name,
          size,
          type: contentType!,
          lastModification: updated,
          path: fullPath,
          downloadUrl,
        });
      }
    }
  } catch (err) {
    error = err;
  }

  return { data, error };
};

export const deleteFile = async (path: string) => {
  let data = null;
  let error = null;

  try {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);

    data = {
      message: "File deleted successfully.",
    };
  } catch (err) {
    error = err;
  }

  return { data, error };
};
