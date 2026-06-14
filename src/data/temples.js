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
    image: "/images/kedarnath.png",
    website: "https://shribadrinath-kedarnath.gov.in/",
    gallery: [
      "/images/kedarnath.png",
      "/images/kedarnath_1.png",
      "/images/kedarnath_2.png",
      "/images/kedarnath_3.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png"
    ],
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
    image: "/images/kashi_vishwanath.png",
    website: "https://shrikashivishwanath.org/",
    gallery: [
      "/images/kashi_vishwanath.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
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
    image: "/images/tirupati_balaji.png",
    website: "https://tirupatibalaji.ap.gov.in/",
    gallery: [
      "/images/tirupati_balaji.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
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
    image: "/images/meenakshi_amman.png",
    website: "https://maduraimeenakshi.hrce.tn.gov.in/",
    gallery: [
      "/images/meenakshi_amman.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
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
    image: "/images/jagannath_puri.png",
    website: "https://shreejagannath.in/",
    gallery: [
      "/images/jagannath_puri.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
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
    image: "/images/sun_temple_konark.png",
    website: "https://odishatourism.gov.in/content/tourism/en/discover/major-attractions/konark-sun-temple.html",
    gallery: [
      "/images/sun_temple_konark.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
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
    image: "/images/brihadeeswarar.png",
    website: "https://thanjavur.nic.in/tourist-place/brihadeeswarar-temple/",
    gallery: [
      "/images/brihadeeswarar.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
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
    image: "/images/golden_temple.png",
    website: "https://sgpc.net/",
    gallery: [
      "/images/golden_temple.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
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
    image: "/images/somnath.png",
    website: "https://www.somnath.org/",
    gallery: [
      "/images/somnath.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
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
  },
  {
    id: "badrinath",
    name: "Badrinath Temple",
    deity: "Vishnu (Badrinarayan)",
    state: "Uttarakhand",
    city: "Badrinath",
    region: "North",
    history: "Part of both the Char Dham and Chota Char Dham pilgrimage circuits. Nestled between the Nar and Narayana mountain ranges along the Alaknanda River, it is dedicated to Lord Vishnu. The temple was established by Adi Shankara in the 8th century, who discovered the black Saligram stone idol of Lord Badrinarayan in the Alaknanda River and consecrated it inside a cave near Tapt Kund.",
    architectureStyle: "Garhwali Style (Himalayan Architecture)",
    heritageStatus: "Ancient (Reconstructed in the 8th Century)",
    rating: 4.9,
    image: "/images/badrinath.png",
    website: "https://shribadrinath-kedarnath.gov.in/",
    gallery: [
      "/images/badrinath.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
    mapCoords: { lat: 30.7447, lng: 79.4912 },
    featured: true,
    approved: true,
    darshanTimings: {
      morning: "04:30 - 13:00",
      evening: "16:00 - 21:00",
      aarti: [
        { name: "Maha Abhishek", time: "04:30" },
        { name: "Geeta Path", time: "09:00" },
        { name: "Shayan Aarti", time: "20:30" }
      ]
    },
    rituals: [
      "Maha Abhishek Pooja (Early Morning)",
      "Kapoorti Aarti",
      "Geeta Path recitation",
      "Evening Shayan Aarti"
    ],
    festivals: [
      { name: "Badri Kedar Utsav", month: "June", significance: "An 8-day cultural festival highlighting regional heritage." },
      { name: "Mata Murti Mela", month: "September", significance: "Commemorates the descent of the holy river Ganga on earth." }
    ],
    guidelines: {
      dressCode: "Modest and traditional clothing recommended. Heavy winter wear is essential due to the high-altitude climate.",
      rules: [
        "Cameras and mobile phones are strictly prohibited inside the sanctum sanctorum.",
        "Take a holy bath in the thermal springs (Tapt Kund) below the temple before entering.",
        "No footwear allowed within the temple premises."
      ],
      restrictions: [
        "The temple is closed during winter months (November to April) due to heavy snow.",
        "Not recommended for people with severe respiratory issues without oxygen backups (altitude: 3,133m)."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Helicopter services from Dehradun/Phata", "Shared cabs and state buses from Haridwar/Rishikesh", "Private cars scaling Badrinath highway"],
      details: "Numerous GMVN tourist bungalows, ashrams, and private hotels are available. Essential medical centers and thermal bathing springs are situated close to the temple."
    }
  },
  {
    id: "dwarkadhish",
    name: "Dwarkadhish Temple",
    deity: "Krishna (Dwarkadhish)",
    state: "Gujarat",
    city: "Dwarka",
    region: "West",
    history: "Also known as the Jagat Mandir, it is dedicated to Lord Krishna, who is worshipped here as the 'King of Dwarka'. The main five-storied building is supported by 72 pillars and is believed to have been built over 2,000 years ago by Vajranabha, Krishna's grandson. It is part of the Char Dham pilgrimage circuit. The temple features a spectacular flag (Dhvaj) made of 52 yards of cloth hoisting on the temple spire, displaying symbols of the sun and moon.",
    architectureStyle: "Māru-Gurjara Style (Chalukya Architecture)",
    heritageStatus: "Ancient (Over 2000 years old)",
    rating: 4.9,
    image: "/images/dwarkadhish.png",
    website: "https://www.dwarkadhish.org/",
    gallery: [
      "/images/dwarkadhish.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
    mapCoords: { lat: 22.2376, lng: 68.9674 },
    featured: false,
    approved: true,
    darshanTimings: {
      morning: "06:30 - 13:00",
      evening: "17:00 - 21:30",
      aarti: [
        { name: "Mangala Aarti", time: "06:30" },
        { name: "Shringar Aarti", time: "10:30" },
        { name: "Sandhya Aarti", time: "19:30" }
      ]
    },
    rituals: [
      "Dhvajaroohan (Changing the temple flag five times a day with grand celebrations)",
      "Mangala Aarti",
      "Shringar Pooja",
      "Shayan Aarti"
    ],
    festivals: [
      { name: "Krishna Janmashtami", month: "August/September", significance: "The birth of Lord Krishna, celebrated with lakhs of devotees, night long prayers, and cultural displays." }
    ],
    guidelines: {
      dressCode: "Traditional Indian attire is requested. Shorts, crop tops, and short skirts are strictly banned.",
      rules: [
        "Mobile phones, cameras, and leather items must be deposited in the locker outside.",
        "Foreign nationals need permission if entering specific inner sanctuaries.",
        "Maintain silence and decorum inside the temple halls."
      ],
      restrictions: [
        "Photography is completely prohibited within the temple gates.",
        "Expect extremely heavy queues during festival seasons."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Dwarka Railway Station (1.5km away)", "Jamnagar Airport (137km away)", "State transport buses and private taxis"],
      details: "Dwarka Devsthan Samiti guest houses, private budget/luxury hotels, and Dharamshalas. Free meal schemes (Bhog) are offered by various trusts."
    }
  },
  {
    id: "mahakaleshwar",
    name: "Mahakaleshwar Jyotirlinga Temple",
    deity: "Shiva (Mahakaleshwar)",
    state: "Madhya Pradesh",
    city: "Ujjain",
    region: "Central",
    history: "One of the twelve famous Jyotirlingas, this temple is located on the bank of the Shipra River. The idol of Mahakaleshwar is Dakshinamurti, meaning it faces south—a unique feature among the Jyotirlingas. It is famous for the pre-dawn Bhasma Aarti, which involves bathing the Shiva Lingam with holy ash. The temple has stood resilient against historic reconstructions, with the current structure rebuilt in the Chalukya, Maratha, and Bhumija styles by the Scindias of Gwalior.",
    architectureStyle: "Bhumija & Nagara Style",
    heritageStatus: "Medieval (Rebuilt in the 18th century)",
    rating: 4.9,
    image: "/images/mahakaleshwar.png",
    website: "https://shrimahakaleshwar.com/",
    gallery: [
      "/images/mahakaleshwar.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
    mapCoords: { lat: 23.1827, lng: 75.7682 },
    featured: true,
    approved: true,
    darshanTimings: {
      morning: "04:00 - 13:00",
      evening: "13:00 - 23:00",
      aarti: [
        { name: "Bhasma Aarti", time: "04:00" },
        { name: "Naivedya Aarti", time: "07:30" },
        { name: "Sandhya Aarti", time: "19:00" },
        { name: "Shayan Aarti", time: "22:30" }
      ]
    },
    rituals: [
      "Bhasma Aarti (Pre-dawn holy ash ritual conducted by priests)",
      "Rudrabhishek Pooja",
      "Jal Abhishek",
      "Panchamrit Abhishek"
    ],
    festivals: [
      { name: "Maha Shivaratri", month: "February/March", significance: "Grand 9-day celebration ending with Shivaratri night prayers and street processions." },
      { name: "Shravan Somvar", month: "July/August", significance: "Special processions (Sawaari) of Lord Mahakal on Mondays through Ujjain city." }
    ],
    guidelines: {
      dressCode: "Strict Dress Code for Bhasma Aarti: Saree for women, Dhoti/Sola (unstitched cotton cloth) for men. Standard visitors should wear modest Indian clothing.",
      rules: [
        "Bhasma Aarti requires booking in advance online.",
        "Mobiles and cameras are strictly banned inside the main temple.",
        "Maintain queue discipline during peak hours."
      ],
      restrictions: [
        "No leather accessories (belts, wallets) inside the main temple premises.",
        "Bhasma Aarti bookings close weeks in advance due to high demand."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Ujjain Junction Railway Station (2km)", "Devi Ahilya Bai Holkar Airport, Indore (55km)", "Local e-rickshaws and cabs"],
      details: "Mahakal Dharmashala, VIP guest houses, and hotels in Ujjain. Free Annakshetra (dining hall) runs daily, providing meals to thousands of pilgrims."
    }
  },
  {
    id: "kandariya-mahadeva",
    name: "Kandariya Mahadeva Temple",
    deity: "Shiva",
    state: "Madhya Pradesh",
    city: "Khajuraho",
    region: "Central",
    history: "Built by the Chandela rulers in the 11th century CE, Kandariya Mahadeva is the largest, tallest, and most ornate temple in the Khajuraho Group of Temples, a UNESCO World Heritage Site. It represents the pinnacle of Nagara style architecture in Central India, featuring a main tower (Shikhara) designed to look like a mountain range, covered in 84 smaller miniature spires (Urushringas). The temple is globally renowned for its exquisite stone carvings depicting celestial dancers, musicians, and historical motifs.",
    architectureStyle: "Nagara Style (Chandela Architecture)",
    heritageStatus: "UNESCO World Heritage Site",
    rating: 4.8,
    image: "/images/kandariya_mahadeva.png",
    website: "https://www.mptourism.com/destination-khajuraho.php",
    gallery: [
      "/images/kandariya_mahadeva.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
    mapCoords: { lat: 24.8530, lng: 79.9218 },
    featured: false,
    approved: true,
    darshanTimings: {
      morning: "06:00 - 18:00",
      evening: "Closed for worship (Monument only)",
      aarti: []
    },
    rituals: [
      "Non-active Temple: No daily worship ceremonies are conducted here since the deity was removed historically.",
      "Light and Sound Show: Held daily in the evening in the Western group of temples."
    ],
    festivals: [
      { name: "Khajuraho Dance Festival", month: "February", significance: "Grand classical dance performances by internationally acclaimed artists against the backdrop of illuminated temples." }
    ],
    guidelines: {
      dressCode: "Decent casual clothing. It is an archaeological park and a protected heritage monument.",
      rules: [
        "Tickets must be booked online via the ASI website or at the main entrance.",
        "Avoid touching or scaling the delicate carved panels to prevent degradation.",
        "Hiring a government-authorized guide is highly recommended to understand the iconography."
      ],
      restrictions: [
        "Drones are prohibited without prior permission from the Archaeological Survey of India (ASI).",
        "No food items or large bags allowed inside the temple enclosure."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Khajuraho Railway Station (5km)", "Khajuraho Airport (4km)", "Taxis and local auto-rickshaws"],
      details: "Luxury resorts, budget hotels, and MPTDC tourist lodges in Khajuraho. A modern visitor museum and amenities center are located near the main entry."
    }
  },
  {
    id: "ramanathaswamy",
    name: "Ramanathaswamy Temple",
    deity: "Shiva (Ramanathaswamy)",
    state: "Tamil Nadu",
    city: "Rameswaram",
    region: "South",
    history: "Located on Rameswaram Island in Tamil Nadu, this temple is dedicated to Lord Shiva and is part of the Char Dham pilgrimage circuit. It is deeply associated with the Ramayana, believed to have been established by Lord Rama and Sita to absolute their sins after the battle. The temple has the longest corridor (corridor of 1212 pillars) among all Hindu temples in the world, representing majestic Pandya and Nayak architecture. Pilgrims perform ritual baths in 22 holy water wells (Teerthams) inside the complex before darshan.",
    architectureStyle: "Dravidian Style (Nayak and Pandya)",
    heritageStatus: "Ancient (Dating back to the 12th Century)",
    rating: 4.9,
    image: "/images/ramanathaswamy.png",
    website: "https://rameswaramramanathaswamy.hrce.tn.gov.in/",
    gallery: [
      "/images/ramanathaswamy.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
    mapCoords: { lat: 9.2881, lng: 79.3174 },
    featured: true,
    approved: true,
    darshanTimings: {
      morning: "05:00 - 13:00",
      evening: "15:00 - 21:00",
      aarti: [
        { name: "Spadika Linga Darshan", time: "05:10" },
        { name: "Sayaraksha Pooja", time: "18:00" },
        { name: "Palliyarai Pooja", time: "20:30" }
      ]
    },
    rituals: [
      "Mani Darshan / Spadika Linga Darshan (Early morning worship of the crystal Lingam)",
      "Teertha Snanam (Ritual bathing in 22 distinct temple wells)",
      "Abhishekam to Lord Ramanathaswamy",
      "Sayaraksha Aarti"
    ],
    festivals: [
      { name: "Maha Shivaratri", month: "February/March", significance: "Grand 10-day festival culminating in chariot and silver car processions." },
      { name: "Thirukalyanam", month: "July/August", significance: "Celestial wedding festival of Lord Ramanathaswamy and Goddess Parvathavardhini." }
    ],
    guidelines: {
      dressCode: "Strict Dress Code: Dhoti/Kurta for men, Saree/Salwar Kameez for women. Shorts, jeans, T-shirts, and western dresses are not allowed.",
      rules: [
        "Bathing in the 22 wells is mandatory before visiting the inner sanctum.",
        "Keep dry clothes handy to change into after the holy bath; wet clothes are not allowed inside the main shrine.",
        "Mobiles, cameras, and recording equipment are strictly banned."
      ],
      restrictions: [
        "Expect wet floors around the Teertham wells; walk carefully.",
        "No leather products allowed inside."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Rameswaram Railway Station (1.5km)", "Madurai Airport (175km)", "Regular state transport buses over the Pamban Bridge"],
      details: "Devasthanam guest houses, private ashrams, budget lodges, and mid-range hotels. Changing rooms are provided near the Teerthams."
    }
  },
  {
    id: "kamakhya",
    name: "Kamakhya Temple",
    deity: "Shakti (Kamakhya)",
    state: "Assam",
    city: "Guwahati",
    region: "East",
    history: "Situated on the Nilachal Hill in western Guwahati, Kamakhya Temple is one of the oldest and most revered of the 51 Shakti Peethas in India. It is dedicated to Goddess Kamakhya, the goddess of desire and fertility. According to Hindu mythology, the yoni (womb) of Goddess Sati fell here. The temple is famous for the Ambubachi Mela, an annual festival celebrating the menstruation cycle of the goddess, which draws thousands of Tantric practitioners and pilgrims.",
    architectureStyle: "Nilachal Style (Hybrid Nagara and Ahom Style)",
    heritageStatus: "Ancient (Reconstructed in the 16th Century)",
    rating: 4.8,
    image: "/images/kamakhya.png",
    website: "https://www.maakamakhya.org/",
    gallery: [
      "/images/kamakhya.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
    mapCoords: { lat: 26.1664, lng: 91.7065 },
    featured: false,
    approved: true,
    darshanTimings: {
      morning: "08:00 - 13:00",
      evening: "14:30 - 17:30",
      aarti: [
        { name: "Snana Pooja", time: "05:30" },
        { name: "Evening Aarti", time: "18:30" }
      ]
    },
    rituals: [
      "Snana Pooja & Nitya Pooja",
      "Kumari Pooja (Worshipping young girls as forms of the Goddess)",
      "Daily bloodless and symbolic puja routines inside the cave"
    ],
    festivals: [
      { name: "Ambubachi Mela", month: "June", significance: "Celebrates the yearly menstrual cycle of Goddess Kamakhya. The temple is closed for three days and opens on the fourth day with massive gatherings of Sadhus and devotees." },
      { name: "Durga Puja", month: "September/October", significance: "Celebrated over five days with grand scale pujas and elaborate rituals." }
    ],
    guidelines: {
      dressCode: "Modest Indian clothing is recommended. Cleanliness is highly emphasized.",
      rules: [
        "VIP passes (Direct Entry) are available at the counter to bypass general queues.",
        "Mobiles, cameras, and bags are prohibited in the inner cave (Garbhagriha).",
        "Follow security directions on Nilachal hill."
      ],
      restrictions: [
        "During Ambubachi Mela, the main temple is closed to visitors for the first three days.",
        "The inner sanctum is a narrow, dark cave with water streams; step carefully."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Guwahati Railway Station (6km)", "Lokpriya Gopinath Bordoloi International Airport (18km)", "Buses and shared taxis scaling the Nilachal Hill"],
      details: "Temple Board guest houses, lodges, and high-end hotels in Guwahati. Food outlets, public washrooms, and waiting halls are built along the hill path."
    }
  },
  {
    id: "padmanabhaswamy",
    name: "Sree Padmanabhaswamy Temple",
    deity: "Vishnu (Anantha Padmanabha)",
    state: "Kerala",
    city: "Thiruvananthapuram",
    region: "South",
    history: "Located in Thiruvananthapuram, Kerala, this temple is dedicated to Lord Vishnu, who is depicted in the 'Anantha Shayanam' posture (reclining on the serpent Anantha). It is widely regarded as the wealthiest place of worship in the world, containing massive secret underground vaults filled with gold, jewels, and ancient artifacts. The temple's administration is historically linked to the Travancore Royal Family, and it exhibits a beautiful blend of Kerala and Tamil Dravidian architectural patterns.",
    architectureStyle: "Chera and Dravidian Hybrid Style",
    heritageStatus: "Ancient (Dating back to the 6th Century)",
    rating: 4.9,
    image: "/images/padmanabhaswamy.png",
    website: "https://spst.in/",
    gallery: [
      "/images/padmanabhaswamy.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
    mapCoords: { lat: 8.4830, lng: 76.9436 },
    featured: false,
    approved: true,
    darshanTimings: {
      morning: "03:30 - 12:00",
      evening: "17:00 - 20:20",
      aarti: [
        { name: "Nirmalya Darshan", time: "03:30" },
        { name: "Usha Pooja", time: "05:15" },
        { name: "Athazha Pooja", time: "19:30" }
      ]
    },
    rituals: [
      "Nirmalya Darshan (Viewing the deity decorated with yesterday's flowers)",
      "Seeveli (Ritual procession of the deity on caparisoned elephants inside the temple corridors)",
      "Lakshadeepam (Lighting of one lakh oil lamps, once every 6 years)"
    ],
    festivals: [
      { name: "Alpashi Utsav", month: "October/November", significance: "Bi-annual festival concluding with the grand Aarathu (holy bath) procession to the Shanghumugham Beach." },
      { name: "Panguni Utsav", month: "March/April", significance: "A 10-day spring festival with elephant pageants and classical performances." }
    ],
    guidelines: {
      dressCode: "Strict Kerala Dress Code: Men must wear a Mundu (Veshti/Dhoti) and remain bare-chested. Women must wear a Saree, Mundum Neryathum (Set Saree), or long skirt and blouse. Pants, shirts, churidars, and jeans are strictly prohibited.",
      rules: [
        "Only people of Hindu faith are permitted inside the temple.",
        "Dhotis are available for rent/purchase outside the temple gates.",
        "Mobiles, wallets, leather belts, and electronics are banned."
      ],
      restrictions: [
        "Strict security scanning. No luggage allowed inside.",
        "Photography is completely prohibited in the entire temple zone."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Trivandrum Central Railway Station (1km)", "Trivandrum International Airport (4km)", "Auto-rickshaws and local city buses"],
      details: "Devaswom guest houses, luxury hotels, and homestays. Restrooms and safe deposit locker facilities are available near the East Fort entrance."
    }
  },
  {
    id: "siddhivinayak",
    name: "Shree Siddhivinayak Temple",
    deity: "Ganesha (Siddhivinayak)",
    state: "Maharashtra",
    city: "Mumbai",
    region: "West",
    history: "Located in Prabhadevi, Mumbai, this temple is dedicated to Lord Ganesha. It was originally constructed by Laxman Vithu and Deubai Patil in 1801. It is one of the richest and most popular temples in Mumbai, visited by millions of devotees including celebrities and politicians. The Ganesha idol is carved from a single black stone, with the trunk tilted to the right (indicating Siddhi Vinayaka, who fulfills immediate prayers).",
    architectureStyle: "Modern Multi-angular Dome Style",
    heritageStatus: "Medieval (Established 1801 CE)",
    rating: 4.8,
    image: "/images/siddhivinayak.png",
    website: "https://www.siddhivinayak.org/",
    gallery: [
      "/images/siddhivinayak.png",
      "/images/temple_detail_1.png",
      "/images/temple_detail_2.png",
      "/images/temple_detail_3.png",
      "/images/temple_detail_4.png"
    ],
    mapCoords: { lat: 19.0169, lng: 72.8303 },
    featured: false,
    approved: true,
    darshanTimings: {
      morning: "05:30 - 12:00",
      evening: "12:30 - 22:00",
      aarti: [
        { name: "Kakad Aarti", time: "05:30" },
        { name: "Naivedya Aarti", time: "12:00" },
        { name: "Shej Aarti", time: "21:50" }
      ]
    },
    rituals: [
      "Kakad Aarti (Morning prayer)",
      "Naivedya (Sweet offering of Modaks, Ganesha's favorite sweet)",
      "Atharvashirsha Avartan (Chanting Ganesha prayers)"
    ],
    festivals: [
      { name: "Ganesh Chaturthi", month: "August/September", significance: "A grand 10-day festival where millions visit the Utsav Murti. Special prayers, floral displays, and midnight queues." },
      { name: "Angarki Sankashti Chaturthi", month: "Varies", significance: "Highly auspicious Tuesday puja occurring once in few months, drawing over 200,000 devotees." }
    ],
    guidelines: {
      dressCode: "Decent casual or traditional attire. Extremely short clothes, shorts, and crop tops are not permitted.",
      rules: [
        "Free and paid (VIP) entry lines are separate. Check timings online.",
        "Deposit shoes at the free shoe counter.",
        "Laptops and large bags are not allowed inside the main temple area."
      ],
      restrictions: [
        "Expect extremely heavy crowds on Tuesdays, requiring long wait times.",
        "Photography is strictly prohibited inside the main shrine."
      ]
    },
    facilities: {
      accommodation: true,
      transport: ["Dadar Railway Station (2.5km)", "Chhatrapati Shivaji Maharaj International Airport (12km)", "Mumbai local trains, taxis, and city buses"],
      details: "Numerous hotels in Dadar/Prabhadevi. The temple trust provides free medical centers, online donation systems, and clean drinking water points near the queues."
    }
  }
];
