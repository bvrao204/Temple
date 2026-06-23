import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Scraper from 'images-scraper';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

const google = new Scraper({
  puppeteer: {
    headless: "new",
  },
});

const isFallback = (url) => {
  if (!url) return true;
  if (url.includes('/images/')) return true;
  const fallbacks = [
    "Brihadeeswarar_Temple", "Kailash_Temple", "Sun_Temple_Modhera", 
    "Konark_Sun_Temple", "Meenakshi_Amman", "Shore_Temple", "Kandariya_Mahadeva"
  ];
  return fallbacks.some(f => url.includes(f));
};

async function run() {
  let content = fs.readFileSync(templesPath, 'utf8');
  const arrayMatch = content.match(/export const initialTemples = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let temples = eval(arrayMatch[1]);
  let updatedCount = 0;
  
  console.log('Starting Google Images scraper...');
  
  for (let i = 0; i < temples.length; i++) {
    const t = temples[i];
    
    // If it's using a fallback or AI image, we MUST get the exact image!
    if (isFallback(t.image)) {
      try {
        console.log(`[${i}/${temples.length}] Searching Google for exactly: ${t.name} temple`);
        const results = await google.scrape(`${t.name} temple`, 3);
        
        if (results && results.length > 0) {
          t.image = results[0].url;
          t.gallery = results.map(r => r.url);
          console.log(`SUCCESS: Found ${t.image}`);
          updatedCount++;
        }
      } catch (err) {
        console.error(`Failed to scrape for ${t.name}:`, err.message);
      }
      
      // Save every 5 updates
      if (updatedCount % 5 === 0) {
        const newArrayStr = JSON.stringify(temples, null, 2);
        content = content.replace(arrayMatch[1], newArrayStr);
        fs.writeFileSync(templesPath, content, 'utf8');
      }
    }
  }
  
  const newArrayStr = JSON.stringify(temples, null, 2);
  const newContent = content.replace(arrayMatch[1], newArrayStr);
  fs.writeFileSync(templesPath, newContent, 'utf8');
  console.log(`Completely finished! Replaced ${updatedCount} generic images with exact Google Images!`);
}

run();
