const fs = require('fs/promises');
const path = require('path');

(async () => {
  try {
    const stylesFolder = path.join(__dirname, 'styles');
    const outputFolder = path.join(__dirname, 'project-dist');
    const outputFile = path.join(outputFolder, 'allStyles.css');
    await fs.mkdir(outputFolder, { recursive: true });
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });
    const cssContent = [];
    for (const file of files) {
      const filePath = path.join(stylesFolder, file.name);
      if (file.isFile() && path.extname(file.name) === '.css') {
        const fileData = await fs.readFile(filePath, 'utf-8');
        cssContent.push(fileData);
      }
    }
    await fs.writeFile(outputFile, cssContent.join('\n'), 'utf-8');
    console.log('Styles have been bundled into allStyles.css');
  } catch (error) {
    console.error('Error building CSS allStyles.css:', error.message);
  }
})();