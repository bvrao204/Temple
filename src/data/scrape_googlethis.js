import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import google from 'google-this';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

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
  
  console.log('Starting google-this Image scraper...');
  
  for (let i = 0; i < temples.length; i++) {
    const t = temples[i];
    
    // Target the ~36 remaining fallback temples
    if (isFallback(t.image)) {
      try {
        console.log(`[${i}/${temples.length}] Searching exactly for: ${t.name} ...`);
        
        // Search google images
        const images = await google.image(`${t.name} real temple`, { safe: false });
        
        if (images && images.length > 0) {
          // Get the best high res image from the top 3
          let bestImage = images[0].url;
          for (let j = 0; j < Math.min(3, images.length); j++) {
            if (images[j].url.endsWith('.jpg') || images[j].url.endsWith('.png')) {
              bestImage = images[j].url;
              break;
            }
          }
          
          t.image = bestImage;
          t.gallery = images.slice(0, 5).map(img => img.url);
          console.log(`SUCCESS: Found ${t.image}`);
          updatedCount++;
        }
      } catch (err) {
        console.error(`Failed to scrape for ${t.name}:`, err.message);
      }
      
      // Save continuously
      if (updatedCount % 5 === 0) {
        const newArrayStr = JSON.stringify(temples, null, 2);
        const newContent = content.replace(arrayMatch[1], newArrayStr);
        fs.writeFileSync(templesPath, newContent, 'utf8');
      }
      
      // Prevent rate limiting
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  
  const newArrayStr = JSON.stringify(temples, null, 2);
  const newContent = content.replace(arrayMatch[1], newArrayStr);
  fs.writeFileSync(templesPath, newContent, 'utf8');
  console.log(`Completely finished! Replaced ${updatedCount} generic images with EXACT Google Images!`);
}

run();
