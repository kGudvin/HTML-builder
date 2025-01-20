const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  'Welcome! Enter text to add it to a file. Type "exit" or press "Ctrl+C" command to quit.',
);

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    farewellAndExit();
  } else {
    writeStream.write(input + '\n', (err) => {
      if (err) console.error('Error writing to file:', err.message);
    });
  }
});

process.on('SIGINT', farewellAndExit);

function farewellAndExit() {
  console.log('Goodbye! Your text has been saved.');
  writeStream.end(); // Close the write stream
  rl.close(); // Close the readline interface
  process.exit(); // Exit the process
}
