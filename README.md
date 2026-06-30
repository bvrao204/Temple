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

```text
India-Temple-Heritage-Pilgrimage-Information-Portal/
├── .github/                   ← GitHub automation workflows & issue templates
│   ├── ISSUE_TEMPLATE/        ← Custom templates for filing issues
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/             ← GitHub Actions automation configurations
│   │   └── deploy.yml         ← Build & deploy script for GitHub Pages
│   └── pull_request_template.md ← Template for contributing pull requests
├── public/                    ← Static assets served directly (icons, manifest, SW, images)
│   ├── favicon.svg            ← App favicon & primary PWA launcher icon
│   ├── icons.svg              ← Common icons collection
│   ├── manifest.json          ← Web App Manifest defining standalone mobile experience
│   ├── sw.js                  ← Service Worker implementing offline caching shell
│   └── images/                ← High-quality offline temple & structural assets (30+ images)
├── src/                       ← React.js Application Source Code
│   ├── App.css                ← Minimal fallback styles
│   ├── App.jsx                ← Core application router & global state manager
│   ├── index.css              ← Main stylesheet defining variables, colors & glassmorphism
│   ├── main.jsx               ← Bootstrap entry point, registers PWA Service Worker
│   ├── assets/                ← Build-time asset directory
│   ├── data/
│   │   └── temples.js         ← Local JS database of 23 detailed shrines (offline repository)
│   └── components/            ← Modular React Component UI Layer
│       ├── Navbar.jsx         ← Header navigation bar with search & Theme toggling
│       ├── Hero.jsx           ← Prominent banner with autocomplete search input
│       ├── TempleCard.jsx     ← Grid card with dynamic live open/close timings indicators
│       ├── TempleDirectory.jsx← Catalog organizer with multi-sorting & multi-filter queries
│       ├── DetailView.jsx     ← Tabs (History, Timings, Rules, Transit, Reviews board)
│       ├── CircuitPlanner.jsx ← Route trackers, SVG sequence diagrams & customized yatra builder
│       ├── VirtualMuseum.jsx  ← Architecture school guides & interactive cultural trivia quiz
│       ├── AdminPanel.jsx     ← Secure Analytics dashboard & dynamic catalog CRUD/moderation queue
│       └── Footer.jsx         ← Government resource portal index & project author credit
├── CODE_OF_CONDUCT.md         ← Community guidelines and standards
├── CONTRIBUTING.md            ← Developer guide on setup, linting, and pull requests
├── LICENSE                    ← MIT License document representing ownership terms
├── SECURITY.md                ← Instructions on private vulnerability reporting
├── index.html                 ← Main HTML entry point containing viewport meta tags
├── package.json               ← NPM packages, script configs, author & license metadata
└── vite.config.js             ← Vite config defining asset base-routing
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

---

## 🤝 Contributing & Community

We welcome contributions to help improve the Bharat Heritage Portal! Please check out the following guidelines before getting started:

* **[Contributing Guidelines](file:///d:/farw/Temples/CONTRIBUTING.md)**: Learn how to set up the development environment, make edits, and submit pull requests.
* **[Code of Conduct](file:///d:/farw/Temples/CODE_OF_CONDUCT.md)**: Our pledge to foster a welcoming, diverse, and inclusive environment.
* **[Security Policy](file:///d:/farw/Temples/SECURITY.md)**: How to securely report vulnerabilities in the project.

---

## 📄 Author & License

- **Author**: B Venkateswara Rao
- **License**: This project is licensed under the [MIT License](file:///d:/farw/Temples/LICENSE) - see the [LICENSE](file:///d:/farw/Temples/LICENSE) file for details.


