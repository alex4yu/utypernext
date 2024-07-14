
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { fileName } = req.query;
  const filePath = path.join(process.cwd(), 'textFiles', fileName);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    res.status(200).json({ content: fileContent });
  } catch (error) {
    res.status(500).json({ error: 'Could not read file' });
  }
}
