const fs = require('fs');
const path = require('path');

const newTemples = [
  {
    id: "mallikarjuna-swamy",
    name: "Mallikarjuna Swamy Temple",
    deity: "Shiva",
    state: "Andhra Pradesh",
    city: "Srisailam",
    region: "South",
    history: "One of the twelve Jyotirlingas and also one of the eighteen Maha Shakti Peethas. The temple is located on the flat top of Nallamala Hills. Built centuries ago, with significant contributions from the Vijayanagara Empire.",
    architectureStyle: "Dravidian Style",
    heritageStatus: "Ancient (over 2000 years old)",
    rating: 4.8,
    image: "/images/mallikarjuna.jpg",
    website: "https://www.srisailadevasthanam.org/",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/1/13/Mallikarjuna_Temple%2C_Srisailam.jpg"
    ],
    mapCoords: { lat: 16.0733, lng: 78.8686 },
    featured: false,
    approved: true,
    darshanTimings: {
      morning: "04:30 - 15:30",
      evening: "16:30 - 22:00",
      aarti: [
        { name: "Mangala Aarti", time: "05:00" },
        { name: "Evening Aarti", time: "18:30" }
      ]
    },
    rituals: ["Abhishekam", "Kalyanotsavam"],
    festivals: [
      { name: "Maha Shivaratri", month: "February", significance: "Grandest celebration at the temple" }
    ],
    guidelines: {
      dressCode: "Traditional wear is compulsory. Dhoti for men, Saree/Chudidhar for women.",
      rules: ["No phones inside the main temple"],
      restrictions: []
    },
    facilities: {
      accommodation: true,
      transport: ["Bus from Hyderabad (212km)", "Nearest railway station is Markapur Road"],
      details: "Numerous Devasthanam choultries and guest houses available."
    },
    circuits: ["Jyotirlinga", "Shakti Peetha", "Famous Shiva Temples"]
  },
  {
    id: "trimbakeshwar",
    name: "Trimbakeshwar Temple",
    deity: "Shiva",
    state: "Maharashtra",
    city: "Nashik",
    region: "West",
    history: "An ancient Hindu temple in the town of Trimbak, near Nashik. It is dedicated to Lord Shiva and is one of the twelve Jyotirlingas. It is located at the source of the Godavari River. Built by Peshwa Balaji Baji Rao.",
    architectureStyle: "Hemadpanthi Style",
    heritageStatus: "Medieval",
    rating: 4.7,
    image: "/images/trimbakeshwar.jpg",
    website: "https://www.trimbakeshwartrust.com/",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Trimbakeshwar_Shiva_Temple_-_Nashik.jpg"
    ],
    mapCoords: { lat: 19.9321, lng: 73.5312 },
    featured: false,
    approved: true,
    darshanTimings: {
      morning: "05:30 - 12:00",
      evening: "13:00 - 21:00",
      aarti: [
        { name: "Kakad Aarti", time: "05:30" },
        { name: "Sandhya Aarti", time: "19:00" }
      ]
    },
    rituals: ["Kalsarp Shanti Puja", "Narayan Nagbali Puja"],
    festivals: [
      { name: "Kumbh Mela", month: "Every 12 years", significance: "Millions gather for holy dip." }
    ],
    guidelines: {
      dressCode: "Men must wear dhoti and no upper garment to enter the sanctum.",
      rules: ["Photography is prohibited inside"],
      restrictions: []
    },
    facilities: {
      accommodation: true,
      transport: ["Nashik railway station is nearest"],
      details: "Various Dharamshalas and hotels available."
    },
    circuits: ["Jyotirlinga", "Famous Shiva Temples"]
  },
  {
    id: "siddhivinayak-mumbai",
    name: "Siddhivinayak Temple",
    deity: "Ganesha",
    state: "Maharashtra",
    city: "Mumbai",
    region: "West",
    history: "A Hindu temple dedicated to Lord Shri Ganesha. It is one of the richest temples in India. Built in 1801 by Laxman Vithu and Deubai Patil.",
    architectureStyle: "Modern/Traditional",
    heritageStatus: "Historical (1801)",
    rating: 4.8,
    image: "/images/siddhivinayak.jpg",
    website: "https://www.siddhivinayak.org/",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/Shree_Siddhivinayak_Ganapati_Temple%2C_Prabhadevi%2C_Mumbai.jpg"
    ],
    mapCoords: { lat: 19.0166, lng: 72.8296 },
    featured: false,
    approved: true,
    darshanTimings: {
      morning: "05:30 - 12:00",
      evening: "13:00 - 21:50",
      aarti: [
        { name: "Kakad Aarti", time: "05:30" },
        { name: "Night Aarti", time: "21:50" }
      ]
    },
    rituals: ["Abhishek", "Modak Prasad"],
    festivals: [
      { name: "Ganesh Chaturthi", month: "August/September", significance: "Grandest celebration" }
    ],
    guidelines: {
      dressCode: "Modest clothing.",
      rules: ["Heavy security checks, no large bags"],
      restrictions: []
    },
    facilities: {
      accommodation: false,
      transport: ["Dadar railway station is nearby"],
      details: "Located in the heart of Mumbai with excellent transport connectivity."
    },
    circuits: ["Famous Temples", "Ashtavinayak Temples"]
  }
];

const templesPath = path.join(__dirname, 'temples.js');
let content = fs.readFileSync(templesPath, 'utf8');

// The file ends with "];", so we replace the last "];" with the new temples
// To be safe, we split at the last "]"
const lastBracketIndex = content.lastIndexOf(']');
if (lastBracketIndex !== -1) {
  let newTemplesStr = JSON.stringify(newTemples, null, 2);
  // remove the starting '[' and ending ']' from stringified newTemples
  newTemplesStr = newTemplesStr.substring(1, newTemplesStr.length - 1);
  
  const updatedContent = content.substring(0, lastBracketIndex) + ',\n' + newTemplesStr + content.substring(lastBracketIndex);
  fs.writeFileSync(templesPath, updatedContent, 'utf8');
  console.log('Successfully added new temples to temples.js');
} else {
  console.error('Could not find closing bracket in temples.js');
}
