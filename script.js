const prefixes = [
    "un", "anti", "inter", "intra", "exter", "extra", "non", "iso", "ped", "mani", 
    "bi", "pre", "phon", "octo", "pyro", "derm", "hyper", "hypo", "pro", "opti", 
    "post", "path", "mid", "auto", "hetero", "en", "trans", "sub", "super", "aero", 
    "geo", "chrono"
];
const roots = [
    "fract", "aud", "dict", "ject", "mater", "mal", "mort", "voc", "phil", "aut", 
    "jud", "scrib", "therm", "nerd", "violin", "gross", "glass", "god", "pork", "grump", 
    "death", "happy", "joy", "peril", "human", "fish", "medical", "mainiac", "short", 
    "witch", "ginger", "lum", "spec", "cred", "viv", "aqua", "terr", "magn", "flor", 
    "stell", "vent", "clast", "saur", "omni", "crypt", "zest", "nimb", "glint", "rhyth", 
    "spire"
];
const suffixes = [
    "ly", "ology", "tain", "ous", "ity", "ess", "al", "an", "ile", "osis", 
    "glyte", "phobia", "philia", "ing", "est", "ist", "oid", "ment", "ite", "ious", 
    "ize", "ation", "ic", "ance", "ence", "arium", "esque", "ful"
];

const prefixDefs = [
    "not", "against", "between", "within", "outside", "beyond", "not", "equal", 
    "feet", "hands", "two", "before", "sound", "eight", "fire", "skin", 
    "excessive", "below", "for", "sight", "after", "feeling", "middle", 
    "self", "different", "in", "across", "under", "above", "air", 
    "earth", "time"
];
const rootDefs = [
    "breaking", "hearing", "speaking", "throwing", "mother", "harm", "death", 
    "voice", "love", "many", "judgment", "writing", "heat", "geeks", "violins", 
    "disgust", "glass", "deity", "pork", "grumpiness", "death", "happiness", 
    "joy", "danger", "humans", "fish", "medicine", "insanity", "shortness", 
    "witches", "redheads", "light", "vision", "belief", "life", "water", 
    "land", "greatness", "flowers", "stars", "wind", "shattering", "dinosaurs", 
    "everything", "secrets", "energy", "clouds", "sparkle", "rhythm", "breath"
];
const suffixDefs = [
    "in a manner", "study of", "holding", "full of", "quality", "female", 
    "related to", "of", "capable", "disease", "decomposition", "fear", "love", 
    "action", "most", "specialist", "like", "result", "resident", "having", 
    "to make", "process", "pertaining to", "act", "state", "place", "styled", 
    "abundant"
];

const wordContainer = document.getElementById('wordContainer');
const generatedWord = document.getElementById('generatedWord');
const pronunciation = document.getElementById('pronunciation');
const wordDefinition = document.getElementById('wordDefinition');
const permutationList = document.getElementById('permutationList');
const generateButton = document.getElementById('generateButton');
const copyButton = document.getElementById('copyButton');
const permutationType = document.getElementById('permutationType');

// Simplified pronunciation generator
function generatePronunciation(word) {
    const syllables = word.split('-').map(part => {
        return part.replace(/[aeiou]/gi, match => `_${match}_`).replace(/([bcdfghjklmnpqrstvwxyz]+)/gi, '$1');
    });
    return `\\${syllables.join(' - ')}\\`;
}

// Determine part of speech based on suffix or word type
function getPartOfSpeech(type, suffixIndex) {
    if (type === 'pre-root' || type === 'pre-root-root' || type === 'root') {
        return 'noun';
    }
    if (suffixIndex === -1) {
        return 'noun';
    }
    const suffix = suffixes[suffixIndex];
    if (['ly'].includes(suffix)) return 'adverb';
    if (['ize'].includes(suffix)) return 'verb';
    if (['ous', 'al', 'an', 'ile', 'ic', 'esque', 'ful', 'ious'].includes(suffix)) return 'adjective';
    return 'noun';
}

