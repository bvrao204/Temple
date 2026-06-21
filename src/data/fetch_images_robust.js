import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templesPath = path.join(__dirname, 'temples.js');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'TempleAppBot/1.0 (test@example.com)' } }, (res) => {
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

async function fetchWikiImage(query) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=800`;
    const data = await fetchJson(url);
    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages);
      if (pages.length > 0 && pages[0].thumbnail) {
        return pages[0].thumbnail.source;
      }
    }
  } catch (err) {
    // console.error(`Err: ${err.message}`);
  }
  return null;
}

// Function to fetch images from Wikimedia Commons for the gallery
async function fetchWikiGallery(query) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=images&format=json&imlimit=5`;
    const data = await fetchJson(url);
    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages);
      if (pages.length > 0 && pages[0].images) {
        const imageTitles = pages[0].images.map(img => img.title).filter(t => t.endsWith('.jpg') || t.endsWith('.png'));
        
        // Resolve URLs for these images
        const urls = [];
        for (const title of imageTitles) {
          const imgUrlData = await fetchJson(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`);
          const imgPages = Object.values(imgUrlData.query.pages);
          if (imgPages.length > 0 && imgPages[0].imageinfo && imgPages[0].imageinfo.length > 0) {
             urls.push(imgPages[0].imageinfo[0].url);
          }
        }
        return urls;
      }
    }
  } catch(e) {}
  return [];
}

async function run() {
  let content = fs.readFileSync(templesPath, 'utf8');
  
  const arrayMatch = content.match(/export const initialTemples = (\[[\s\S]*\]);/);
  if (!arrayMatch) return;
  
  let temples = eval(arrayMatch[1]);
  let updatedCount = 0;
  
  console.log('Starting robust fetch...');
  for (let i = 0; i < temples.length; i++) {
    const t = temples[i];
    // Check if the image starts with source.unsplash.com or is placeholder
    if (t.image === '/images/placeholder.jpg' || t.image.includes('unsplash')) {
      let mainImg = await fetchWikiImage(t.name);
      if (!mainImg && !t.name.includes('Temple')) mainImg = await fetchWikiImage(t.name + ' Temple');
      if (!mainImg) mainImg = await fetchWikiImage(t.city + ' Temple');
      
      if (mainImg) {
        t.image = mainImg;
        console.log(`Found main image for ${t.name}: ${mainImg.substring(0, 40)}...`);
        
        let galleryUrls = await fetchWikiGallery(t.name);
        if (galleryUrls.length > 0) {
          t.gallery = galleryUrls;
          console.log(`  Found ${galleryUrls.length} gallery images!`);
        } else {
          t.gallery = [mainImg];
        }
        updatedCount++;
      } else {
         console.log(`  Failed completely for ${t.name}`);
      }
      await new Promise(r => setTimeout(r, 200));
    }
  }
  
  if (updatedCount > 0) {
    const newArrayStr = JSON.stringify(temples, null, 2);
    const newContent = content.replace(arrayMatch[1], newArrayStr);
    fs.writeFileSync(templesPath, newContent, 'utf8');
    console.log(`Successfully updated ${updatedCount} temples!`);
  }
}

run();
