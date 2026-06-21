import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

const artifactsDir = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\42591ce0-b386-4584-8ac2-5620ba3f9990';
const publicImagesDir = 'd:\\farw\\Temples\\public\\images';

function getLatestFile(prefix) {
  const files = fs.readdirSync(artifactsDir);
  const matched = files.filter(f => f.startsWith(prefix) && f.endsWith('.png'));
  if (matched.length > 0) {
    // Return the one with the highest timestamp
    matched.sort();
    return path.join(artifactsDir, matched[matched.length - 1]);
  }
  return null;
}

// 1. Copy the files
const mapping = {
  dravidian: getLatestFile('dravidian_vishnu'),
  himalayan: getLatestFile('himalayan_shiva'),
  devi: getLatestFile('devi_peetha'),
  nagara: getLatestFile('nagara_temple'),
  ganesha: getLatestFile('ganesha_shrine'),
};

for (const [key, srcFile] of Object.entries(mapping)) {
  if (srcFile) {
    const destFile = path.join(publicImagesDir, `${key}.png`);
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${key}.png`);
  } else {
    console.error(`Missing image for ${key}`);
  }
}

// 2. Update temples.js
let content = fs.readFileSync(templesPath, 'utf8');
const arrayMatch = content.match(/export const initialTemples = (\[[\s\S]*\]);/);
if (!arrayMatch) process.exit(1);

let temples = eval(arrayMatch[1]);
let updatedCount = 0;

for (let i = 0; i < temples.length; i++) {
  const t = temples[i];
  
  if (t.image === '/images/placeholder.jpg') {
    let assignedImage = '/images/placeholder.jpg';
    
    // Logic to distribute the 5 images
    if (t.circuits.includes("Divya Desams") || t.deity.toLowerCase().includes("vishnu")) {
      assignedImage = '/images/dravidian.png';
    } else if (t.circuits.includes("Shakti Peethas") || t.deity.toLowerCase().includes("devi") || t.circuits.includes("Famous Devi Temples")) {
      assignedImage = '/images/devi.png';
    } else if (t.circuits.includes("Jyotirlinga") || (t.deity.toLowerCase().includes("shiva") && (t.state.includes("Uttarakhand") || t.state.includes("Kashmir")))) {
      assignedImage = '/images/himalayan.png';
    } else if (t.circuits.includes("Ashtavinayak") || t.deity.toLowerCase().includes("ganesha")) {
      assignedImage = '/images/ganesha.png';
    } else if (t.deity.toLowerCase().includes("shiva") || t.region === "North" || t.region === "Central" || t.region === "West") {
      assignedImage = '/images/nagara.png';
    } else {
      assignedImage = '/images/nagara.png'; // Fallback
    }

    t.image = assignedImage;
    t.gallery = [assignedImage, assignedImage]; // add it twice to the gallery to show it's working
    updatedCount++;
  }
}

const newArrayStr = JSON.stringify(temples, null, 2);
const newContent = content.replace(arrayMatch[1], newArrayStr);
fs.writeFileSync(templesPath, newContent, 'utf8');
console.log(`Successfully distributed perfectly matched AI images to ${updatedCount} temples!`);
