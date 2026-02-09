export const normalizeText = (text: string): string => {
    return text
        // Smart/Curly Quotes to Straight Quotes
        .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036\u00AB\u00BB]/g, '"')
        .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'")
        // Dashes to Hyphens (em dash, en dash, minus sign to hyphen-minus)
        // Note: em-dash usually replaced by -- or - depending on style.
        // Spanish dialogue often uses em-dash (raya) '—'.
        // Standard keyboards have '-' (hyphen). Typing '—' is hard.
        // Let's replace '—' with '-' for easier typing unless we want to teach '—'.
        // User asked "punctuation not recognized", implying inability to type it.
        .replace(/[\u2013\u2014]/g, '-')
        // Ellipsis to three dots
        .replace(/\u2026/g, '...')
        // Normalize spaces (non-breaking space to space)
        .replace(/\u00A0/g, ' ')
        .trim();
};

export const stripPunctuation = (text: string): string => {
    return text
        // Replace all punctuation and symbols with spaces
        // We keep letters (including accented ones like á, é, ñ), numbers, and spaces
        .replace(/[^\w\s\u00C0-\u00FF\u0100-\u017F\u0180-\u024F]/g, ' ')
        // Collapse multiple spaces into one
        .replace(/\s+/g, ' ')
        .trim();
};
