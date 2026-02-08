export interface KeyHint {
    char: string;
    label: string;
    desc: string;
}

export const KEY_HINTS: KeyHint[] = [
    { char: '"', label: 'Shift + 2', desc: 'Quote' },
    { char: 'ñ', label: '; (or ñ key)', desc: 'Letter Ñ' },
    { char: 'á', label: "' + a", desc: 'Accent' },
    { char: 'ü', label: 'Shift + (Right of ñ) then u', desc: 'Dieresis' },
    { char: '(', label: 'Shift + 8', desc: 'Parenth.' },
    { char: ')', label: 'Shift + 9', desc: 'Parenth.' },
    { char: '=', label: 'Shift + 0', desc: 'Equals' },
    { char: '?', label: "Shift + ' (next to 0)", desc: 'Question' },
    { char: '¿', label: 'Shift + ¡ (next to backspace)', desc: 'Question' },
    { char: '!', label: 'Shift + 1', desc: 'Exclam.' },
    { char: '¡', label: '+ (or Opt+1)', desc: 'Exclam.' },
    { char: '-', label: "'/' or '-'", desc: 'Hyphen' },
    { char: '€', label: 'Option + E', desc: 'Euro' },
    { char: 'º', label: 'Key left of 1', desc: 'Ordinal M.' },
    { char: 'ª', label: 'Shift + (Left of 1)', desc: 'Ordinal F.' },
    { char: '§', label: 'Option + 6', desc: 'Section' },
];