// Enhanced definition generator with natural language
function generateSentenceDefinition(type, preDef, rootDef1, rootDef2, sufDef, suffixIndex) {
    let definition = '';
    const partOfSpeech = getPartOfSpeech(type, suffixIndex);

    // Helper to combine prefix and root naturally
    const combinePreRoot = (pre, root) => {
        if (!pre) return root;
        switch (pre) {
            case 'not': return `non-${root}`;
            case 'against': return `opposing ${root}`;
            case 'between': return `shared ${root}`;
            case 'within': return `internal ${root}`;
            case 'outside': return `external ${root}`;
            case 'beyond': return `extra ${root}`;
            case 'equal': return `balanced ${root}`;
            case 'before': return `pre-${root}`;
            case 'after': return `post-${root}`;
            case 'excessive': return `overly ${root}`;
            case 'below': return `under ${root}`;
            case 'for': return `supporting ${root}`;
            case 'middle': return `mid-${root}`;
            case 'self': return `self-${root}`;
            case 'different': return `unique ${root}`;
            case 'in': return `inner ${root}`;
            case 'across': return `trans-${root}`;
            case 'under': return `sub-${root}`;
            case 'above': return `super-${root}`;
            default: return `${pre}-${root}`;
        }
    };

    // Normalize root for grammatical correctness
    const normalizeRoot = (root) => {
        if (root.endsWith('ing') || root.endsWith('s')) return root;
        return root.replace(/ness$|ty$|ment$/, '');
    };

    switch (type) {
        case 'pre-root-suf':
            const preRoot = combinePreRoot(preDef, normalizeRoot(rootDef1));
            switch (sufDef) {
                case 'study of': definition = `The study of ${preRoot}`; break;
                case 'fear': definition = `Fear of ${preRoot}`; break;
                case 'love': definition = `Love for ${preRoot}`; break;
                case 'specialist': definition = `A specialist in ${preRoot}`; break;
                case 'in a manner': definition = `In a ${preRoot} manner`; break;
                case 'full of': definition = `Full of ${preRoot}`; break;
                case 'quality': definition = `The quality of ${preRoot}`; break;
                case 'to make': definition = `To cause ${preRoot}`; break;
                case 'process': definition = `The process of ${preRoot}`; break;
                case 'action': definition = `The act of ${preRoot}`; break;
                case 'state': definition = `The state of ${preRoot}`; break;
                case 'place': definition = `A place for ${preRoot}`; break;
                case 'like': definition = `Resembling ${preRoot}`; break;
                case 'abundant': definition = `Abounding in ${preRoot}`; break;
                case 'related to': definition = `Related to ${preRoot}`; break;
                case 'pertaining to': definition = `Pertaining to ${preRoot}`; break;
                case 'holding': definition = `The holding of ${preRoot}`; break;
                case 'female': definition = `A female associated with ${preRoot}`; break;
                case 'of': definition = `Belonging to ${preRoot}`; break;
                case 'capable': definition = `Capable of ${preRoot}`; break;
                case 'disease': definition = `A disease involving ${preRoot}`; break;
                case 'decomposition': definition = `Something that decomposes ${preRoot}`; break;
                case 'resident': definition = `A resident of ${preRoot}`; break;
                case 'having': definition = `Having ${preRoot}`; break;
                case 'act': definition = `The act of ${preRoot}`; break;
                case 'styled': definition = `Styled like ${preRoot}`; break;
                default: definition = `Something involving ${preRoot}`;
            }
            break;
        case 'root-suf':
            const root = normalizeRoot(rootDef1);
            switch (sufDef) {
                case 'study of': definition = `The study of ${root}`; break;
                case 'fear': definition = `Fear of ${root}`; break;
                case 'love': definition = `Love for ${root}`; break;
                case 'specialist': definition = `A specialist in ${root}`; break;
                case 'in a manner': definition = `In a ${root} manner`; break;
                case 'full of': definition = `Full of ${root}`; break;
                case 'quality': definition = `The quality of ${root}`; break;
                case 'to make': definition = `To cause ${root}`; break;
                case 'process': definition = `The process of ${root}`; break;
                case 'action': definition = `The act of ${root}`; break;
                case 'state': definition = `The state of ${root}`; break;
                case 'place': definition = `A place for ${root}`; break;
                case 'like': definition = `Resembling ${root}`; break;
                case 'abundant': definition = `Abounding in ${root}`; break;
                case 'related to': definition = `Related to ${root}`; break;
                case 'pertaining to': definition = `Pertaining to ${root}`; break;
                case 'holding': definition = `The holding of ${root}`; break;
                case 'female': definition = `A female associated with ${root}`; break;
                case 'of': definition = `Belonging to ${root}`; break;
                case 'capable': definition = `Capable of ${root}`; break;
                case 'disease': definition = `A disease involving ${root}`; break;
                case 'decomposition': definition = `Something that decomposes ${root}`; break;
                case 'resident': definition = `A resident of ${root}`; break;
                case 'having': definition = `Having ${root}`; break;
                case 'act': definition = `The act of ${root}`; break;
                case 'styled': definition = `Styled like ${root}`; break;
                default: definition = `Something involving ${root}`;
            }
            break;
        case 'pre-root':
            definition = `Something that is ${combinePreRoot(preDef, normalizeRoot(rootDef1))}`;
            break;
        case 'pre-root-root':
            definition = `Something combining ${combinePreRoot(preDef, normalizeRoot(rootDef1))} and ${normalizeRoot(rootDef2)}`;
            break;
        case 'root':
            definition = `The concept of ${normalizeRoot(rootDef1)}`;
            break;
        default:
            definition = `Something involving ${combinePreRoot(preDef, normalizeRoot(rootDef1))}`;
    }

    return `${partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)}: ${definition}`;
}

