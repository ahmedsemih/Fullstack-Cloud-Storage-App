export default function calculateTotalSize(files: FileList) {
  let totalSize = 0;

  for (let i = 0; i < files.length; i++) {
    totalSize += files[i].size;
  }

  return totalSize;
}
