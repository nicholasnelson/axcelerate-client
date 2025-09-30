#!/usr/bin/env node

/**
 * API Documentation Generator
 * 
 * This script processes raw API documentation data and generates organized JSON files
 * for each API endpoint. It performs the following operations:
 * 
 * 1. Reads raw API documentation from data/rawDocs.js
 * 2. Cleans and parses JSON samples that were originally formatted for HTML display
 * 3. Organizes endpoints into a hierarchical folder structure based on API patterns
 * 4. Generates clean, parseable JSON files for each endpoint
 * 
 * Data Source:
 * The raw data in data/rawDocs.js is extracted from the HTML of:
 * https://app.axcelerate.com/apidocs/home/relaxer
 * 
 * Output Structure:
 * - docs/api/ - Main output directory
 * - Organized by API patterns (e.g., /user/login → docs/api/user/login.json)
 * - Path parameters preserved with colon syntax (e.g., :userID.json)
 * - JSON samples parsed from HTML-formatted strings to proper objects
 * 
 * Usage:
 *   node scripts/generate-api-docs.js
 * 
 * The script will:
 * - Clean the docs/api directory before generating new files
 * - Process all 117+ API resources
 * - Report parsing statistics and list files needing manual cleanup
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { jsonrepair } from 'jsonrepair';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the rawDocs.js file and create a temporary CommonJS version
let rawDocsContent = fs.readFileSync(path.join(__dirname, '../data/rawDocs.js'), 'utf8');

// Add module.exports at the end
rawDocsContent += '\nmodule.exports = $resources;';

// Write to a temporary file
const tempFile = path.join(__dirname, 'temp_rawDocs.cjs');
fs.writeFileSync(tempFile, rawDocsContent);

// Import the temporary file using createRequire
const require = createRequire(import.meta.url);
const $resources = require(tempFile);

// Clean up the temporary file
fs.unlinkSync(tempFile);

// Function to clean directory
function cleanDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                cleanDirectory(filePath);
                fs.rmdirSync(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        }
    }
}

// Function to convert PATTERN to file path with subfolders
function patternToFilePath(pattern) {
    if (!pattern) return null;
    
    // Remove leading slash and split into parts
    let pathParts = pattern.replace(/^\//, '').split('/');
    
    // Process each part to handle parameters
    pathParts = pathParts.map(part => {
        // Keep colons for parameter syntax (e.g., :invoiceID)
        // Remove -numeric suffix if present
        return part.replace(/-numeric$/, '');
    });
    
    // Create directory structure
    const fileName = pathParts.pop() || 'index';
    const dirPath = pathParts.join('/');
    
    return {
        dirPath: dirPath,
        fileName: fileName + '.json'
    };
}

// Function to create directory structure
function ensureDirectoryExists(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

// Function to clean JSON string for parsing as some of the JSON strings are not valid JSON
function cleanJsonString(jsonString) {
    if (typeof jsonString !== 'string') {
        return jsonString;
    }

    const cleanedString = jsonString
        .replaceAll(/[\n]/g, "") // Remove newlines from the string
        .replace(/},\s*{\s"CONTACTID": 5653,/, "{\"CONTACTID\": 5653,") // Manual fix for contacts/search.json
        .replaceAll(/<[^>]*>/g, tag => tag.replace(/"/g, "'")) // Replace " with ' in tags
        .replace(/Legacy:(.*)New \(Workflow Engine\):(.*)/, "{ legacy_response_format: $1, new_response_format: $2 }"); // Manual fix for followUp/:mtaskID.json
    return jsonrepair(cleanedString);
}

// Function to parse SAMPLES array
function parseSamples(samples) {
    if (!samples || !Array.isArray(samples)) {
        return samples;
    }
    
    return samples.map(sample => {
        if(sample.FORMAT && sample.FORMAT != 'json') return sample;

        if (sample.BODY === '') return sample;

        try {
            // Clean the JSON string before parsing
            const cleanedBody = cleanJsonString(sample.BODY);
            const parsedBody = JSON.parse(cleanedBody);
            return {
                ...sample,
                BODY: parsedBody
            };
        } catch (error) {
            // If all parsing attempts fail, keep the original BODY as string
            console.warn(`Failed to parse JSON in sample after cleanup: ${error.message}`);
            return sample;
        }
    });
}

// Clean the docs/api directory
const docsApiPath = path.join(__dirname, '../docs/api');
console.log('Cleaning docs/api directory...');
cleanDirectory(docsApiPath);

// Process each resource
console.log(`Processing ${Object.keys($resources).length} resources...`);

let processedCount = 0;
let errorCount = 0;
let parsedSamplesCount = 0;
let totalSamplesCount = 0;
let failedParseFiles = [];

for (const [resourceId, resource] of Object.entries($resources)) {
    try {
        const pattern = resource.PATTERN;
        
        if (!pattern) {
            console.warn(`Resource ${resourceId} has no PATTERN property, skipping...`);
            continue;
        }
        
        const pathInfo = patternToFilePath(pattern);
        if (!pathInfo) {
            console.warn(`Could not convert pattern "${pattern}" to file path for resource ${resourceId}`);
            continue;
        }
        
        // Create the full output path
        const outputDir = path.join(docsApiPath, pathInfo.dirPath);
        const outputPath = path.join(outputDir, pathInfo.fileName);
        
        // Ensure directory exists
        ensureDirectoryExists(outputPath);
        
        // Count samples for statistics
        if (resource.RESPONSE && resource.RESPONSE.SAMPLES) {
            totalSamplesCount += resource.RESPONSE.SAMPLES.length;
        }
        
        // Parse the SAMPLES array if it exists
        const processedResource = {
            ...resource,
            RESPONSE: resource.RESPONSE ? {
                ...resource.RESPONSE,
                SAMPLES: parseSamples(resource.RESPONSE.SAMPLES)
            } : resource.RESPONSE
        };
        
        // Count successfully parsed samples and track failures
        if (processedResource.RESPONSE && processedResource.RESPONSE.SAMPLES) {
            const originalSamples = resource.RESPONSE.SAMPLES || [];
            const processedSamples = processedResource.RESPONSE.SAMPLES;
            
            // Check if any samples failed to parse
            const hasFailedSamples = originalSamples.some((originalSample, index) => {
                const processedSample = processedSamples[index];
                return originalSample.FORMAT === 'json' && 
                       originalSample.BODY && 
                       processedSample.BODY && 
                       typeof processedSample.BODY === 'string';
            });
            
            if (hasFailedSamples) {
                const relativePath = pathInfo.dirPath ? 
                    `docs/api/${pathInfo.dirPath}/${pathInfo.fileName}` : 
                    `docs/api/${pathInfo.fileName}`;
                failedParseFiles.push(relativePath);
            }
            
            parsedSamplesCount += processedSamples.filter(sample => 
                sample.BODY && typeof sample.BODY === 'object'
            ).length;
        }
        
        // Write the resource as JSON
        fs.writeFileSync(outputPath, JSON.stringify(processedResource, null, 2));
        
        console.log(`✓ Created: ${pathInfo.dirPath ? pathInfo.dirPath + '/' : ''}${pathInfo.fileName}`);
        processedCount++;
        
    } catch (error) {
        console.error(`✗ Error processing resource ${resourceId}:`, error.message);
        errorCount++;
    }
}

console.log(`\nCompleted!`);
console.log(`✓ Successfully processed: ${processedCount} resources`);
console.log(`✓ Successfully parsed: ${parsedSamplesCount}/${totalSamplesCount} JSON samples`);
if (errorCount > 0) {
    console.log(`✗ Errors encountered: ${errorCount} resources`);
}

if (failedParseFiles.length > 0) {
    console.log(`\nFiles with failed JSON parsing (${failedParseFiles.length} files):`);
    failedParseFiles.forEach(filePath => {
        console.log(`  - ${filePath}`);
    });
    console.log(`\nThese files need manual JSON cleanup.`);
}