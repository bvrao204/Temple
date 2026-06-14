# India Temple Heritage & Pilgrimage Information Portal

A modern, responsive, and visually stunning web portal showcasing India's rich cultural, historical, and architectural temple heritage. Built as an elite-tier internship project submission for **Unified Mentor** and **Incredible India**.

---

## 🌟 Key Features

1. **Interactive Temple Directory**:
   - High-fidelity visual cards for major historical temples of India.
   - Comprehensive multi-dimension search (by name, deity, state, or city) with real-time autocomplete suggestions.
   - Granular filters (State, Deity, Architecture Style, and Heritage Era) with multi-sorting.
   - **Dynamic Live Timing Status Indicator**: Programmatically calculates and displays whether a temple is "Open Now", "Closed", or undergoing a sacred "Aarti" based on the visitor's local system time.

2. **Rich Temple Profiles (Detail View)**:
   - Parallax banner header and responsive layout.
   - Historical narratives, architectural legacies, and principal deity backgrounds.
   - Operational hours timetable (Aarti slots & pooja charts).
   - Strict dress codes, visitor restrictions, and warnings.
   - Travel connectivity tips (Air, Rail, local e-rickshaw coordinates) and dharamshala details.
   - **Interactive User Notes & Feedback Board**: A persistent review/tip module synced to `localStorage`.

3. **Guided Pilgrimage Circuit Planner**:
   - Predefined cultural circuits: *Jyotirlinga Loop*, *Dravidian Architectural Circuit*, and *UNESCO Heritage Route*.
   - **Itinerary Checklist Logs**: Track transport, lodging, and darshan ticket reservations for each stop (persisted in local cache).
   - **Interactive Routing Flowchart**: Dynamically renders an SVG flow diagram of nodes indicating sequence and connections.
   - **Custom Yatra Builder**: Choose temples, name your customized circuit, sequence them, and save them.

4. **Virtual Heritage Museum**:
   - Detailed breakdown of structural styles: *Nagara* (Northern), *Dravidian* (Southern), and *Vesara* (Hybrid) styles.
   - Glossary definitions of Vedic architectural terms (Garbhagriha, Mandapa, Gopuram, Vimana).
   - **Interactive Cultural Quiz**: Challenge yourself on temple history and architecture with instant correctness checks, score updates, and detailed educational explanations.

5. **Secured Administrative Control Room**:
   - Security credentials validation (`admin` / `Venky123`).
   - **Live Analytics Dashboard**: Graphical reports on counts, average ratings, and a custom CSS-rendered horizontal bar graph of regional temple distribution.
   - **Catalog CRUD Panel**: Full form validation to add new temples, edit existing ones, or delete listings.
   - **User Submissions Moderation Queue**: Moderation queue to "Approve & Publish" or "Reject" crowd-sourced temple drafts.

---

## 🛠️ Technology Stack

- **Frontend Core**: React.js 19 (via Vite)
- **Styling**: Modern Vanilla CSS (CSS Variables, Responsive Flex/Grid, Glassmorphism panels, Hover scale micro-interactions)
- **Icons**: Lucide React
- **Database & State**: In-memory React State + persistent `localStorage` synchronization (Zero external setup required for immediate evaluation).

---

## ⚙️ Quick Start & Setup Instructions

To run the application locally on your machine, follow these simple steps:

### 1. Clone the Repository
```bash
git clone https://github.com/bvrao204/India-Temple-Heritage-Pilgrimage-Information-Portal.git
cd India-Temple-Heritage-Pilgrimage-Information-Portal
```

### 2. Install Project Dependencies
Run the standard package manager command to download and build all local node modules:
```bash
npm install
```

### 3. Launch the Development Server
Fire up Vite's lightning-fast local web server:
```bash
npm run dev
```

### 4. Open the Web Application
Open your web browser and navigate to the local address outputted in your console (usually: **`http://localhost:5173`**).

---

## 📂 Directory Structure

```
India-Temple-Heritage-Pilgrimage-Information-Portal/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Icons and images
│   ├── data/
│   │   └── temples.js       # Preloaded database of 9 major Indian temples
│   ├── components/
│   │   ├── Navbar.jsx       # Theme toggle & responsive menu
│   │   ├── Hero.jsx         # Header metrics & autocomplete search
│   │   ├── TempleCard.jsx   # Live timing calculator badge & summary
│   │   ├── TempleDirectory.jsx # State/Deity/Style filters & catalog
│   │   ├── DetailView.jsx   # Parallax tabs & reviews form
│   │   ├── CircuitPlanner.jsx # Circuits checklist & SVG flow routing
│   │   ├── VirtualMuseum.jsx # Architecture guides & cultural quiz
│   │   ├── AdminPanel.jsx   # Analytics charts, CRUD, & approval queue
│   │   └── Footer.jsx       # Credits & official tourism portal links
│   ├── App.jsx              # Main router & global state manager
│   ├── index.css            # Centralized custom design system & dark mode rules
│   └── main.jsx             # Mounting bootstrap
├── index.html               # Main viewport shell (implements Google Fonts)
├── package.json             # Build configuration & dependencies
├── vite.config.js           # Vite server settings
└── README.md                # Technical Documentation
```

---

## 🔒 Admin Access Credentials
For evaluation by internship mentors, the Admin Panel can be accessed using:
- **Default Username**: `admin`
- **Default Password**: `Venky123`

---

## 📈 KPIs Fulfilled

- **Performance**: Loads instantly (Lighthouse performance target of 95+). No bulky external frameworks or network latency.
- **Usability**: Intuitive, warm gold and saffron theme respecting the sanctity of the cultural sites. High legibility and contrast dark mode toggle.
- **Accessibility**: Adaptable responsive grids scaling smoothly from 320px mobile screens to large desktop monitors.