function generateWordAndDefinition(type) {
    let word, def, x, y, z, y2;
    x = Math.floor(Math.random() * prefixes.length);
    y = Math.floor(Math.random() * roots.length);
    z = Math.floor(Math.random() * suffixes.length);
    y2 = Math.floor(Math.random() * roots.length);

    switch (type) {
        case 'pre-root-suf':
            word = `${prefixes[x]}-${roots[y]}-${suffixes[z]}`;
            def = generateSentenceDefinition(type, prefixDefs[x], rootDefs[y], null, suffixDefs[z], z);
            break;
        case 'root-suf':
            word = `${roots[y]}-${suffixes[z]}`;
            def = generateSentenceDefinition(type, null, rootDefs[y], null, suffixDefs[z], z);
            break;
        case 'pre-root':
            word = `${prefixes[x]}-${roots[y]}`;
            def = generateSentenceDefinition(type, prefixDefs[x], rootDefs[y], null, null, -1);
            break;
        case 'pre-root-root':
            word = `${prefixes[x]}-${roots[y]}-${roots[y2]}`;
            def = generateSentenceDefinition(type, prefixDefs[x], rootDefs[y], rootDefs[y2], null, -1);
            break;
        case 'root':
            word = roots[y];
            def = generateSentenceDefinition(type, null, rootDefs[y], null, null, -1);
            break;
        default:
            word = `${prefixes[x]}-${roots[y]}-${suffixes[z]}`;
            def = generateSentenceDefinition(type, prefixDefs[x], rootDefs[y], null, suffixDefs[z], z);
    }

    return { word, def, x, y, z, y2 };
}

function generatePermutations(x, y, z, y2, currentType) {
    const permutations = [];
    const types = ['pre-root-suf', 'root-suf', 'pre-root', 'pre-root-root', 'root'];
    
    types.forEach(type => {
        if (type !== currentType) {
            const { word, def } = generateWordAndDefinition(type);
            permutations.push(`<strong>${word}</strong>: ${def}`);
        }
    });

    return permutations;
}

function copyToClipboard() {
    const word = generatedWord.textContent;
    const pron = pronunciation.textContent;
    const def = wordDefinition.textContent;
    const textToCopy = `${word}\n${pron}\n${def}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Word, pronunciation, and definition copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard.');
    });
}

function updateDisplay() {
    const type = permutationType.value;
    const { word, def, x, y, z, y2 } = generateWordAndDefinition(type);

    generatedWord.textContent = word;
    pronunciation.textContent = generatePronunciation(word);
    wordDefinition.textContent = def;

    // Generate permutations
    const permutations = generatePermutations(x, y, z, y2, type);
    permutationList.innerHTML = permutations.map(p => `<li>${p}</li>`).join('');

    // Add animation
    wordContainer.style.opacity = '0';
    setTimeout(() => {
        wordContainer.style.opacity = '1';
    }, 100);
}

generateButton.addEventListener('click', updateDisplay);
copyButton.addEventListener('click', copyToClipboard);
permutationType.addEventListener('change', updateDisplay);

// Generate a word on page load
updateDisplay();