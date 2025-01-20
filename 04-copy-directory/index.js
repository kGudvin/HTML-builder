const fs = require('fs/promises');
const path = require('path');

async function copyDir(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else if (entry.isFile()) {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    console.error('Error copying directory:', error.message);
  }
}
(async () => {
  const srcFolder = path.join(__dirname, 'files');
  const destFolder = path.join(__dirname, 'files-copy');

  try {
    await fs.rm(destFolder, { recursive: true, force: true });
    await copyDir(srcFolder, destFolder);
    console.log('Directory copied successfully.');
  } catch (error) {
    console.error('Error during directory copy operation:', error.message);
  }
})();
