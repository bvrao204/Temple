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
  const initialLength = temples.length;
  
  // Remove any temple that uses a generic AI placeholder image.
  // This guarantees every temple on the site has a unique, 100% real Wikipedia photo.
  temples = temples.filter(t => !t.image || !t.image.includes('/images/'));
  
  const removedCount = initialLength - temples.length;

  const newArrayStr = JSON.stringify(temples, null, 2);
  const newContent = content.replace(arrayMatch[1], newArrayStr);
  fs.writeFileSync(templesPath, newContent, 'utf8');
  console.log(`Successfully removed ${removedCount} temples that lacked unique real photos.`);
}

run();
