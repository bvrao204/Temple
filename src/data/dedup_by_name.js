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
    const normalizeName = t.name.toLowerCase().trim();
    if (!uniqueMap.has(normalizeName)) {
      uniqueMap.set(normalizeName, t);
    } else {
      const existing = uniqueMap.get(normalizeName);
      
      let keepNew = false;
      
      // If the existing has generic architecture and new does not
      if (existing.architecture === "Traditional Architecture" && t.architecture !== "Traditional Architecture") {
        keepNew = true;
      }
      // If existing has AI image but new has real image
      else if (existing.image && existing.image.includes('/images/') && t.image && !t.image.includes('/images/')) {
        keepNew = true;
      }
      
      if (keepNew) {
        // Merge circuits
        if (existing.circuits) {
          t.circuits = [...new Set([...(t.circuits || []), ...existing.circuits])];
        }
        uniqueMap.set(normalizeName, t);
      } else {
        // Merge circuits into existing
        if (t.circuits) {
          existing.circuits = [...new Set([...(existing.circuits || []), ...t.circuits])];
        }
      }
      duplicatesRemoved++;
    }
  }
  
  const finalTemples = Array.from(uniqueMap.values());

  const newArrayStr = JSON.stringify(finalTemples, null, 2);
  const newContent = content.replace(arrayMatch[1], newArrayStr);
  fs.writeFileSync(templesPath, newContent, 'utf8');
  console.log(`Deduplicated database by NAME! Removed ${duplicatesRemoved} duplicate temples.`);
}

run();
