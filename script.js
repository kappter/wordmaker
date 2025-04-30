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
    "the opposite of", "against", "between or among", "on the inside or within", 
    "on the outside of or far away from", "beyond or more than", "not", "equal", 
    "relating to feet", "relating to the hands", "twice or two", "before or prior to", 
    "sound or voice", "eight", "fire and or heat", "relating to the skin", 
    "over or excessively", "beneath or below", "acceptance or for, not against", 
    "sight", "after", "feeling or disease", "halfway, or in the middle of", 
    "about one self", "different or other", "within", "across or through", 
    "under or below", "above or beyond", "relating to air", "relating to earth", 
    "relating to time"
];
const rootDefs = [
    "breaking", "hearing", "saying or telling", "throwing", "mother or origin", 
    "bad or harmful", "death", "voice or calling", "love or affection", 
    "many or multiple", "judgment or law", "writing", "heat or warmth", 
    "smart people with acne and glasses", "high-pitched squeaky string instruments", 
    "yucky or unappealing", "transparent substances made from melted sand", 
    "omnipotent being", "tasty food from a pig", "downers or narcissists", 
    "ceasing to live", "joyful feelings", "happy and fuzzy feelings", 
    "dangerous situations", "hairless apes with social media", "scaly sea creatures", 
    "medicine and doctors", "crazy or insane beings", "being small in height", 
    "mystic or sorceress with red hair", "red-haired human, possibly a witch", 
    "light or glow", "looking or seeing", "belief or trust", "life or living", 
    "water or liquid", "earth or land", "great or large", "flowers or plants", 
    "stars or celestial bodies", "wind or air", "breaking or shattering", 
    "lizards or dinosaurs", "all or everything", "hidden or secret things", 
    "energy or enthusiasm", "clouds or swift movement", "sparkle or shine", 
    "patterns or beats", "breath or inspiration"
];
const suffixDefs = [
    "in the manner of", "the study of", "holding or maintaining", "full of", 
    "the quality or state of", "a female who", "relating to or characterized by", 
    "belonging to", "capable of", "disease or condition", "something that decomposes", 
    "fear of", "love for", "the action of", "the most or greatest", 
    "a person who specializes in", "resembling or like", "the result or act of", 
    "a follower or resident of", "possessing the quality of", "to make or become", 
    "the process or result of", "pertaining to", "the act or result of", 
    "the state or quality of", "a place for", "resembling or styled like", 
    "full of or characterized by"
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
    return 'noun'; // Default for -ology, -ity, -ess, -ist, etc.
}

// Improved definition generator with part of speech first
function generateSentenceDefinition(type, preDef, rootDef1, rootDef2, sufDef, suffixIndex) {
    let definition;
    switch (type) {
        case 'pre-root-suf':
            if (sufDef.includes('study of')) definition = `The study of things that are ${preDef} ${rootDef1}`;
            else if (sufDef.includes('fear of')) definition = `A fear of things that are ${preDef} ${rootDef1}`;
            else if (sufDef.includes('love for')) definition = `A love for things that are ${preDef} ${rootDef1}`;
            else if (sufDef.includes('person who')) definition = `A person who deals with things that are ${preDef} ${rootDef1}`;
            else if (sufDef.includes('in the manner of')) definition = `Doing something in a way that is ${preDef} ${rootDef1}`;
            else definition = `The quality of being ${preDef} ${rootDef1}`;
            break;
        case 'root-suf':
            if (sufDef.includes('study of')) definition = `The study of ${rootDef1}`;
            else if (sufDef.includes('fear of')) definition = `A fear of ${rootDef1}`;
            else if (sufDef.includes('love for')) definition = `A love for ${rootDef1}`;
            else if (sufDef.includes('person who')) definition = `A person who specializes in ${rootDef1}`;
            else if (sufDef.includes('in the manner of')) definition = `Acting in the manner of ${rootDef1}`;
            else definition = `The quality or state of ${rootDef1}`;
            break;
        case 'pre-root':
            definition = `Something that is ${preDef} ${rootDef1}`;
            break;
        case 'pre-root-root':
            definition = `Something that combines being ${preDef} both ${rootDef1} and ${rootDef2}`;
            break;
        case 'root':
            definition = `The concept of ${rootDef1}`;
            break;
        default:
            definition = `The quality of being ${preDef} ${rootDef1}`;
    }
    const partOfSpeech = getPartOfSpeech(type, suffixIndex);
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