# Contributing to Bharat Heritage Portal

First off, thank you for taking the time to contribute! We welcome contributions to help improve the temple heritage and pilgrimage portal.

## How Can I Contribute?

### Reporting Bugs or Requesting Features
* Check if the issue already exists in the Issues tracker.
* If not, open a new issue using the appropriate template (Bug report or Feature request) and provide as much detail as possible.

### Improving the Code
1. **Fork the Repository**: Create a personal copy of the repository on your GitHub account.
2. **Clone the Fork**: Clone it to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Temple.git
   ```
3. **Install Dependencies**: Install the project dependencies using npm:
   ```bash
   npm install
   ```
4. **Create a Branch**: Create a branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Run Locally**: Launch the development server to test your changes:
   ```bash
   npm run dev
   ```
6. **Code Style & Linting**: Make sure your code is styled correctly and passes the linter checks with zero warnings or errors:
   ```bash
   npm run lint
   ```
7. **Build Verification**: Ensure that the project compiles successfully:
   ```bash
   npm run build
   ```
8. **Commit Changes**: Use clear, descriptive commit messages:
   ```bash
   git commit -m "feat: add support for local transit routes"
   ```
9. **Push and Submit a Pull Request (PR)**: Push your branch to GitHub and open a Pull Request against the `main` branch.

## Pull Request Guidelines
* Adhere to React best practices (e.g., state initialization without unnecessary effects, proper component rendering).
* Ensure that the application remains mobile-responsive and PWA configurations work correctly.
* Keep the Code of Conduct in mind when collaborating.
