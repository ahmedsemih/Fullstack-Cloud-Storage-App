export default function generateFolderPath(folders: string[], user: string) {
    return `/${user}/` + folders.join('/');
}