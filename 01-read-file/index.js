const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
readStream.on('data', (chunk) => {
  process.stdout.write(chunk);
});
readStream.on('error', (err) => {
  console.error('Error reading the file:', err.message);
});
