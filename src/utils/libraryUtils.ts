import specialChars from '../assets/books/SpecialCharacters.md?raw';
import funnyStories from '../assets/books/100FunnySpanishStories.md?raw';
import { normalizeText } from './textUtils';

export interface Chapter {
    id: string;
    title: string;
    content: string;
}

export interface Book {
    id: string;
    title: string;
    coverColor: string;
    chapters: Chapter[];
}

const parseMarkdown = (markdown: string, bookIdPrefix: string): Chapter[] => {
    const lines = markdown.split('\n');
    const chapters: Chapter[] = [];

    let currentTitle = '';
    let currentContentLines: string[] = [];

    // Helper to add chapter
    const addChapter = () => {
        if (!currentTitle) return;
        const rawContent = currentContentLines.join('\n').trim();
        if (rawContent) {
            chapters.push({
                id: `${bookIdPrefix}-${chapters.length + 1}`,
                title: currentTitle,
                content: normalizeText(rawContent)
            });
        }
    };

    lines.forEach((line) => {
        if (line.trim().startsWith('# ')) {
            addChapter();
            // Start new chapter
            currentTitle = line.replace('# ', '').trim();
            currentContentLines = [];
        } else {
            if (currentTitle) {
                currentContentLines.push(line);
            }
        }
    });

    // Push last chapter
    addChapter();

    return chapters;
};


export const INITIAL_LIBRARY: Book[] = [
    {
        id: 'humor_100',
        title: '100 Spanish Humor Stories',
        coverColor: 'bg-amber-100',
        chapters: parseMarkdown(funnyStories, 'humor')
    },
    {
        id: 'special_chars',
        title: 'Special Characters Practice',
        coverColor: 'bg-emerald-100',
        chapters: parseMarkdown(specialChars, 'special')
    }
];
