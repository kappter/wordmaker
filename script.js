// Theme-specific word parts
const themes = {
    normal: {
        prefixes: ["un", "anti", "inter", "intra", "exter", "extra", "non", "iso", "ped", "mani"],
        prefixDefs: ["negation", "opposition", "connection", "internal", "external", "additional", "absence", "equality", "feet", "hands"],
        roots: ["fract", "aud", "dict", "ject", "mater", "mal", "mort", "voc", "phil", "jud"],
        rootDefs: ["breaking", "hearing", "speaking", "throwing", "mother", "harm", "death", "voice", "love", "judgment"],
        suffixes: ["ly", "ology", "ous", "ity", "ess", "al", "an", "ile", "ist", "ize"],
        suffixDefs: ["manner", "study", "abundance", "quality", "female", "relation", "origin", "capability", "expert", "creation"]
    },
    technical: {
        prefixes: ["cyber", "nano", "bio", "techno", "info", "electro", "mech", "auto", "data", "quant"],
        prefixDefs: ["digital", "microscopic", "biological", "technological", "informational", "electrical", "mechanical", "automatic", "data-related", "quantitative"],
        roots: ["comp", "crypt", "sys", "algor", "net", "code", "mod", "opt", "scan", "tech"],
        rootDefs: ["computation", "encryption", "systems", "algorithms", "networks", "programming", "models", "optimization", "scanning", "technology"],
        suffixes: ["ics", "ism", "ation", "metry", "logy", "oid", "ist", "ize", "ance", "ence"],
        suffixDefs: ["science", "belief", "process", "measurement", "study", "resemblance", "expert", "creation", "performance", "condition"]
    },
    shakespearian: {
        prefixes: ["oer", "for", "be", "mis", "yon", "thither", "hence", "ere", "with", "a"],
        prefixDefs: ["over", "away", "covered", "wrong", "distant", "toward", "away", "before", "together", "apart"],
        roots: ["gild", "mirth", "woe", "bard", "quoth", "fain", "rue", "vow", "glee", "knave"],
        rootDefs: ["adornment", "merriment", "sorrow", "poetry", "speech", "desire", "regret", "oath", "joy", "villainy"],
        suffixes: ["th", "est", "ing", "ard", "ly", "ous", "ful", "ment", "ure", "ance"],
        suffixDefs: ["action", "extreme", "action", "character", "manner", "abundance", "fullness", "outcome", "structure", "performance"]
    },
    popculture: {
        prefixes: ["mega", "ultra", "hyper", "neo", "retro", "pop", "trend", "viral", "meme", "fandom"],
        prefixDefs: ["massive", "extreme", "excess", "new", "nostalgic", "popular", "fashionable", "spreading", "humorous", "fanatic"],
        roots: ["vibe", "hype", "trend", "ship", "stan", "flick", "jam", "meme", "icon", "bling"],
        rootDefs: ["atmosphere", "excitement", "fashion", "relationship", "admiration", "film", "music", "humor", "symbol", "glamour"],
        suffixes: ["ify", "ism", "ology", "er", "ist", "ous", "ity", "esque", "ation", "ful"],
        suffixDefs: ["creation", "belief", "study", "agent", "expert", "abundance", "quality", "style", "process", "fullness"]
    },
    astronomy: {
        prefixes: ["astro", "cosmo", "galact", "stella", "luna", "solar", "neb", "orbit", "nova", "helio"],
        prefixDefs: ["stellar", "cosmic", "galactic", "starry", "lunar", "solar", "nebulous", "orbital", "explosive", "sun-related"],
        roots: ["star", "planet", "moon", "nebula", "comet", "orbit", "grav", "lume", "nova", "void"],
        rootDefs: ["stars", "planets", "moons", "clouds", "comets", "orbits", "gravity", "illumination", "explosions", "emptiness"],
        suffixes: ["oid", "ism", "ology", "ic", "al", "ar", "ous", "ity", "ence", "arium"],
        suffixDefs: ["resemblance", "belief", "study", "association", "relation", "nature", "abundance", "quality", "condition", "location"]
    }
};

const wordContainer = document.getElementById('wordContainer');
const generatedWord = document.getElementById('generatedWord');
const pronunciation = document.getElementById('pronunciation');
const wordDefinition = document.getElementById('wordDefinition');
const permutationList = document.getElementById('permutationList');
const generateButton = document.getElementById('generateButton');
const copyButton = document.getElementById('copyButton');
const permutationType = document.getElementById('permutationType');
const themeType = document.getElementById('themeType');

// Simplified pronunciation generator
function generatePronunciation(word) {
    const syllables = word.split('-').map(part => {
        return part.replace(/[aeiou]/gi, match => `_${match}_`).replace(/([bcdfghjklmnpqrstvwxyz]+)/gi, '$1');
    });
    return `\\${syllables.join(' - ')}\\`;
}

// Determine part of speech based on suffix or word type
function getPartOfSpeech(type, suffixIndex, theme) {
    if (type === 'pre-root' || type === 'pre-root-root' || type === 'root') {
        return 'noun';
    }
    if (suffixIndex === -1) {
        return 'noun';
    }
    const suffix = themes[theme].suffixes[suffixIndex];
    if (['ly', 'th'].includes(suffix)) return 'adverb';
    if (['ize', 'ify'].includes(suffix)) return 'verb';
    if (['ous', 'al', 'an', 'ile', 'ic', 'esque', 'ful', 'ious', 'ar'].includes(suffix)) return 'adjective';
    return 'noun';
}

