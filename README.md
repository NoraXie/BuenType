# ⌨️ BuenType

**BuenType** is a minimalist, web-based typing tutor specifically designed for mastering the Spanish language. It combines a focused language-learning experience with a high-performance typing engine.

**Live Demo:** [https://buentype.netlify.app/](https://buentype.netlify.app/)

---

## 🚀 Current Features (v1.0)

### 1. High-Precision Typing Engine
- **Real-time Validation**: Instant visual feedback with character-level color coding (Correct: Black, Incorrect: Red highlight, Upcoming: Grey).
- **Spanish Character Support**: Full compatibility with Spanish-specific characters including accents (`á, é, í, ó, ú`) and special symbols (`ñ, ¡, ¿`).
- **Smooth Navigation**: A fluid, responsive caret that follows your typing pace with zero latency.

### 2. Versatile Practice Modes
- **Original Edition**: Practice with full punctuation, accents, and special symbols for complete mastery.
- **Flow Mode (Sin puntuación)**: Automatically generated punctuation-free versions of all texts. Focus purely on typing rhythm and speed without reaching for symbol keys.

### 3. "Eye-Care" Visual Design
- **Parchment Theme**: A custom-tuned background designed to reduce eye strain.
- **Amber Cursor**: A vibrant, glow-highlighted cursor that is highly visible even in focus mode.
- **Minimalist Layout**: Uses **JetBrains Mono** typography for maximum legibility.

### 4. Live Performance Metrics
- **Standardized WPM**: Real-time speed calculation.
- **Accuracy Percentage**: Keystroke precision tracking.
- **Correct Word Count**: Monitor your progress with a count of fully completed words.

### 5. Content Library
- **Source Injection**: "Import" modal for custom Spanish text.
- **Curated Books**: Pre-loaded with "100 Spanish Humor Stories" and targeted "Special Characters Practice".

---

## 📈 Roadmap

- [ ] **Audio Feedback (Next)**: Mechanical keyboard sounds and word-completion dings to enhance immersion.
- [ ] **Session Summary**: A detailed post-practice dashboard featuring WPM volatility charts.
- [ ] **Focus Words**: Automatically save difficult words to `LocalStorage` for targeted review.
- [ ] **Typing PK**: Real-time competitive mode to challenge other learners.

---

## 💻 Installation & Setup

```bash
# Clone the repository
git clone git@github.com:NoraXie/BuenType.git

# Install dependencies
npm install

# Start the development server
npm run dev