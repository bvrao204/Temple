import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

const fallbackImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Brihadeeswarar_Temple%2C_Thanjavur.jpg/800px-Brihadeeswarar_Temple%2C_Thanjavur.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Kailash_Temple_at_Ellora.jpg/800px-Kailash_Temple_at_Ellora.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sun_Temple_Modhera_Gujarat.jpg/800px-Sun_Temple_Modhera_Gujarat.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Konark_Sun_Temple_from_South_West.jpg/800px-Konark_Sun_Temple_from_South_West.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Meenakshi_Amman_Temple_in_Madurai_Tamil_Nadu_India.jpg/800px-Meenakshi_Amman_Temple_in_Madurai_Tamil_Nadu_India.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Shore_Temple_at_Mahabalipuram.jpg/800px-Shore_Temple_at_Mahabalipuram.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kandariya_Mahadeva_Temple%2C_Khajuraho.jpg/800px-Kandariya_Mahadeva_Temple%2C_Khajuraho.jpg",
  "/images/dravidian.png",
  "/images/devi.png",
  "/images/himalayan.png",
  "/images/nagara.png",
  "/images/ganesha.png"
];

function run() {
  let content = fs.readFileSync(templesPath, 'utf8');
  const arrayMatch = content.match(/export const initialTemples = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let temples = eval(arrayMatch[1]);
  
  // 1. Remove generic Divya Desams
  const initialCount = temples.length;
  temples = temples.filter(t => !t.name.startsWith("Divya Desam "));
  console.log(`Removed ${initialCount - temples.length} generic Divya Desams.`);

  // 2. Identify duplicate images
  const imageCounts = {};
  for (const t of temples) {
    if (t.image) {
      imageCounts[t.image] = (imageCounts[t.image] || 0) + 1;
    }
  }

  // 3. Fix duplicates by distributing fallbacks
  let fallbackIndex = 0;
  let fixedCount = 0;
  for (const t of temples) {
    if (t.image && imageCounts[t.image] > 2) {
      const newImage = fallbackImages[fallbackIndex % fallbackImages.length];
      t.image = newImage;
      t.gallery = [newImage, newImage];
      fallbackIndex++;
      fixedCount++;
    }
  }
  
  console.log(`Fixed ${fixedCount} duplicate images.`);

  const newArrayStr = JSON.stringify(temples, null, 2);
  const newContent = content.replace(arrayMatch[1], newArrayStr);
  fs.writeFileSync(templesPath, newContent, 'utf8');
}

run();
