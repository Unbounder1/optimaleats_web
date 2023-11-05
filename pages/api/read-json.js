// pages/api/read-json.js
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Construct the absolute path to the json file
  const filePath = path.join(process.cwd(), 'public', 'data.json');

  try {
    // Read file from the filesystem
    const data = await fs.readFile(filePath, 'utf8');
    
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Send JSON response
    res.status(200).json(jsonData);
  } catch (error) {
    console.error("An error occurred while reading the JSON file:", error);
    res.status(500).json({ error: "Failed to read the file" });
  }
}
