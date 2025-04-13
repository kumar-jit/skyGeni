// currentDir.mjs
import { fileURLToPath } from 'url';
import fileSystem from 'fs';
import { join,dirname } from 'path';

import { ErrorHandler } from './customeErrorHandler.js';


// Get the current directory path
const __currFilename = fileURLToPath(import.meta.url);
const __dirname = dirname(__currFilename);

/**
 * Reads a JSON file synchronously and returns the parsed data.
 * @param {string} fileName - The name of the JSON file (without extension).
 * @returns {Object} - The parsed JSON data.
 * @throws {ErrorHandler} - Throws an error if the file cannot be read or parsed.
 */
export const readJsonData = (fileName) => {
    const filePath = `../data/${fileName}.json`;

    // Use __dirname to get the absolute path of the current directory
    try {
        const data = fileSystem.readFileSync(join(__dirname, filePath), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new ErrorHandler(500, `Error reading file: ${fileName}.json`);
    }
}

