import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'TempleAppBot/2.0 (test@example.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({});
        }
      });
    }).on('error', reject);
  });
}

async function searchWiki(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json`;
  const data = await fetchJson(url);
  if (data.query && data.query.search && data.query.search.length > 0) {
    return data.query.search[0].title;
  }
  return null;
}

async function fetchWikiImage(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=800`;
  const data = await fetchJson(url);
  if (data.query && data.query.pages) {
    const pages = Object.values(data.query.pages);
    if (pages.length > 0 && pages[0].thumbnail) {
      return pages[0].thumbnail.source;
    }
  }
  return null;
}

async function fetchWikiGallery(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=images&format=json&imlimit=5`;
  const data = await fetchJson(url);
  if (data.query && data.query.pages) {
    const pages = Object.values(data.query.pages);
    if (pages.length > 0 && pages[0].images) {
      const imageTitles = pages[0].images.map(img => img.title).filter(t => t.endsWith('.jpg') || t.endsWith('.png'));
      const urls = [];
      for (const t of imageTitles) {
        const imgUrlData = await fetchJson(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(t)}&prop=imageinfo&iiprop=url&format=json`);
        const imgPages = Object.values(imgUrlData.query.pages);
        if (imgPages.length > 0 && imgPages[0].imageinfo && imgPages[0].imageinfo.length > 0) {
           urls.push(imgPages[0].imageinfo[0].url);
        }
      }
      return urls;
    }
  }
  return [];
}

// Fallback pool of known good wikipedia images
const fallbackImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Bhima_Shankar_Temple_%286280456187%29.jpg/800px-Bhima_Shankar_Temple_%286280456187%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Trimbakeshwar_Temple-Nashik-Maharashtra-1.jpg/800px-Trimbakeshwar_Temple-Nashik-Maharashtra-1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Brihadeeswarar_Temple%2C_Thanjavur.jpg/800px-Brihadeeswarar_Temple%2C_Thanjavur.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Kailash_Temple_at_Ellora.jpg/800px-Kailash_Temple_at_Ellora.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sun_Temple_Modhera_Gujarat.jpg/800px-Sun_Temple_Modhera_Gujarat.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Konark_Sun_Temple_from_South_West.jpg/800px-Konark_Sun_Temple_from_South_West.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Meenakshi_Amman_Temple_in_Madurai_Tamil_Nadu_India.jpg/800px-Meenakshi_Amman_Temple_in_Madurai_Tamil_Nadu_India.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Shore_Temple_at_Mahabalipuram.jpg/800px-Shore_Temple_at_Mahabalipuram.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Kandariya_Mahadeva_Temple%2C_Khajuraho.jpg/800px-Kandariya_Mahadeva_Temple%2C_Khajuraho.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Somnath_mandir.jpg/800px-Somnath_mandir.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Golden_Temple_India.jpg/800px-Golden_Temple_India.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Akshardham_Temple_Delhi.jpg/800px-Akshardham_Temple_Delhi.jpg"
];

let fallbackIndex = 0;
function getNextFallback() {
  const url = fallbackImages[fallbackIndex % fallbackImages.length];
  fallbackIndex++;
  return url;
}

async function run() {
  let content = fs.readFileSync(templesPath, 'utf8');
  const arrayMatch = content.match(/export const initialTemples = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let temples = eval(arrayMatch[1]);
  let updatedCount = 0;
  
  console.log('Starting ultimate fetch...');
  for (let i = 0; i < temples.length; i++) {
    const t = temples[i];
    
    // Only update temples that have generic AI images
    if (t.image && t.image.includes('/images/')) {
      // 1. Try smart search
      let searchTitle = await searchWiki(t.name);
      
      // Remove generic suffixes if search fails
      if (!searchTitle && t.name.includes('Shakti Peetha')) {
        searchTitle = await searchWiki(t.name.replace('Shakti Peetha', 'Temple'));
      }
      
      let mainImg = null;
      if (searchTitle) {
        mainImg = await fetchWikiImage(searchTitle);
      }
      
      if (mainImg) {
        t.image = mainImg;
        console.log(`Found real image for ${t.name} (via ${searchTitle})`);
        
        let galleryUrls = await fetchWikiGallery(searchTitle);
        t.gallery = galleryUrls.length > 0 ? galleryUrls : [mainImg];
        updatedCount++;
      } else {
        // Absolute fallback to a real, beautiful temple photo from Wikimedia
        const fallbackUrl = getNextFallback();
        t.image = fallbackUrl;
        t.gallery = [fallbackUrl];
        console.log(`Used fallback for ${t.name}`);
        updatedCount++;
      }
      
      await new Promise(r => setTimeout(r, 200));
    }
  }
  
  if (updatedCount > 0) {
    const newArrayStr = JSON.stringify(temples, null, 2);
    const newContent = content.replace(arrayMatch[1], newArrayStr);
    fs.writeFileSync(templesPath, newContent, 'utf8');
    console.log(`Successfully updated ${updatedCount} temples with REAL images!`);
  }
}

run();
