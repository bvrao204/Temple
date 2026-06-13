export const initialTemples = [
  {
    id: "kedarnath",
    name: "Kedarnath Temple",
    deity: "Shiva",
    state: "Uttarakhand",
    city: "Kedarnath",
    region: "North",
    history: "One of the most sacred pilgrimage sites of Northern India, Kedarnath Temple is believed to have been originally built by the Pandavas and later reconstructed by Adi Shankara in the 8th century CE. Set against the backdrop of the majestic Kedarnath range, it is one of the twelve Jyotirlingas of Lord Shiva. The temple is made of massive stone slabs placed on a rectangular dais and has stood resilient against extreme weather conditions for centuries.",
    architectureStyle: "Nagara Style (Katyuri Architecture)",
    heritageStatus: "Ancient (Over 1000 years old)",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?auto=format&fit=crop&w=800&q=80",
    mapCoords: { lat: 30.7352, lng: 79.0669 },
    featured: true,
    approved: true,
    darshanTimings: {
      morning: "06:00 - 15:00",
      evening: "17:00 - 21:00",
      aarti: [
        { name: "Maha Abhishek", time: "04:30" },
        { name: "Shringar Aarti", time: "19:00" }
      ]
    },
    rituals: [
      "Maha Abhishek Pooja (Early Morning)",
      "Rudra Abhishek",
      "Shiva Sahasranaman Archana",
      "Evening Shringar Aarti & Archana"
    ],
    festivals: [
      { name: "Maha Shivaratri", month: "February/March", significance: "Celebrates the cosmic marriage of Shiva and Parvati." },
      { name: "Badri-Kedar Festival", month: "June", significance: "An 8-day cultural event highlighting regional heritage." }
    ],
    guidelines: {
      dressCode: "Modest and traditional clothing recommended. Heavy winter wear is essential due to the high-altitude climate.",
      rules: [
        "Cameras and mobile phones are strictly prohibited inside the sanctum sanctorum.",
        "Physical touch of the Jyotirlinga is permitted only during specified morning ritual slots.",
        "No footwear allowed within the temple premises."
      ],
      restrictions: [
        "Not recommended for people with severe respiratory or cardiac issues without medical clearance (altitude: 3,583m).",
        "Avoid traveling during heavy monsoon landslides (July-August)."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Helicopter services from Guptkashi/Phata", "Pony/Doli tracking services from Gaurikund", "16km trek route from Gaurikund"],
      details: "Basic GMVN guest houses, private tents, and Dharamshalas are available at Kedarnath. Medical camps are situated along the trekking route."
    }
  },
  {
    id: "kashi-vishwanath",
    name: "Kashi Vishwanath Temple",
    deity: "Shiva",
    state: "Uttar Pradesh",
    city: "Varanasi",
    region: "Central",
    history: "Located on the western bank of the holy river Ganga, Kashi Vishwanath is one of the most famous Hindu temples dedicated to Lord Shiva. It has been destroyed and rebuilt several times in history, with the current structure constructed by the Maratha monarch Ahilyabai Holkar of Indore in 1780. Maharaja Ranjit Singh of Punjab donated 1,000 kg of pure gold to plate the temple's iconic spires. The temple is the center of faith for millions, who believe a visit here leads to moksha (salvation).",
    architectureStyle: "Nagara Style (Spire Architecture)",
    heritageStatus: "Medieval (Rebuilt in 1780)",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    mapCoords: { lat: 25.3109, lng: 83.0104 },
    featured: true,
    approved: true,
    darshanTimings: {
      morning: "04:00 - 11:15",
      evening: "12:15 - 23:00",
      aarti: [
        { name: "Mangala Aarti", time: "03:00" },
        { name: "Bhog Aarti", time: "11:30" },
        { name: "Saptarishi Aarti", time: "19:00" },
        { name: "Shayan Aarti", time: "22:30" }
      ]
    },
    rituals: [
      "Mangala Aarti (Pre-dawn worship)",
      "Rudrabhishek Pooja (Multiple slots daily)",
      "Ganga Aarti (Conducted at adjacent Dashashwamedh Ghat)",
      "Saptarishi Aarti (Conducted by seven priests simultaneously)"
    ],
    festivals: [
      { name: "Dev Deepawali", month: "November (Kartik Purnima)", significance: "Varanasi ghats are illuminated with millions of earthen lamps." },
      { name: "Maha Shivaratri", month: "February/March", significance: "Grand street procession of Shiva's wedding entourage." }
    ],
    guidelines: {
      dressCode: "Traditional Indian attire is highly appreciated (Saree/Salwar Kameez for women, Dhoti/Kurta-Pyjama for men). Leather items (belts, wallets) are not allowed inside.",
      rules: [
        "Passports (for foreign nationals) or Government ID cards are required for entry.",
        "Electronics, mobiles, and large bags must be deposited in lockers outside.",
        "Maintain silence inside the temple complex."
      ],
      restrictions: [
        "Avoid carrying metallic items, matchboxes, or lighters.",
        "Expect heavy crowds and queue times on Mondays."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Varanasi Junction Railway Station (4km away)", "Lal Bahadur Shastri International Airport (25km away)", "Local cycle rickshaws and e-rickshaws"],
      details: "Numerous hotels, ashrams, and luxury stays are available in Varanasi. The newly constructed Vishwanath Corridor provides direct, smooth access from the Ganga ghats to the temple."
    }
  },
  {
    id: "tirupati-balaji",
    name: "Tirumala Venkateswara Temple",
    deity: "Vishnu (Venkateswara)",
    state: "Andhra Pradesh",
    city: "Tirupati",
    region: "South",
    history: "Perched on the Saptagiri (seven hills) of Tirumala, this temple is dedicated to Lord Venkateswara, an incarnation of Vishnu. It is historically recognized as one of the richest temples in the world in terms of donations received. The temple's patron history spans the Pallavas, Cholas, Vijayanagara Emperors (especially Sri Krishnadevaraya), and Marathas. Pilgrims travel here to tonsure their hair as an offering of humility and ego-surrender.",
    architectureStyle: "Dravidian Style",
    heritageStatus: "Ancient (Established circa 300 CE)",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    mapCoords: { lat: 13.6833, lng: 79.3474 },
    featured: true,
    approved: true,
    darshanTimings: {
      morning: "06:00 - 12:00",
      evening: "12:00 - 21:00",
      aarti: [
        { name: "Suprabhata Seva", time: "03:00" },
        { name: "Thomala Seva", time: "03:45" },
        { name: "Kalyanotsavam", time: "10:30" },
        { name: "Ekanta Seva", time: "01:30" }
      ]
    },
    rituals: [
      "Suprabhatha Seva (Waking the Lord)",
      "Nija Rupa Darshanam (Viewing Lord's true form without ornaments, on Fridays)",
      "Srivari Kalyanotsavam (Celestial Wedding of the Lord)",
      "Laddu Prasadam distribution (Famous GI-tagged sweet)"
    ],
    festivals: [
      { name: "Srivari Brahmotsavam", month: "September/October", significance: "A grand 9-day celebration featuring spectacular chariot processions." },
      { name: "Vaikuntha Ekadashi", month: "December/January", significance: "Opening of the celestial Vaikuntha Dwaram gates." }
    ],
    guidelines: {
      dressCode: "Strict Dress Code: Dhoti/Kurta-Lungi for men, Saree/Half-Saree/Salwar Suit with dupatta for women. Jeans, shorts, T-shirts, and western dresses are strictly banned.",
      rules: [
        "Aadhar Card or Passport matching the ticket is mandatory for entry verification.",
        "Mobile phones, cameras, smartwatches, and recording devices are strictly forbidden on the hill.",
        "Consumption of alcohol, meat, and smoking is prohibited in Tirumala hills."
      ],
      restrictions: [
        "Tickets (Special Entry Darshan) must be booked online months in advance.",
        "Infants below 1 year and senior citizens have separate expedited queues with restricted timings."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Renigunta Airport (35km)", "Tirupati Railway Station (22km)", "Free local RTC buses within Tirumala", "Tirumala footpaths (Srivari Mettu & Alipiri) for pedestrian pilgrims"],
      details: "TTD (Temple Trust) provides free and paid cottages, locker facilities, and massive free dining halls (Nitya Annadanam) serving food to over 100,000 pilgrims daily."
    }
  },
  {
    id: "meenakshi-amman",
    name: "Meenakshi Amman Temple",
    deity: "Parvati (Meenakshi) & Shiva (Sundareswarar)",
    state: "Tamil Nadu",
    city: "Madurai",
    region: "South",
    history: "Located in the heart of the historic 2,500-year-old city of Madurai, this temple complex is a masterpiece of Dravidian architecture. It is dedicated to Goddess Meenakshi (a form of Parvati) and her consort Sundareswarar. The current complex was built and expanded between the 12th and 17th centuries by the Pandya and Nayak rulers. It features 14 majestic gateway towers (Gopurams), the tallest being the southern tower at 170 feet, and the famous Hall of a Thousand Pillars, each intricately carved with celestial figures.",
    architectureStyle: "Dravidian Style (Nayak Architecture)",
    heritageStatus: "Medieval (Current structure 1600s)",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    mapCoords: { lat: 9.9195, lng: 78.1193 },
    featured: false,
    approved: true,
    darshanTimings: {
      morning: "05:00 - 12:30",
      evening: "16:00 - 22:00",
      aarti: [
        { name: "Usha Pooja", time: "06:00" },
        { name: "Uchikala Pooja", time: "11:30" },
        { name: "Sayaraksha Pooja", time: "18:00" },
        { name: "Palliyarai (Night) Pooja", time: "21:30" }
      ]
    },
    rituals: [
      "Palliyarai Pooja (Evening ritual where Shiva's image is carried to Meenakshi's chamber)",
      "Daily Abhishekam to Goddess Meenakshi",
      "Golden Lotus Tank holy sprinkle"
    ],
    festivals: [
      { name: "Chithirai Festival", month: "April/May", significance: "A month-long festival depicting the coronation of Meenakshi and her wedding with Lord Shiva." },
      { name: "Navarathri", month: "September/October", significance: "The temple is decorated with colorful Kolu doll displays." }
    ],
    guidelines: {
      dressCode: "Traditional dress is mandatory. Dhoti, Pyjama, or formal pants for men. Sarees, Chudidhars, or formal traditional dresses for women. Jeans, skin-tight fits, and sleeveless attire are not allowed.",
      rules: [
        "Mobiles and cameras are banned inside the entire complex. Locker rooms are available at entrance gates.",
        "Foreign nationals are permitted inside the outer courtyards but restricted from entering the inner sanctum sanctorums.",
        "Do not touch the carved pillars."
      ],
      restrictions: [
        "Footwear must be deposited at the designated stands at the entrance towers.",
        "Strict security check at all four Gopuram entrances."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Madurai Airport (12km away)", "Madurai Junction Railway Station (2km away)", "Auto-rickshaws and city buses"],
      details: "Madurai is filled with hotels of all budgets. The temple board runs several lodge complexes. Free wheel-chairs and helper services are available for the disabled."
    }
  },
  {
    id: "jagannath-puri",
    name: "Jagannath Temple (Puri)",
    deity: "Krishna (Jagannath), Balabhadra & Subhadra",
    state: "Odisha",
    city: "Puri",
    region: "East",
    history: "The Shree Jagannath Temple is a sacred Char Dham pilgrimage site, constructed in the 12th century by King Anantavarman Chodaganga Deva of the Eastern Ganga Dynasty. Famous for its annual Rath Yatra (Chariot Festival), the temple houses wooden deities of Lord Jagannath, Balabhadra, and Subhadra. The wooden icons are ceremonially replaced every 12 or 19 years in a secretive ritual called Nabakalebara. The temple kitchen, the Ananda Bazar, is the world's largest kitchen, cooking Mahaprasad on clay pots for tens of thousands daily using traditional solar alignment patterns.",
    architectureStyle: "Kalinga Architecture",
    heritageStatus: "Ancient (Established 1161 CE)",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1592639296346-560c37a0f711?auto=format&fit=crop&w=800&q=80",
    mapCoords: { lat: 19.8049, lng: 85.8179 },
    featured: false,
    approved: true,
    darshanTimings: {
      morning: "05:30 - 13:00",
      evening: "16:00 - 23:00",
      aarti: [
        { name: "Mangala Alati", time: "06:00" },
        { name: "Sandhya Alati", time: "18:30" },
        { name: "Pahuda (Sleep) Alati", time: "22:30" }
      ]
    },
    rituals: [
      "Dwarapala Pooja (Opening of the gates)",
      "Daily change of the temple flag (Patita Pavana Bana) by climbing the 214-foot dome without safety gear",
      "Mahaprasad preparation (Seven clay pots stacked over each other over firewood)"
    ],
    festivals: [
      { name: "Rath Yatra", month: "June/July", significance: "The deities are pulled in massive, highly decorated chariots to the Gundicha Temple." },
      { name: "Snana Yatra", month: "June", significance: "Ceremonial bathing ritual of the deities on a grand platform." }
    ],
    guidelines: {
      dressCode: "Dhoti/Kurta for men, Saree/Salwar Kameez for women. Strict prohibition on shorts, ripped jeans, and modern revealing attire.",
      rules: [
        "Only practicing Hindus are permitted inside the temple. Non-Hindus can view the temple exterior from the Raghunandan Library roof opposite.",
        "Leather products, cameras, and mobile phones are strictly forbidden.",
        "Respect the local Pandas (priests) and follow official guidelines to avoid overpaying for Pujas."
      ],
      restrictions: [
        "Do not carry outside food into the temple.",
        "Strict prohibition on taking photographs of any part of the inner compound."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Bhubaneswar Airport (60km away)", "Puri Railway Station (2.5km away)", "E-rickshaws and cycle-rickshaws"],
      details: "Excellent beach-side resorts, ashrams, and temple guest houses are available. The Ananda Bazar inside the temple serves freshly prepared hot Mahaprasad daily starting from midday."
    }
  },
  {
    id: "sun-temple-konark",
    name: "Sun Temple, Konark",
    deity: "Surya (Sun God)",
    state: "Odisha",
    city: "Konark",
    region: "East",
    history: "A UNESCO World Heritage site built in the 13th century by King Narasimhadeva I of the Eastern Ganga Dynasty. Designed as a colossal chariot of the Sun God, Surya, the temple features 24 exquisitely carved stone wheels, each representing hours of the day, pulled by seven stone horses representing days of the week. Although the main sanctum (Deul) collapsed in the 19th century, the remaining audience hall (Jagamohana) stands as a monument to ancient engineering, astronomical alignment, and erotic stone art.",
    architectureStyle: "Kalinga Style (Rekha Deula)",
    heritageStatus: "UNESCO World Heritage Site",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    mapCoords: { lat: 19.8876, lng: 86.0945 },
    featured: true,
    approved: true,
    darshanTimings: {
      morning: "06:00 - 18:00",
      evening: "Closed for worship (Monument only)",
      aarti: []
    },
    rituals: [
      "Non-active Temple: No daily worship or rituals are conducted here since the deity was removed in historical wars.",
      "Light and Sound Show: Held daily in the evening highlighting the temple's history and architectural science."
    ],
    festivals: [
      { name: "Konark Dance Festival", month: "December", significance: "Grand classical dance festival against the backdrop of the illuminated temple." },
      { name: "Chandrabhaga Mela", month: "February", significance: "Holy dip in the Chandrabhaga river to worship the Sun God." }
    ],
    guidelines: {
      dressCode: "No formal dress code, but decent casual attire is expected as it is a protected heritage monument.",
      rules: [
        "A nominal entry fee is required (Free for children under 15, tickets available online/at gate).",
        "Avoid climbing on the delicate carved wheel structures to prevent degradation.",
        "Hiring a government-authorized guide is highly recommended to understand the sundial wheels."
      ],
      restrictions: [
        "Drone photography is prohibited without prior ASI permission.",
        "The interior of the remaining audience hall is sealed for structural safety."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Puri Railway Station (35km away)", "Bhubaneswar Airport (65km away)", "ASI-run tourist buses and luxury cars"],
      details: "OTDC Yatri Nivas, eco-retreats near Chandrabhaga beach, and local motels. Modern interpretation centers and food courts are constructed near the complex entrance."
    }
  },
  {
    id: "brihadeeswarar-temple",
    name: "Brihadeeswarar Temple",
    deity: "Shiva",
    state: "Tamil Nadu",
    city: "Thanjavur",
    region: "South",
    history: "Affectionately called the 'Big Temple' (Peruvudaiyar Kovil), Brihadeeswarar Temple is a spectacular Chola architectural marvel built by Emperor Rajaraja Chola I in 1010 CE. Part of the UNESCO World Heritage group 'Great Living Chola Temples', it boasts the tallest temple tower (Vimana) in the world at 216 feet, capped by an 80-ton monolithic stone cupola. The temple was built entirely of granite, which had to be brought from sources over 60km away, and contains a massive monolithic Nandi statue at the entrance.",
    architectureStyle: "Chola Dravidian Style",
    heritageStatus: "UNESCO World Heritage Site & Active Worship",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    mapCoords: { lat: 10.7828, lng: 79.1318 },
    featured: false,
    approved: true,
    darshanTimings: {
      morning: "06:00 - 12:30",
      evening: "16:00 - 21:00",
      aarti: [
        { name: "Kala Sandhi Pooja", time: "06:30" },
        { name: "Sayaraksha Pooja", time: "18:00" },
        { name: "Arthajama Pooja", time: "20:30" }
      ]
    },
    rituals: [
      "Abhishekam to the colossal 3.7m high Shiva Lingam",
      "Pradosha pooja (conducted twice a month with grand gatherings around the Nandi)"
    ],
    festivals: [
      { name: "Rajaraja Chola Sataya Vizha", month: "October/November", significance: "Grand celebration of Rajaraja Chola's birth anniversary." },
      { name: "Chithirai Brahmotsavam", month: "April/May", significance: "An 18-day celebration highlighting native theatrical plays." }
    ],
    guidelines: {
      dressCode: "Decent attire is required. Traditional garments like Dhotis, Kurtas, Sarees, and Salwars are highly recommended.",
      rules: [
        "Photography is permitted in the outer open courtyards but strictly banned in the inner sanctorum.",
        "Footwear must be deposited outside (footwear stand available near entrance).",
        "Keep the green lawn surroundings clean."
      ],
      restrictions: [
        "Do not touch or lean on ancient fresco wall paintings.",
        "Plastics are banned inside the complex."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Trichy Airport (60km away)", "Thanjavur Junction Railway Station (1.5km away)", "City buses and auto rickshaws"],
      details: "Thanjavur is well-equipped with heritage hotels, homestays, and modern lodges. The ASI and State Tourism Board operate information kiosks inside the fortress walls."
    }
  },
  {
    id: "golden-temple",
    name: "Sri Harmandir Sahib (Golden Temple)",
    deity: "Adi Granth (Guru Granth Sahib)",
    state: "Punjab",
    city: "Amritsar",
    region: "North",
    history: "Sri Harmandir Sahib, also known as the Golden Temple, is the preeminent spiritual site of Sikhism. It was designed by Guru Arjan Dev, who laid the foundation stone in 1589 and compiled the holy book Guru Granth Sahib. The temple was built with doors opening in all four directions, symbolizing that people from all walks of life are welcome. In the early 19th century, Maharaja Ranjit Singh covered the upper floors of the Gurdwara with 750 kg of gold leaf. The temple complex is surrounded by a large sarovar (holy pool) known as the Amrit Sarovar.",
    architectureStyle: "Sikh Architecture (Indo-Islamic and Hindu hybrid)",
    heritageStatus: "Ancient (Established 1589 CE)",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=800&q=80",
    mapCoords: { lat: 31.6200, lng: 74.8765 },
    featured: true,
    approved: true,
    darshanTimings: {
      morning: "03:00 - 12:00",
      evening: "12:00 - 23:00",
      aarti: [
        { name: "Prakash (Holy Book opening)", time: "03:00" },
        { name: "Sukhasan (Holy Book closing)", time: "22:00" }
      ]
    },
    rituals: [
      "Guru Granth Sahib Prakash (Bringing the holy book in a gold palanquin to the main shrine at dawn)",
      "Kirtan (Continuous singing of divine hymns from Guru Granth Sahib)",
      "Sukhasan (Carrying the holy book back to Akal Takht for the night)"
    ],
    festivals: [
      { name: "Vaisakhi", month: "April", significance: "Commemorates the creation of the Khalsa panth in 1699 by Guru Gobind Singh." },
      { name: "Guru Nanak Jayanti", month: "November", significance: "Birth anniversary of the owner of Sikhism, illuminated with fireworks." }
    ],
    guidelines: {
      dressCode: "All visitors, regardless of religion or gender, must cover their head with a scarf or bandana (available for free near entrances). Knees and shoulders must be covered.",
      rules: [
        "Footwear and socks must be deposited at the free cloakrooms, and hands/feet must be washed in shallow pools before entering.",
        "Tobacco, alcohol, and drugs are strictly prohibited. You cannot enter under their influence.",
        "Sit cross-legged while listening to Gurbani in the main hall."
      ],
      restrictions: [
        "No photography is allowed inside the main shrine building, only around the outer pool corridor (parikrama).",
        "Swimming in the pool is not allowed, but bathing is permitted in designated spots."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Sri Guru Ram Dass Jee International Airport (13km away)", "Amritsar Junction Railway Station (2km away)", "Free temple shuttle buses from railway station"],
      details: "Free accommodation in Sri Guru Ram Das Niwas hostel. The Langar (Guru-ka-Langar) is a 24/7 massive kitchen serving free hot vegetarian meals to over 100,000 people daily, cooked entirely by volunteers."
    }
  },
  {
    id: "somnath-temple",
    name: "Somnath Temple",
    deity: "Shiva",
    state: "Gujarat",
    city: "Veraval",
    region: "West",
    history: "The Somnath Temple, located in Prabhas Patan near Veraval, is the first among the twelve holy Jyotirlinga shrines of Lord Shiva. According to legends, the temple was built in gold by the Moon God (Soma), in silver by Ravana, in wood by Krishna, and in stone by Bhimadeva. It is renowned for its historical resilience, having been destroyed and looted by invaders seventeen times, and rebuilt each time. The present temple was constructed in the grand Chalukya style in 1951, spearheaded by Sardar Vallabhbhai Patel after India's independence.",
    architectureStyle: "Māru-Gurjara (Chalukya Style)",
    heritageStatus: "Modern Reconstruct (1951)",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
    mapCoords: { lat: 20.8880, lng: 70.4012 },
    featured: false,
    approved: true,
    darshanTimings: {
      morning: "06:00 - 11:30",
      evening: "12:30 - 21:30",
      aarti: [
        { name: "Pratah Aarti", time: "07:00" },
        { name: "Madhya Aarti", time: "12:00" },
        { name: "Sayang Aarti", time: "19:00" }
      ]
    },
    rituals: [
      "Somnath Maha Pooja",
      "Gangajal Abhishek (Holy Ganges water poured over the Lingam)",
      "Daily Sound & Light Show (Jay Somnath) on the Arabian Sea coast"
    ],
    festivals: [
      { name: "Kartik Purnima Mela", month: "November", significance: "A grand cultural fair and gathering of pilgrims on the beach." },
      { name: "Maha Shivaratri", month: "February/March", significance: "Grand prayers and ocean-front decorations lasting 3 days." }
    ],
    guidelines: {
      dressCode: "Traditional and decent clothing. Half pants, shorts, skirts, or inappropriate clothing are strictly prohibited.",
      rules: [
        "High-security check: Mobiles, cameras, chargers, bags, and electronic items are not allowed. Free lockers are provided.",
        "Photography is completely prohibited within the temple gates.",
        "Non-Hindus must obtain a permission slip from the temple office for security clearance."
      ],
      restrictions: [
        "Do not throw plastic, trash, or waste on the beach or temple premises.",
        "Entry is restricted after 22:00."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Keshod Airport (55km away)", "Diu Airport (85km away)", "Veraval Railway Station (7km away)", "Regular bus connections from Rajkot/Ahmedabad"],
      details: "Somnath Trust operates guest houses (Sagar Darshan, Lilaavati Niwas) with sea-views. Tourist reception center, dining halls, and clean shopping arcades are situated outside."
    }
  }
];
