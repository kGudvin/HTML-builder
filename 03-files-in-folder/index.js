const fs = require('fs');
const path = require('path');

try {
  const folderPath = path.join(__dirname, 'secret-folder');

  const files = fs.readdirSync(folderPath, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(folderPath, file.name);
      const fileStats = fs.statSync(filePath);
      const fileName = path.parse(file.name).name;
      const fileExtension = path.extname(file.name).slice(1);
      const fileSizeInKB = (fileStats.size / 1024).toFixed(3);
      console.log(`${fileName} - ${fileExtension} - ${fileSizeInKB}kb`);
    }
  });
} catch (error) {
  console.error('Error reading the folder:', error.message);
}
