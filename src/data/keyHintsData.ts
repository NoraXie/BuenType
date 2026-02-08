export interface KeyHint {
    char: string;
    label: string;
    desc: string;
}



export const KEY_HINTS: KeyHint[] = [
    { char: '"', label: 'Shift + 2', desc: 'Quote' },
    { char: 'ñ', label: '; (or ñ key)', desc: 'Letter Ñ' },
    { char: 'ü', label: 'Option + u, u then u', desc: 'Dieresis' },
    { char: '(', label: 'Shift + 8', desc: 'Parenth.' },
    { char: ')', label: 'Shift + 9', desc: 'Parenth.' },
    { char: '=', label: 'Shift + 0', desc: 'Equals' },
    { char: '?', label: "Shift + - (next to 0)", desc: 'Question' },
    { char: '¿', label: '+ (next to backspace)', desc: 'Question' },
    { char: '!', label: 'Shift + 1', desc: 'Exclam.' },
    { char: '¡', label: 'Option + 1', desc: 'Exclam.' },
    { char: '-', label: "Option '-'", desc: 'Hyphen' },
    { char: '€', label: 'Option + E', desc: 'Euro' },
    { char: 'º', label: 'Option + 0', desc: 'Ordinal M.' },
    { char: '§', label: 'Option + 6', desc: 'Section' },
    { char: ':', label: 'Shift + .', desc: 'Section' }
]; 