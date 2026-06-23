import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

function run() {
  let content = fs.readFileSync(templesPath, 'utf8');
  const arrayMatch = content.match(/export const initialTemples = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let temples = eval(arrayMatch[1]);
  
  const uniqueMap = new Map();
  let duplicatesRemoved = 0;
  
  for (const t of temples) {
    if (!uniqueMap.has(t.id)) {
      uniqueMap.set(t.id, t);
    } else {
      // We have a duplicate! Keep the one with better data.
      const existing = uniqueMap.get(t.id);
      
      // If the new one has a non-traditional architecture or better image, prefer it
      if (existing.architecture === "Traditional Architecture" && t.architecture !== "Traditional Architecture") {
        uniqueMap.set(t.id, t);
      } else if (existing.image && existing.image.includes('/images/') && t.image && !t.image.includes('/images/')) {
        uniqueMap.set(t.id, t);
      }
      // Otherwise keep existing
      duplicatesRemoved++;
    }
  }
  
  const finalTemples = Array.from(uniqueMap.values());

  const newArrayStr = JSON.stringify(finalTemples, null, 2);
  const newContent = content.replace(arrayMatch[1], newArrayStr);
  fs.writeFileSync(templesPath, newContent, 'utf8');
  console.log(`Deduplicated database! Removed ${duplicatesRemoved} duplicate temples.`);
}

run();
