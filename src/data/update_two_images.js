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
  
  for (const t of temples) {
    if (t.name === 'Girijatmaj Temple') {
      t.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Lenyadri_cave_no_7_girijatmaj_ganpati_temple_photo_by_Yogendra_joshi.jpg/800px-Lenyadri_cave_no_7_girijatmaj_ganpati_temple_photo_by_Yogendra_joshi.jpg";
      t.gallery = [t.image];
    } else if (t.name === 'Amararama') {
      t.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Amaralingeswara_Temple%2C_Amaravati.jpg/800px-Amaralingeswara_Temple%2C_Amaravati.jpg";
      t.gallery = [t.image];
    }
  }

  const newArrayStr = JSON.stringify(temples, null, 2);
  const newContent = content.replace(arrayMatch[1], newArrayStr);
  fs.writeFileSync(templesPath, newContent, 'utf8');
  console.log('Successfully updated the two incorrect images.');
}

run();
