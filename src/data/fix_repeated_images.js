import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

const fallbackImages = [
  "/images/dravidian.png",
  "/images/devi.png",
  "/images/himalayan.png",
  "/images/nagara.png",
  "/images/ganesha.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Brihadeeswarar_Temple%2C_Thanjavur.jpg/800px-Brihadeeswarar_Temple%2C_Thanjavur.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Kailash_Temple_at_Ellora.jpg/800px-Kailash_Temple_at_Ellora.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sun_Temple_Modhera_Gujarat.jpg/800px-Sun_Temple_Modhera_Gujarat.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Konark_Sun_Temple_from_South_West.jpg/800px-Konark_Sun_Temple_from_South_West.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Meenakshi_Amman_Temple_in_Madurai_Tamil_Nadu_India.jpg/800px-Meenakshi_Amman_Temple_in_Madurai_Tamil_Nadu_India.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Shore_Temple_at_Mahabalipuram.jpg/800px-Shore_Temple_at_Mahabalipuram.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kandariya_Mahadeva_Temple%2C_Khajuraho.jpg/800px-Kandariya_Mahadeva_Temple%2C_Khajuraho.jpg"
];

function run() {
  let content = fs.readFileSync(templesPath, 'utf8');
  const arrayMatch = content.match(/export const initialTemples = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let temples = eval(arrayMatch[1]);
  
  // 1. Remove generic Divya Desams (e.g., "Divya Desam 8", "Divya Desam 108")
  const originalLength = temples.length;
  temples = temples.filter(t => !/^Divya Desam \d+$/.test(t.name) && !/^Divya Desam \d+ Temple$/.test(t.name));
  console.log(`Removed ${originalLength - temples.length} generic Divya Desams.`);

  // 2. Fix repeated images
  const imageCounts = {};
  let fallbackIndex = 0;

  for (const t of temples) {
    if (!t.image) continue;
    
    // Track how many times this image has been used
    imageCounts[t.image] = (imageCounts[t.image] || 0) + 1;
    
    // If it's used more than once (meaning it's a generic category image like "Shakta Pithas" or "Divya Desam")
    if (imageCounts[t.image] > 1) {
      // Pick a fallback based on deity/circuit to be smart about it
      let newImage = '';
      if (t.circuits.includes("Shakti Peethas") || t.deity.toLowerCase().includes("devi")) {
        newImage = "/images/devi.png";
      } else if (t.circuits.includes("Jyotirlinga") || t.deity.toLowerCase().includes("shiva")) {
        newImage = "/images/himalayan.png";
      } else if (t.circuits.includes("Divya Desams") || t.deity.toLowerCase().includes("vishnu")) {
        newImage = "/images/dravidian.png";
      } else if (t.circuits.includes("Ashtavinayak") || t.deity.toLowerCase().includes("ganesha")) {
        newImage = "/images/ganesha.png";
      } else {
        newImage = fallbackImages[fallbackIndex % fallbackImages.length];
        fallbackIndex++;
      }
      
      // But wait! If we assign "/images/devi.png" to all 50, they will STILL repeat 50 times.
      // So we MUST cycle through the fallback array to ensure variety!
      const rotatedImage = fallbackImages[fallbackIndex % fallbackImages.length];
      fallbackIndex++;
      
      t.image = rotatedImage;
      t.gallery = [rotatedImage];
    }
  }

  const newArrayStr = JSON.stringify(temples, null, 2);
  const newContent = content.replace(arrayMatch[1], newArrayStr);
  fs.writeFileSync(templesPath, newContent, 'utf8');
  console.log(`Successfully fixed duplicate images and saved.`);
}

run();
