# ⌨️ BuenType

**BuenType** is a minimalist, web-based typing tutor specifically designed for mastering the Spanish language. It combines a focused language-learning experience with a high-performance typing engine.

**Live Demo:** [https://buentype.netlify.app/](https://buentype.netlify.app/)

---

## 🚀 Current Features (v1.0)

### 1. High-Precision Typing Engine
- **Real-time Validation**: Instant visual feedback with character-level color coding (Correct: Black, Incorrect: Red highlight, Upcoming: Grey).
- **Spanish Character Support**: Full compatibility with Spanish-specific characters including accents (`á, é, í, ó, ú`) and special symbols (`ñ, ¡, ¿`).
- **Smooth Navigation**: A fluid, responsive caret that follows your typing pace with zero latency.

### 2. "Eye-Care" Visual Design
- **Parchment Theme**: A custom-tuned `#F5E6D3` background designed to reduce eye strain during long practice sessions.
- **Minimalist Layout**: Uses **JetBrains Mono** typography for maximum legibility and a clean, distraction-free environment.
- **Dynamic Header**: Speed (WPM) and Accuracy stats are displayed with low opacity to keep the focus on the text, becoming fully visible only when needed.

### 3. Content Customization
- **Source Injection**: A dedicated "Import" modal that allows users to paste custom Spanish text or Markdown notes for personalized practice.
- **Cervantes Edition**: Pre-loaded with classic Spanish literary text to get you started immediately.

### 4. Live Performance Metrics
- **WPM Tracking**: Real-time calculation of Words Per Minute based on standardized typing metrics.
- **Accuracy Percentage**: Dynamic tracking of keystroke precision.

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