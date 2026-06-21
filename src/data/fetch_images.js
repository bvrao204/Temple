import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

// Helper to fetch image from Wikipedia
async function fetchWikiImage(query) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=800`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages);
      if (pages.length > 0 && pages[0].thumbnail) {
        return pages[0].thumbnail.source;
      }
    }
  } catch (err) {
    console.error(`Failed to fetch wiki image for ${query}`);
  }
  return null;
}

async function run() {
  let content = fs.readFileSync(templesPath, 'utf8');
  
  // Extract the array using regex
  const arrayMatch = content.match(/export const initialTemples = (\[[\s\S]*\]);/);
  if (!arrayMatch) {
    console.error('Could not parse initialTemples array');
    return;
  }
  
  let temples;
  try {
    // using eval to parse the JS array object
    temples = eval(arrayMatch[1]);
  } catch (e) {
    console.error('Error parsing array:', e);
    return;
  }

  let updatedCount = 0;
  
  // Loop through all temples sequentially to avoid hitting API rate limits
  for (let i = 0; i < temples.length; i++) {
    const t = temples[i];
    if (t.image === '/images/placeholder.jpg') {
      console.log(`Fetching image for: ${t.name}...`);
      
      let imgUrl = await fetchWikiImage(t.name);
      
      // Try appending "Temple" if not found
      if (!imgUrl && !t.name.includes("Temple")) {
        imgUrl = await fetchWikiImage(`${t.name} Temple`);
      }
      
      if (imgUrl) {
        t.image = imgUrl;
        t.gallery = [imgUrl]; // Replace placeholder gallery
        updatedCount++;
        console.log(`  -> Found: ${imgUrl}`);
      } else {
        console.log(`  -> Not found for ${t.name}`);
        // Fallback to random unsplash temple-related keyword
        t.image = `https://source.unsplash.com/800x600/?temple,india,architecture,${t.city.replace(/\s/g, '')}`;
        t.gallery = [t.image];
      }
      
      // Delay to respect Wikipedia API limits
      await new Promise(r => setTimeout(r, 200));
    }
  }
  
  if (updatedCount > 0) {
    console.log(`Updating ${updatedCount} temples in temples.js...`);
    const newArrayStr = JSON.stringify(temples, null, 2);
    const newContent = content.replace(arrayMatch[1], newArrayStr);
    fs.writeFileSync(templesPath, newContent, 'utf8');
    console.log('Successfully updated temples.js with authentic images!');
  } else {
    console.log('No placeholder images needed updating.');
  }
}

run();
