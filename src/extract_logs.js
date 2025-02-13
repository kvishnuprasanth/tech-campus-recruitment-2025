const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'logs.txt'); 

function binarySearch(logFile, date) {
    const lines = fs.readFileSync(logFile, 'utf8').split('\n');
    let left = 0, right = lines.length - 1, mid;
    
    while (left <= right) {
        mid = Math.floor((left + right) / 2);
        let logDate = lines[mid].substr(0, 10); 

        if (logDate === date) {
            while (mid > 0 && lines[mid - 1].substr(0, 10) === date) {
                mid--;
            }
            return mid;
        } else if (logDate < date) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;  
}

function extractLogs(date) {
    if (!fs.existsSync(logFile)) {
        console.error("Error: Log file not found.");
        return;
    }

    const lines = fs.readFileSync(logFile, 'utf8').split('\n');
    const startIndex = binarySearch(logFile, date);

    if (startIndex === -1) {
        console.log(`No logs found for ${date}.`);
        return;
    }

    const outputDir = 'output';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const outputFilePath = path.join(outputDir, `output_${date}.txt`);
    const filteredLogs = [];

    for (let i = startIndex; i < lines.length; i++) {
        const logDate = lines[i].substr(0, 10);
        if (logDate === date) {
            filteredLogs.push(lines[i]);
        } else if (logDate > date) {
            break;
        }
    }

    fs.writeFileSync(outputFilePath, filteredLogs.join('\n'));
    console.log(`Logs for ${date} saved to ${outputFilePath}`);
}

if (process.argv.length !== 3) {
    console.log(`Usage: node extract_logs.js <YYYY-MM-DD>`);
    process.exit(1);
}

const date = process.argv[2];
extractLogs(date);
