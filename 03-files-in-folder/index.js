const fs = require('fs/promises');
const path = require('path');

(async () => {
  try {
    const folderPath = path.join(__dirname, 'secret-folder');
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const fileStatistic = await fs.stat(filePath);
        const fileName = path.parse(file.name).name;
        const fileExtension = path.extname(file.name).slice(1);
        const fileSizeKb = (fileStatistic.size / 1024).toFixed(2);
        console.log(`${fileName} - ${fileExtension} - ${fileSizeKb}kb`);
      }
    }
  } catch (error) {
    console.error('Error reading the folder:', error.message);
  }
})();
