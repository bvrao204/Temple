# Mobile Deployment & Progressive Web App (PWA) Integration Plan

Configure the India Temple Heritage web application for native-like mobile deployment. This plan turns the web application into an installable **Progressive Web App (PWA)**, configures the local server for network hosting over Wi-Fi, and provides clear steps to verify the cloud deployment on GitHub Pages.

## User Review Required

> [!IMPORTANT]
> - **Local Mobile Testing (Wi-Fi)**: To open the local development server on a mobile phone, the computer and the mobile device must be connected to the **same Wi-Fi network**. We will configure Vite to serve the project on all network interfaces (`vite --host`). Once run, you can access the local server using your computer's local IP address (e.g., `http://192.168.1.XX:5173/India-Temple-Heritage-Pilgrimage-Information-Portal/`).
> - **GitHub Pages Settings**: Since the `gh-pages` branch is already pushed to GitHub, you will need to verify in your GitHub Repository settings that GitHub Pages is active. Go to **Settings -> Pages** on GitHub and ensure the Source is set to **Deploy from a branch** and the Branch is set to **`gh-pages`** (folder `/root`). This will make the site live at `https://bvrao204.github.io/India-Temple-Heritage-Pilgrimage-Information-Portal/`.

---

## Proposed Changes

### Configuration & Entry Files

#### [MODIFY] [package.json](file:///d:/farw/Temples/package.json)
- Update the `"dev"` script from `"vite"` to `"vite --host"` to automatically expose the dev server to the local Wi-Fi network.

#### [MODIFY] [index.html](file:///d:/farw/Temples/index.html)
- Replace static relative paths (like `/favicon.svg`) with Vite's `%BASE_URL%favicon.svg` to prevent 404 errors on GitHub Pages.
- Add mobile PWA meta tags for iOS and Android:
  - `<meta name="mobile-web-app-capable" content="yes" />`
  - `<meta name="apple-mobile-web-app-capable" content="yes" />`
  - `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />`
  - `<meta name="apple-mobile-web-app-title" content="Bharat Heritage" />`
  - `<link rel="apple-touch-icon" href="%BASE_URL%favicon.svg" />`
  - `<meta name="theme-color" content="#ff6f3c" />`
- Link the PWA manifest: `<link rel="manifest" href="%BASE_URL%manifest.json" />`

#### [NEW] [public/manifest.json](file:///d:/farw/Temples/public/manifest.json)
- Create a web manifest defining PWA features:
  - Name: `India Temple Heritage & Pilgrimage Portal`
  - Short Name: `Bharat Heritage`
  - Theme Color: `#ff6f3c` (Warm Saffron)
  - Background Color: `#fbf9f5` (Warm Cream)
  - Display: `standalone` (removes mobile browser address bar for a native app feel)
  - Orientation: `portrait`
  - Icons: Reference the SVG favicon (`favicon.svg`) to serve as the application launcher icon.

#### [NEW] [public/sw.js](file:///d:/farw/Temples/public/sw.js)
- Implement a cache-first service worker to enable offline availability on mobile:
  - Cache name: `bharat-temples-cache-v1`
  - Cache all main static assets (HTML, CSS, JS bundle, and local temple images).
  - Intercept fetch requests to serve cached content when offline, falling back to network fetch.

#### [MODIFY] [src/main.jsx](file:///d:/farw/Temples/src/main.jsx)
- Register the service worker using Vite's `import.meta.env.BASE_URL` to ensure it works correctly both in local development and under the subfolder path on GitHub Pages.

---

## Verification Plan

### Automated Tests
- Run `npm run build` to verify the production compilation compiles successfully without warnings or path errors.

### Manual Verification
1. **Local Mobile Test (Same Wi-Fi)**:
   - Run `npm run dev`.
   - Find the `Network:` IP address output in the terminal (e.g., `http://192.168.1.12:5173/India-Temple-Heritage-Pilgrimage-Information-Portal/`).
   - Open that URL on your mobile phone's browser.
   - Test layout, scrolling, theme toggle, and the temple directory.
2. **PWA Installation Test**:
   - On Android (Chrome): Look for the "Add to Home Screen" or "Install App" prompt.
   - On iOS (Safari): Tap the share button and select "Add to Home Screen".
   - Open the installed app from the home screen and verify it opens in fullscreen mode without the browser URL bar.
3. **Offline Test**:
   - While viewing the app, turn off your mobile device's internet connection (enable airplane mode).
   - Reload the page. The app should load instantly using the cached service worker assets, displaying the 23 temples.
4. **GitHub Pages Live Link**:
   - Ensure the repository settings on GitHub are set to serve from `gh-pages`.
   - Access the live link `https://bvrao204.github.io/India-Temple-Heritage-Pilgrimage-Information-Portal/` on your mobile phone.
