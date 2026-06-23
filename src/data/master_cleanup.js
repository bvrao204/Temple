import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

const famousFallbacks = [
  "Brihadeeswarar_Temple", "Kailash_Temple", "Sun_Temple_Modhera", 
  "Konark_Sun_Temple", "Meenakshi_Amman", "Shore_Temple", "Kandariya_Mahadeva",
  "/images/"
];

function run() {
  let content = fs.readFileSync(templesPath, 'utf8');
  const arrayMatch = content.match(/export const initialTemples = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let temples = eval(arrayMatch[1]);
  const initialLength = temples.length;
  
  // 1. Remove temples with fallbacks or missing images
  temples = temples.filter(t => {
    if (!t.image || t.image.trim() === '') return false; // Missing image
    if (famousFallbacks.some(f => t.image.includes(f))) return false; // Uses a fallback
    return true;
  });

  // 2. Deduplicate by Name (merge circuits)
  const uniqueMap = new Map();
  for (const t of temples) {
    const normalizeName = t.name.toLowerCase().trim();
    if (!uniqueMap.has(normalizeName)) {
      uniqueMap.set(normalizeName, t);
    } else {
      const existing = uniqueMap.get(normalizeName);
      if (t.circuits) {
        existing.circuits = [...new Set([...(existing.circuits || []), ...t.circuits])];
      }
    }
  }
  
  temples = Array.from(uniqueMap.values());

  const newArrayStr = JSON.stringify(temples, null, 2);
  const newContent = content.replace(arrayMatch[1], newArrayStr);
  fs.writeFileSync(templesPath, newContent, 'utf8');
  console.log(`Master Cleanup Complete! Reduced from ${initialLength} to ${temples.length} guaranteed unique, real temples.`);
}

run();
