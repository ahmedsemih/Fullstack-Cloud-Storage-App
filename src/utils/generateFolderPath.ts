export default function generateFolderPath(folders: string[], user: string) {
  const fullPath = `/${user}/` + folders.join("/");
  return fullPath.replace(/%20/, " ");
}
