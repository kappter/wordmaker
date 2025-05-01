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
    "negation", "opposition", "connection", "internal", "external", "additional", 
    "absence", "equality", "feet", "hands", "double", "prior", "sound", "eight", 
    "fire", "skin", "excess", "deficiency", "support", "vision", "subsequent", 
    "emotion", "center", "self", "difference", "inclusion", "movement", 
    "subordination", "superiority", "air", "earth", "time"
];
const rootDefs = [
    "breaking", "hearing", "speaking", "throwing", "mother", "harm", "death", 
    "voice", "love", "multiplicity", "judgment", "writing", "heat", "geeks", 
    "violins", "disgust", "glass", "deity", "pork", "grumpiness", "death", 
    "happiness", "joy", "danger", "humans", "fish", "medicine", "insanity", 
    "shortness", "witches", "redheads", "light", "vision", "belief", "life", 
    "water", "land", "greatness", "flowers", "stars", "wind", "shattering", 
    "dinosaurs", "everything", "secrets", "energy", "clouds", "sparkle", 
    "rhythm", "breath"
];
const suffixDefs = [
    "manner", "study", "containment", "abundance", "quality", "female", 
    "relation", "origin", "capability", "disease", "decomposition", "fear", 
    "affection", "action", "extreme", "expert", "resemblance", "outcome", 
    "inhabitant", "possession", "creation", "process", "association", 
    "performance", "condition", "location", "style", "fullness"
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

// Enhanced definition generator with natural language, avoiding word parts
function generateSentenceDefinition(type, preDef, rootDef1, rootDef2, sufDef, suffixIndex) {
    let definition = '';
    const partOfSpeech = getPartOfSpeech(type, suffixIndex);

    // Helper to combine prefix and root meanings without using word parts
    const combinePreRoot = (pre, root) => {
        if (!pre) return root;
        switch (pre) {
            case 'negation': return `absence of ${root}`;
            case 'opposition': return `resistance to ${root}`;
            case 'connection': return `link between ${root}`;
            case 'internal': return `inner ${root}`;
            case 'external': return `outer ${root}`;
            case 'additional': return `extra ${root}`;
            case 'absence': return `lack of ${root}`;
            case 'equality': return `balanced ${root}`;
            case 'prior': return `earlier ${root}`;
            case 'subsequent': return `later ${root}`;
            case 'excess': return `excessive ${root}`;
            case 'deficiency': return `insufficient ${root}`;
            case 'support': return `promotion of ${root}`;
            case 'center': return `central ${root}`;
            case 'self': return `personal ${root}`;
            case 'difference': return `distinct ${root}`;
            case 'inclusion': return `contained ${root}`;
            case 'movement': return `transferred ${root}`;
            case 'subordination': return `lesser ${root}`;
            case 'superiority': return `greater ${root}`;
            default: return `${root} involving ${pre}`;
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
                case 'study': definition = `The academic study of ${preRoot}`; break;
                case 'fear': definition = `An intense fear of ${preRoot}`; break;
                case 'affection': definition = `A strong affection for ${preRoot}`; break;
                case 'expert': definition = `A person specializing in ${preRoot}`; break;
                case 'manner': definition = `A way characterized by ${preRoot}`; break;
                case 'abundance': definition = `Filled with ${preRoot}`; break;
                case 'quality': definition = `The characteristic of ${preRoot}`; break;
                case 'creation': definition = `The act of creating ${preRoot}`; break;
                case 'process': definition = `The process involving ${preRoot}`; break;
                case 'action': definition = `The activity of ${preRoot}`; break;
                case 'condition': definition = `The state of ${preRoot}`; break;
                case 'location': definition = `A place characterized by ${preRoot}`; break;
                case 'style': definition = `A style resembling ${preRoot}`; break;
                case 'fullness': definition = `Abundance of ${preRoot}`; break;
                case 'relation': definition = `Something related to ${preRoot}`; break;
                case 'association': definition = `Something associated with ${preRoot}`; break;
                case 'containment': definition = `The containment of ${preRoot}`; break;
                case 'female': definition = `A female connected to ${preRoot}`; break;
                case 'origin': definition = `Something originating from ${preRoot}`; break;
                case 'capability': definition = `The ability to perform ${preRoot}`; break;
                case 'disease': definition = `A disorder related to ${preRoot}`; break;
                case 'decomposition': definition = `A substance that breaks down ${preRoot}`; break;
                case 'inhabitant': definition = `A resident associated with ${preRoot}`; break;
                case 'possession': definition = `Possessing ${preRoot}`; break;
                case 'performance': definition = `The performance of ${preRoot}`; break;
                case 'resemblance': definition = `Something resembling ${preRoot}`; break;
                case 'outcome': definition = `The result of ${preRoot}`; break;
                default: definition = `Something characterized by ${preRoot}`;
            }
            break;
        case 'root-suf':
            const root = normalizeRoot(rootDef1);
            switch (sufDef) {
                case 'study': definition = `The academic study of ${root}`; break;
                case 'fear': definition = `An intense fear of ${root}`; break;
                case 'affection': definition = `A strong affection for ${root}`; break;
                case 'expert': definition = `A person specializing in ${root}`; break;
                case 'manner': definition = `A way characterized by ${root}`; break;
                case 'abundance': definition = `Filled with ${root}`; break;
                case 'quality': definition = `The characteristic of ${root}`; break;
                case 'creation': definition = `The act of creating ${root}`; break;
                case 'process': definition = `The process involving ${root}`; break;
                case 'action': definition = `The activity of ${root}`; break;
                case 'condition': definition = `The state of ${root}`; break;
                case 'location': definition = `A place characterized by ${root}`; break;
                case 'style': definition = `A style resembling ${root}`; break;
                case 'fullness': definition = `Abundance of ${root}`; break;
                case 'relation': definition = `Something related to ${root}`; break;
                case 'association': definition = `Something associated with ${root}`; break;
                case 'containment': definition = `The containment of ${root}`; break;
                case 'female': definition = `A female connected to ${root}`; break;
                case 'origin': definition = `Something originating from ${root}`; break;
                case 'capability': definition = `The ability to perform ${root}`; break;
                case 'disease': definition = `A disorder related to ${root}`; break;
                case 'decomposition': definition = `A substance that breaks down ${root}`; break;
                case 'inhabitant': definition = `A resident associated with ${root}`; break;
                case 'possession': definition = `Possessing ${root}`; break;
                case 'performance': definition = `The performance of ${root}`; break;
                case 'resemblance': definition = `Something resembling ${root}`; break;
                case 'outcome': definition = `The result of ${root}`; break;
                default: definition = `Something characterized by ${root}`;
            }
            break;
        case 'pre-root':
            definition = `Something characterized by ${combinePreRoot(preDef, normalizeRoot(rootDef1))}`;
            break;
        case 'pre-root-root':
            definition = `Something combining ${combinePreRoot(preDef, normalizeRoot(rootDef1))} and ${normalizeRoot(rootDef2)}`;
            break;
        case 'root':
            definition = `The concept of ${normalizeRoot(rootDef1)}`;
            break;
        default:
            definition = `Something characterized by ${combinePreRoot(preDef, normalizeRoot(rootDef1))}`;
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