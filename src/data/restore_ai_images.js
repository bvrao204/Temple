import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

const famousFallbacks = [
  "Brihadeeswarar_Temple", "Kailash_Temple", "Sun_Temple_Modhera", 
  "Konark_Sun_Temple", "Meenakshi_Amman", "Shore_Temple", "Kandariya_Mahadeva"
];

function run() {
  let content = fs.readFileSync(templesPath, 'utf8');
  const arrayMatch = content.match(/export const initialTemples = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let temples = eval(arrayMatch[1]);
  let count = 0;

  for (const t of temples) {
    if (t.image && famousFallbacks.some(f => t.image.includes(f))) {
      // Revert to AI representation
      if (t.circuits.includes("Shakti Peethas") || t.deity.toLowerCase().includes("devi")) {
        t.image = "/images/devi.png";
        t.gallery = ["/images/devi.png", "/images/devi.png"];
      } else if (t.circuits.includes("Ashtavinayak") || t.deity.toLowerCase().includes("ganesha")) {
        t.image = "/images/ganesha.png";
        t.gallery = ["/images/ganesha.png", "/images/ganesha.png"];
      } else if (t.circuits.includes("Jyotirlinga") || t.deity.toLowerCase().includes("shiva")) {
        t.image = "/images/himalayan.png";
        t.gallery = ["/images/himalayan.png", "/images/himalayan.png"];
      } else {
        t.image = "/images/dravidian.png";
        t.gallery = ["/images/dravidian.png", "/images/dravidian.png"];
      }
      count++;
    }
  }

  const newArrayStr = JSON.stringify(temples, null, 2);
  const newContent = content.replace(arrayMatch[1], newArrayStr);
  fs.writeFileSync(templesPath, newContent, 'utf8');
  console.log(`Restored ${count} temples to perfect AI representations.`);
}

run();
