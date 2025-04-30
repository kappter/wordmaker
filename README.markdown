# WordMaker

WordMaker is a web application that generates unique, made-up words by combining prefixes, roots, and suffixes. Each generated word comes with a pronunciation guide, a definition, and alternative word forms (permutations). The app is designed to be user-friendly, visually appealing, and educational, making it a fun tool for writers, linguists, or anyone interested in creative word-building.

Live demo: [WordMaker](https://kappter.github.io/wordmaker/)

## Features

### Word Generation
- **Customizable Word Types**: Choose from five word structures:
  - Prefix-Root-Suffix (e.g., `auto-lum-ology`)
  - Root-Suffix (e.g., `flor-ist`)
  - Prefix-Root (e.g., `geo-therm`)
  - Prefix-Root-Root (e.g., `hyper-cred-viv`)
  - Root Only (e.g., `aqua`)
- **Randomized Combinations**: Generates words from predefined lists of prefixes, roots, and suffixes, ensuring varied and creative outputs.

### Pronunciation
- **Simplified Pronunciation Guide**: Each word includes a phonetic breakdown (e.g., `\au-to-_lu_m-ol-_o_-gy\`), making it easy to read and pronounce.

### Definitions
- **Contextual Definitions**: Provides a meaningful definition based on the combined meanings of the word parts (e.g., "The study of things that are about oneself light or glow" for `auto-lum-ology`).
- **Part of Speech**: Identifies the word's part of speech (noun, verb, adjective, adverb) based on the suffix or word structure.

### Permutations
- **Alternative Forms**: Displays other possible word forms using different structures (e.g., for `auto-lum-ology`, it might show `lum-ist`, `auto-lum`, etc.), each with its own definition.

### User Interface
- **Interactive Design**: Built with HTML, Tailwind CSS, and JavaScript for a responsive and modern interface.
- **Animations**: Smooth transitions and hover effects enhance the user experience.
- **Copy to Clipboard**: Easily copy the generated word, pronunciation, and definition with a single click.
- **Word Type Selection**: A dropdown menu allows users to select the desired word structure.

### Technical Details
- **No Dependencies**: Uses vanilla JavaScript and Tailwind CSS (via CDN) for lightweight performance.
- **Modular Code**: Organized JavaScript logic for word generation, pronunciation, and definition creation.
- **Custom Styling**: A clean, gradient background and Times New Roman font give a professional yet approachable look.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kappter/wordmaker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd wordmaker
   ```
3. Open `index.html` in a web browser to run the app locally.

Alternatively, visit the live demo: [WordMaker](https://kappter.github.io/wordmaker/)

## Usage

1. Select a word type from the dropdown menu (e.g., "Prefix-Root-Suffix").
2. Click the "Generate New Word" button to create a new word.
3. View the word, its pronunciation, definition, and other forms in the display area.
4. Click the "Copy Word" button to copy the word, pronunciation, and definition to your clipboard.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please ensure your code follows the existing style and includes appropriate comments.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, reach out via [GitHub Issues](https://github.com/kappter/wordmaker/issues).