import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

async function validateURL(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok; // true if 200-299
  } catch (e) {
    return false;
  }
}

async function run() {
  let content = fs.readFileSync(templesPath, 'utf8');
  const arrayMatch = content.match(/export const initialTemples = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let temples = eval(arrayMatch[1]);
  const initialLength = temples.length;
  
  console.log(`Checking ${initialLength} temple images for 404s...`);
  
  const validTemples = [];
  let brokenCount = 0;
  
  for (let i = 0; i < temples.length; i++) {
    const t = temples[i];
    const isValid = await validateURL(t.image);
    if (isValid) {
      validTemples.push(t);
    } else {
      console.log(`BROKEN IMAGE DETECTED (Removing): ${t.name} -> ${t.image}`);
      brokenCount++;
    }
  }

  const newArrayStr = JSON.stringify(validTemples, null, 2);
  const newContent = content.replace(arrayMatch[1], newArrayStr);
  fs.writeFileSync(templesPath, newContent, 'utf8');
  console.log(`Successfully removed ${brokenCount} temples with broken images. Remaining: ${validTemples.length}`);
}

run();
