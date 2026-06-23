import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { image_search } from 'duckduckgo-images-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

async function run() {
  let content = fs.readFileSync(templesPath, 'utf8');
  const arrayMatch = content.match(/export const initialTemples = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let temples = eval(arrayMatch[1]);
  let updatedCount = 0;
  
  console.log('Starting DDG Image scraper for AI-placeholder temples...');
  
  for (let i = 0; i < temples.length; i++) {
    const t = temples[i];
    
    // Target any temple currently using our AI placeholders (devi.png, ganesha.png, etc.)
    if (t.image && t.image.includes('/images/')) {
      try {
        console.log(`[${i}/${temples.length}] Searching DDG exactly for: ${t.name} ...`);
        
        // Search DDG images
        const results = await image_search({ 
          query: `${t.name} india`, 
          moderate: true,
          iterations: 1
        });
        
        if (results && results.length > 0) {
          // Get the best image from the top results
          t.image = results[0].image;
          t.gallery = results.slice(0, 4).map(r => r.image);
          console.log(`SUCCESS: Found ${t.image}`);
          updatedCount++;
        } else {
          console.log(`No results found for ${t.name}`);
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
  console.log(`Completely finished! Replaced ${updatedCount} AI placeholder images with EXACT real images!`);
}

run();
