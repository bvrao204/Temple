import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

const exactDuplicatesToRemove = [
  "Somnath Jyotirlinga", 
  "Mallikarjuna Swamy", 
  "Mahakaleshwar Jyotirlinga",
  "Jagannath Temple (Puri)" // Keeping "Jagannath Temple"
];

function run() {
  let content = fs.readFileSync(templesPath, 'utf8');
  const arrayMatch = content.match(/export const initialTemples = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let temples = eval(arrayMatch[1]);
  const initialLength = temples.length;
  
  // 1. Remove "Various" locations (these have mismatched Wikipedia images and bad text)
  temples = temples.filter(t => t.city !== 'Various' && t.state !== 'Various');

  // 2. Remove the specific name-variation duplicates
  temples = temples.filter(t => !exactDuplicatesToRemove.includes(t.name));

  const newArrayStr = JSON.stringify(temples, null, 2);
  const newContent = content.replace(arrayMatch[1], newArrayStr);
  fs.writeFileSync(templesPath, newContent, 'utf8');
  console.log(`Final Purge Complete! Reduced from ${initialLength} to ${temples.length} flawless temples.`);
}

run();