// Enhanced definition generator with natural language, avoiding word parts
function generateSentenceDefinition(type, preDef, rootDef1, rootDef2, sufDef, suffixIndex, theme) {
    let definition = '';
    const partOfSpeech = getPartOfSpeech(type, suffixIndex, theme);

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
            case 'digital': return `digital ${root}`;
            case 'microscopic': return `tiny ${root}`;
            case 'biological': return `living ${root}`;
            case 'technological': return `technical ${root}`;
            case 'informational': return `data-driven ${root}`;
            case 'electrical': return `electric ${root}`;
            case 'mechanical': return `mechanical ${root}`;
            case 'automatic': return `automated ${root}`;
            case 'data-related': return `data-based ${root}`;
            case 'quantitative': return `measured ${root}`;
            case 'over': return `excessive ${root}`;
            case 'away': return `distant ${root}`;
            case 'covered': return `covered ${root}`;
            case 'wrong': return `incorrect ${root}`;
            case 'distant': return `far ${root}`;
            case 'toward': return `approaching ${root}`;
            case 'before': return `earlier ${root}`;
            case 'together': return `combined ${root}`;
            case 'apart': return `separate ${root}`;
            case 'massive': return `huge ${root}`;
            case 'extreme': return `intense ${root}`;
            case 'new': return `modern ${root}`;
            case 'nostalgic': return `retro ${root}`;
            case 'popular': return `popular ${root}`;
            case 'fashionable': return `trendy ${root}`;
            case 'spreading': return `viral ${root}`;
            case 'humorous': return `funny ${root}`;
            case 'fanatic': return `fan-driven ${root}`;
            case 'stellar': return `star-related ${root}`;
            case 'cosmic': return `cosmic ${root}`;
            case 'galactic': return `galaxy-related ${root}`;
            case 'starry': return `star-filled ${root}`;
            case 'lunar': return `moon-related ${root}`;
            case 'solar': return `sun-related ${root}`;
            case 'nebulous': return `cloudy ${root}`;
            case 'orbital': return `orbiting ${root}`;
            case 'explosive': return `explosive ${root}`;
            case 'sun-related': return `solar ${root}`;
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
                case 'science': definition = `The science of ${preRoot}`; break;
                case 'belief': definition = `A belief in ${preRoot}`; break;
                case 'measurement': definition = `The measurement of ${preRoot}`; break;
                case 'character': definition = `A person characterized by ${preRoot}`; break;
                case 'extreme': definition = `The most extreme form of ${preRoot}`; break;
                case 'agent': definition = `A person performing ${preRoot}`; break;
                case 'nature': definition = `The nature of ${preRoot}`; break;
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
                case 'science': definition = `The science of ${root}`; break;
                case 'belief': definition = `A belief in ${root}`; break;
                case 'measurement': definition = `The measurement of ${root}`; break;
                case 'character': definition = `A person characterized by ${root}`; break;
                case 'extreme': definition = `The most extreme form of ${root}`; break;
                case 'agent': definition = `A person performing ${root}`; break;
                case 'nature': definition = `The nature of ${root}`; break;
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

function generateWordAndDefinition(type, theme) {
    const themeData = themes[theme];
    let word, def, x, y, z, y2;
    x = Math.floor(Math.random() * themeData.prefixes.length);
    y = Math.floor(Math.random() * themeData.roots.length);
    z = Math.floor(Math.random() * themeData.suffixes.length);
    y2 = Math.floor(Math.random() * themeData.roots.length);

    switch (type) {
        case 'pre-root-suf':
            word = `${themeData.prefixes[x]}-${themeData.roots[y]}-${themeData.suffixes[z]}`;
            def = generateSentenceDefinition(type, themeData.prefixDefs[x], themeData.rootDefs[y], null, themeData.suffixDefs[z], z, theme);
            break;
        case 'root-suf':
            word = `${themeData.roots[y]}-${themeData.suffixes[z]}`;
            def = generateSentenceDefinition(type, null, themeData.rootDefs[y], null, themeData.suffixDefs[z], z, theme);
            break;
        case 'pre-root':
            word = `${themeData.prefixes[x]}-${themeData.roots[y]}`;
            def = generateSentenceDefinition(type, themeData.prefixDefs[x], themeData.rootDefs[y], null, null, -1, theme);
            break;
        case 'pre-root-root':
            word = `${themeData.prefixes[x]}-${themeData.roots[y]}-${themeData.roots[y2]}`;
            def = generateSentenceDefinition(type, themeData.prefixDefs[x], themeData.rootDefs[y], themeData.rootDefs[y2], null, -1, theme);
            break;
        case 'root':
            word = themeData.roots[y];
            def = generateSentenceDefinition(type, null, themeData.rootDefs[y], null, null, -1, theme);
            break;
        default:
            word = `${themeData.prefixes[x]}-${themeData.roots[y]}-${themeData.suffixes[z]}`;
            def = generateSentenceDefinition(type, themeData.prefixDefs[x], themeData.rootDefs[y], null, themeData.suffixDefs[z], z, theme);
    }

    return { word, def, x, y, z, y2 };
}

function generatePermutations(x, y, z, y2, currentType, theme) {
    const permutations = [];
    const types = ['pre-root-suf', 'root-suf', 'pre-root', 'pre-root-root', 'root'];
    
    types.forEach(type => {
        if (type !== currentType) {
            const { word, def } = generateWordAndDefinition(type, theme);
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
    const theme = themeType.value;
    const { word, def, x, y, z, y2 } = generateWordAndDefinition(type, theme);

    generatedWord.textContent = word;
    pronunciation.textContent = generatePronunciation(word);
    wordDefinition.textContent = def;

    // Generate permutations
    const permutations = generatePermutations(x, y, z, y2, type, theme);
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
themeType.addEventListener('change', updateDisplay);

// Generate a word on page load
updateDisplay();