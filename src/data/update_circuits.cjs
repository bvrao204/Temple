const fs = require('fs');
const path = require('path');

const templesPath = path.join(__dirname, 'temples.js');
let content = fs.readFileSync(templesPath, 'utf8');

const circuitMap = {
  'kedarnath': ['Jyotirlinga', 'Char Dham', 'Panch Kedar', 'Famous Shiva Temples'],
  'kashi-vishwanath': ['Jyotirlinga', 'Famous Shiva Temples'],
  'somnath-temple': ['Jyotirlinga', 'Famous Shiva Temples'],
  'mahakaleshwar': ['Jyotirlinga', 'Famous Shiva Temples'],
  'ramanathaswamy': ['Jyotirlinga', 'Char Dham', 'Famous Shiva Temples'],
  'jagannath-puri': ['Char Dham', 'Famous Vishnu Temples'],
  'badrinath': ['Char Dham', 'Divya Desam', 'Famous Vishnu Temples'],
  'dwarkadhish': ['Char Dham', 'Divya Desam', 'Famous Vishnu Temples'],
  'tirupati-balaji': ['Famous Vishnu Temples'],
  'meenakshi-amman': ['Famous Devi Temples', 'Shakti Peetha (Optional)'],
  'kamakhya': ['Shakti Peetha', 'Famous Devi Temples'],
  'vaishno-devi': ['Shakti Peetha', 'Famous Devi Temples'],
  'dakshineswar-kali': ['Famous Devi Temples'],
  'siddhivinayak': ['Ashtavinayak Temples']
};

for (const [id, circuits] of Object.entries(circuitMap)) {
  const regex = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?)(featured:\\s*(true|false),)`, 'g');
  content = content.replace(regex, `$1circuits: ${JSON.stringify(circuits)},\n    $2`);
}

fs.writeFileSync(templesPath, content, 'utf8');
console.log('Successfully injected circuits into temples.js');
