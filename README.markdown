# Word Creator

## Overview
Word Creator is a web application that generates fictitious words by combining prefixes, roots, and suffixes from a curated dataset. Each generated word comes with a pronunciation, definition, and other forms, allowing users to explore creative and thematic word combinations. The application now includes a new game mode where users can test their knowledge by guessing the correct word based on its definition.

## Features
- **Word Generation**:
  - Generate words using different structures (e.g., Prefix-Root-Suffix, Root Only).
  - Choose from various themes such as Normal, Technical, Shakespearian, Pop Culture, Astronomy, and Fantasy.
  - View the generated word, its pronunciation, and a definition constructed from the meanings of its parts.
  - Copy the word and its definition to the clipboard for easy sharing.

- **Word Creator Game** (New Feature):
  - Play a multiple-choice game where you guess the correct word based on its definition.
  - Select a theme to start the game (e.g., Normal, Shakespearian).
  - Answer 5 questions per round, with 4 options per question (1 correct, 3 incorrect).
  - The game ends after 3 incorrect answers, displaying your final score.
  - Restart the game or return to the main Word Creator page after the game ends.

## Installation
### Option 1: Access via GitHub Pages
The easiest way to use Word Creator is to access it via GitHub Pages:
- Visit [https://kappter.github.io/wordmaker/](https://kappter.github.io/wordmaker/).
- The application will load automatically in your browser.

### Option 2: Run Locally
To run the project locally, follow these steps:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kappter/wordmaker.git
   cd wordmaker
   ```
2. **Serve the Files**:
   Since this is a static web application, you can serve the files using a local web server. If you have Python installed, you can use:
   ```bash
   python -m http.server 8000
   ```
   Alternatively, use any other static file server (e.g., `npx serve` if you have Node.js installed).
3. **Access the Application**:
   Open your browser and navigate to `http://localhost:8000`.

## Usage
### Word Generator
1. Open `index.html` (via GitHub Pages or locally).
2. Select a **Word Type** from the dropdown (e.g., Prefix-Root-Suffix, Root Only).
3. Select a **Theme** (e.g., Normal, Shakespearian, Astronomy).
4. Click **Generate New Word** to create a new word.
5. View the generated word, its pronunciation, and definition.
6. Click **Copy Word** to copy the word and definition to your clipboard.
7. To play the game, click **Play Game** to navigate to the game page.

### Word Creator Game
1. From the main page, click **Play Game** to go to `game.html`.
2. Select a **Theme** (e.g., Technical, Fantasy).
3. Click **Start Game**.
4. For each question:
   - Read the definition of a fictitious word.
   - Choose the correct word from 4 options.
   - Receive immediate feedback on your answer.
5. Answer 5 questions per round. The game ends after 3 incorrect answers.
6. View your final score, then choose to **Play Again** or return to the main page with **Back to Word Creator**.

## File Structure
- `index.html`: The main page for generating words.
- `game.html`: The game page for the Word Creator Game.
- `style.css`: Styles for both the main page and the game page.
- `script.js`: Core logic for loading word parts, generating words, and managing the main page.
- `game.js`: Logic specific to the game page, including question generation and game flow.
- `data/word_parts.csv`: The dataset containing prefixes, roots, and suffixes for various themes.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request with a detailed description of your changes.

### Ideas for Contributions
- Enhance the pronunciation generator in `script.js`.
- Add more themes or word parts to `word_parts.csv`.
- Improve the game by adding difficulty levels or a timer.
- Refine the styling in `style.css` for better accessibility or responsiveness.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.