const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'files');

// Ensure the base directory exists
if (!fs.existsSync(baseDir)){
    fs.mkdirSync(baseDir);
}

const createFile = (fileName, content) => {
    const filePath = path.join(baseDir, fileName);
    fs.writeFile(filePath, content, (err) => {
        if (err) throw err;
        console.log(`File ${fileName} created successfully.`);
    });
};

const readFile = (fileName) => {
    const filePath = path.join(baseDir, fileName);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(`Content of ${fileName}:\n${data}`);
    });
};

const updateFile = (fileName, newContent) => {
    const filePath = path.join(baseDir, fileName);
    fs.appendFile(filePath, newContent, (err) => {
        if (err) throw err;
        console.log(`File ${fileName} updated successfully.`);
    });
};

const deleteFile = (fileName) => {
    const filePath = path.join(baseDir, fileName);
    fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log(`File ${fileName} deleted successfully.`);
    });
};

// Command-line interface
const [,, command, fileName, ...rest] = process.argv;
const content = rest.join(' ');

switch (command) {
    case 'create':
        createFile(fileName, content);
        break;
    case 'read':
        readFile(fileName);
        break;
    case 'update':
        updateFile(fileName, content);
        break;
    case 'delete':
        deleteFile(fileName);
        break;
    default:
        console.log('Invalid command. Use "create", "read", "update", or "delete".');
}
