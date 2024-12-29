import fs from 'fs';
import path from 'path';

/**
 * Deletes a file from the filesystem.
 * @param filePath - The path to the file to delete.
 */
export const deleteFile = (filePath: string): void => {
  if (!filePath) return;

  const absolutePath = path.resolve(filePath); // Resolve to absolute path
  fs.unlink(absolutePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${absolutePath}`, err);
    } else {
      console.log(`Successfully deleted file: ${absolutePath}`);
    }
  });
};
