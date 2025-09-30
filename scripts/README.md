# Scripts

This directory contains utility scripts for the axcelerate-client project.

## generate-api-docs.js

Generates organized API documentation from raw data extracted from the aXcelerate API documentation website.

### Purpose

This script processes raw API documentation data and creates a structured, developer-friendly set of JSON files for each API endpoint. It transforms HTML-formatted JSON samples into clean, parseable objects and organizes endpoints into a logical folder structure.

### Data Source

The raw data comes from the HTML of the aXcelerate API documentation:
**https://app.axcelerate.com/apidocs/home/relaxer**

The data is stored in `../data/rawDocs.js` and contains 117+ API endpoint definitions.

### What It Does

1. **Reads raw data** from `data/rawDocs.js`
2. **Cleans JSON samples** that were originally formatted for HTML display
3. **Organizes endpoints** into hierarchical folders based on API patterns
4. **Generates clean JSON files** for each endpoint with proper structure
5. **Reports statistics** on parsing success and lists files needing manual cleanup

### Output Structure

```
docs/api/
├── accounting/
│   ├── invoice/
│   │   ├── index.json
│   │   ├── :invoiceID.json
│   │   └── :invoiceGUID/
│   └── creditnote/
├── user/
│   ├── login.json
│   ├── logout.json
│   └── :userID.json
└── ... (other endpoints)
```

### Usage

```bash
# From project root
node scripts/generate-api-docs.js
```

### Features

- **Automatic JSON parsing**: Converts HTML-formatted JSON strings to proper objects
- **Path parameter preservation**: Maintains colon syntax (e.g., `:userID.json`)
- **Hierarchical organization**: Creates folders based on API endpoint patterns
- **Error reporting**: Lists files that need manual JSON cleanup
- **Statistics**: Shows parsing success rates

### Dependencies

- `jsonrepair`: For fixing malformed JSON strings
- Node.js ES modules support

### Output

The script generates:
- **117+ JSON files** organized by API endpoint
- **Parsing statistics** showing success rates
- **List of files** needing manual cleanup (if any)
- **Clean, parseable JSON** with proper object structure

### Manual Cleanup

Some JSON samples may require manual cleanup due to complex formatting issues. The script will report these files at the end of execution.
