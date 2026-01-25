function fixHamzas(str = '') {
    return str.replace('َء', 'َأ').replace('ُء', 'ُؤ').replace('ِء', 'ِئ');
}

function letterIsVowel(letter = '') {
    return letter === 'ي' || letter === 'و';
}

/**
 * Inspired by https://fuseina.github.io/sarf/
 *
 * Generates a sarf table from a root + pattern number.
 * Works for patterns 2-10.
 *
 * TODO: Add pattern 1
 *
 * @export
 * @param {string} rootLetters
 * @param {string} patternNum
 * @return {*}  {SarfPattern['table']}
 */
export function generateSarfSagheerTableFromRoot(rootLetters: string, patternNum: string): string[] {
    rootLetters = rootLetters.replace(/\s/g, '').slice(0, 3);

    const firstRoot = rootLetters[0];
    const secondRoot = rootLetters[1];
    const thirdRoot = rootLetters[2];

    let past = '';
    let present = '';
    let masdar = '';
    let faail = '';
    let pastP = '';
    let presentP = '';
    let mafool = '';
    let dharf = '';
    let command = '';
    let forbid = '';
    let hasPassive = true;

    if (patternNum === '2') {
        // Irregularities: naaqis
        if (letterIsVowel(thirdRoot)) {
            // Naaqis
            past = firstRoot + 'َ' + secondRoot + 'َّ' + 'ى';
            present = 'يُ' + firstRoot + 'َ' + secondRoot + 'ِّ' + 'ي';
            masdar = 'تَ' + firstRoot + secondRoot + 'ِيَ' + 'ةً';
            faail = 'مُ' + firstRoot + 'َ' + secondRoot + 'ٍّ';

            pastP = firstRoot + 'ُ' + secondRoot + 'ِّ' + 'يَ';
            presentP = 'يُ' + firstRoot + 'َ' + secondRoot + 'َّ' + 'ى';
            mafool = 'مُ' + firstRoot + 'َ' + secondRoot + 'ًّ' + 'ى';
            dharf = mafool;

            command = firstRoot + 'َ' + secondRoot + 'ِّ';
            forbid = ' لا  ' + 'تُ' + firstRoot + 'َ' + secondRoot + 'ِّ';
        } else {
            past = firstRoot + 'َ' + secondRoot + 'َّ' + thirdRoot + 'َ';
            present = 'يُ' + firstRoot + 'َ' + secondRoot + 'ِّ' + thirdRoot + 'ُ';
            masdar = 'تَ' + firstRoot + 'ْ' + secondRoot + 'ِي' + 'ْ' + thirdRoot + 'ًا';
            faail = 'مُ' + firstRoot + 'َ' + secondRoot + 'ِّ' + thirdRoot + 'ٌ';

            pastP = firstRoot + 'ُ' + secondRoot + 'ِّ' + thirdRoot + 'َ';
            presentP = 'يُ' + firstRoot + 'َ' + secondRoot + 'َّ' + thirdRoot + 'ُ';
            mafool = 'مُ' + firstRoot + 'َ' + secondRoot + 'َّ' + thirdRoot + 'ٌ';
            dharf = mafool;

            command = firstRoot + 'َ' + secondRoot + 'ِّ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تُ' + firstRoot + 'َ' + secondRoot + 'ِّ' + thirdRoot + 'ْ';
        }
    } else if (patternNum === '3') {
        // Irregularities: naaqis, mudhaaf
        let beginMasdar = '';
        if (firstRoot === 'ء') {
            beginMasdar = 'إِيْ';
        } else {
            beginMasdar = firstRoot + 'ِ';
        }

        if (secondRoot === thirdRoot) {
            // Mudhaaf
            past = firstRoot + 'ا' + secondRoot + 'َّ';
            present = 'يُ' + firstRoot + 'ا' + secondRoot + 'ُّ';

            masdar = beginMasdar + secondRoot + 'ا' + thirdRoot + 'ًا';
            masdar = masdar + '  ' + 'وَ' + '  ' + 'مُ' + firstRoot + 'ا' + secondRoot + 'َّةً';
            faail = 'مُ' + firstRoot + 'ا' + secondRoot + 'ٌّ';

            pastP = firstRoot + 'ُ' + 'و' + secondRoot + 'َّ';
            presentP = 'يُ' + firstRoot + 'ا' + secondRoot + 'ُّ';
            mafool = faail;
            dharf = mafool;
            command = firstRoot + 'َا' + secondRoot + 'َّ';
            command = command + '  ' + firstRoot + 'َا' + secondRoot + 'ِّ';
            command = command + '  ' + firstRoot + 'َا' + secondRoot + 'ِ' + thirdRoot + 'ْ';

            forbid = ' لا  ' + 'تُ' + firstRoot + 'َا' + secondRoot + 'َّ';
            forbid = forbid + '  ' + ' لا  ' + 'تُ' + firstRoot + 'َا' + secondRoot + 'ِّ';
            forbid = forbid + '  ' + ' لا  ' + 'تُ' + firstRoot + 'َا' + secondRoot + 'ِ' + thirdRoot + 'ْ';
        } else if (letterIsVowel(thirdRoot)) {
            // Naaqis
            past = firstRoot + 'ا' + secondRoot + 'َ' + 'ى';
            present = 'يُ' + firstRoot + 'ا' + secondRoot + 'ِ' + 'ي';

            masdar = beginMasdar + secondRoot + 'ا' + 'ءً';
            masdar = masdar + '  ' + 'وَ' + '  ' + 'مُ' + firstRoot + 'ا' + secondRoot + 'َ' + 'اةً';
            faail = 'مُ' + firstRoot + 'ا' + secondRoot + 'ٍ';

            pastP = firstRoot + 'ُ' + 'و' + secondRoot + 'ِ' + 'يَ';
            presentP = 'يُ' + firstRoot + 'ا' + secondRoot + 'َ' + 'ى';
            mafool = 'مُ' + firstRoot + 'ا' + secondRoot + 'ًى';
            dharf = mafool;
            command = firstRoot + 'ا' + secondRoot + 'ِ';
            forbid = ' لا  ' + 'تُ' + firstRoot + 'ا' + secondRoot + 'ِ';
        } else {
            past = firstRoot + 'َا' + secondRoot + 'َ' + thirdRoot + 'َ';
            present = 'يُ' + firstRoot + 'َا' + secondRoot + 'ِ' + thirdRoot + 'ُ';

            masdar = beginMasdar + secondRoot + 'َا' + thirdRoot + 'ًا';
            masdar = masdar + '  ' + 'وَ' + '  ' + 'مُ' + firstRoot + 'َا' + secondRoot + 'َ' + thirdRoot + 'َ' + 'ةً';
            faail = 'مُ' + firstRoot + 'َا' + secondRoot + 'ِ' + thirdRoot + 'ٌ';

            pastP = firstRoot + 'ُوْ' + secondRoot + 'ِ' + thirdRoot + 'َ';
            presentP = 'يُ' + firstRoot + 'َا' + secondRoot + 'َ' + thirdRoot + 'ُ';
            mafool = 'مُ' + firstRoot + 'َا' + secondRoot + 'َ' + thirdRoot + 'ٌ';
            dharf = mafool;
            command = firstRoot + 'َا' + secondRoot + 'ِ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تُ' + firstRoot + 'َا' + secondRoot + 'ِ' + thirdRoot + 'ْ';
        }
    } else if (patternNum === '4') {
        // Irregularities: mithaal, ajwaf, naaqis, lafeef maqroon (acts like naaqis), mudhaaf
        let beginPast = '';
        let beginMasdar = '';
        let beginCommand = '';

        if (firstRoot == 'ء') {
            beginPast = 'آ';
            beginMasdar = 'إِيْ';
            beginCommand = 'آ';
        } else {
            beginPast = 'أَ' + firstRoot + 'ْ';
            beginMasdar = 'إِ' + firstRoot + 'ْ';
            beginCommand = 'أَ' + firstRoot + 'ْ';
        }

        if (letterIsVowel(thirdRoot)) {
            // Naaqis and lafeef maqroon (acts like naaqis)
            past = beginPast + secondRoot + 'َى';
            present = 'يُ' + firstRoot + 'ْ' + secondRoot + 'ِي';

            if (letterIsVowel(firstRoot)) {
                beginMasdar = 'إِي';
            }
            masdar = beginMasdar + secondRoot + 'ا' + 'ءً';

            faail = 'مُ' + firstRoot + 'ْ' + secondRoot + 'ٍ';

            pastP = 'أُ' + firstRoot + 'ْ' + secondRoot + 'ِ' + 'يَ';
            presentP = 'يُ' + firstRoot + 'ْ' + secondRoot + 'َى';
            mafool = 'مُ' + firstRoot + 'ْ' + secondRoot + 'ًى';
            dharf = mafool;
            command = beginCommand + secondRoot + 'ِ';
            forbid = ' لا  ' + 'تُ' + firstRoot + 'ْ' + secondRoot + 'ِ';
        } else if (secondRoot === thirdRoot) {
            // Mudhaaf
            past = 'أَ' + firstRoot + 'َ' + secondRoot + 'َّ';
            present = 'يُ' + firstRoot + 'ِ' + secondRoot + 'ُّ';
            if (letterIsVowel(firstRoot)) {
                beginMasdar = 'إِي';
            }
            masdar = beginMasdar + secondRoot + 'ا' + thirdRoot + 'ًا';
            faail = 'مُ' + firstRoot + 'ِ' + secondRoot + 'ٌّ';

            pastP = 'أُ' + firstRoot + 'ِ' + secondRoot + 'َّ';
            presentP = 'يُ' + firstRoot + 'َ' + secondRoot + 'ُّ';
            mafool = 'مُ' + firstRoot + 'َ' + secondRoot + 'ٌّ';
            dharf = mafool;

            command = 'أَ' + firstRoot + 'ِ' + secondRoot + 'َّ';
            command = command + '  ' + 'أَ' + firstRoot + 'ِ' + secondRoot + 'ِّ';
            command = command + '  ' + 'أَ' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'ْ';

            forbid = ' لا  ' + 'تُ' + firstRoot + 'ِ' + secondRoot + 'َّ';
            forbid = forbid + '  ' + ' لا  ' + 'تُ' + firstRoot + 'ِ' + secondRoot + 'ِّ';
            forbid = forbid + '  ' + ' لا  ' + 'تُ' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
        } else if (letterIsVowel(secondRoot)) {
            // Ajwaf
            past = 'أَ' + firstRoot + 'َا' + thirdRoot + 'َ';
            present = 'يُ' + firstRoot + 'ِي' + thirdRoot + 'ُ';
            if (letterIsVowel(firstRoot)) {
                beginMasdar = 'إِي';
            }
            masdar = 'إِ' + firstRoot + 'َا' + thirdRoot + 'َةً';
            faail = 'مُ' + firstRoot + 'ِي' + thirdRoot + 'ٌ';

            pastP = 'أُ' + firstRoot + 'ِي' + thirdRoot + 'َ';
            presentP = 'يُ' + firstRoot + 'َا' + thirdRoot + 'ُ';
            mafool = 'مُ' + firstRoot + 'َا' + thirdRoot + 'ٌ';
            dharf = mafool;
            command = 'أَ' + firstRoot + 'ِ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تُ' + firstRoot + 'ِ' + thirdRoot + 'ْ';
        } else {
            // Includes mithaal...masdar changes
            past = beginPast + secondRoot + 'َ' + thirdRoot + 'َ';
            present = 'يُ' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'ُ';
            if (letterIsVowel(firstRoot)) {
                beginMasdar = 'إِيْ';
            }
            masdar = beginMasdar + secondRoot + 'َا' + thirdRoot + 'ًا';
            faail = 'مُ' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'ٌ';

            pastP = 'أُ' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'َ';
            presentP = 'يُ' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'ُ';
            mafool = 'مُ' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'ٌ';
            dharf = mafool;
            command = beginCommand + secondRoot + 'ِ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تُ' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
        }
    } else if (patternNum === '5') {
        // Irregularities: naaqis
        if (letterIsVowel(thirdRoot)) {
            past = 'تَ' + firstRoot + 'َ' + secondRoot + 'َّ' + 'ى';
            present = 'يَتَ' + firstRoot + 'َ' + secondRoot + 'َّ' + 'ى';

            masdar = 'تَ' + firstRoot + 'َ' + secondRoot + 'ِّيًا';
            faail = 'مُ' + 'تَ' + firstRoot + 'َ' + secondRoot + 'ٍّ';

            pastP = 'تُ' + firstRoot + 'ُ' + secondRoot + 'ِّ' + 'يَ';
            presentP = 'يُتَ' + firstRoot + 'َ' + secondRoot + 'َّى';
            mafool = 'مُ' + 'تَ' + firstRoot + 'َ' + secondRoot + 'ًّى';
            dharf = mafool;
            command = 'تَ' + firstRoot + 'َ' + secondRoot + 'َّ';
            forbid = ' لا  ' + 'تَتَ' + firstRoot + 'َ' + secondRoot + 'َّ';
        } else {
            past = 'تَ' + firstRoot + 'َ' + secondRoot + 'َّ' + thirdRoot + 'َ';
            present = 'يَتَ' + firstRoot + 'َ' + secondRoot + 'َّ' + thirdRoot + 'ُ';

            masdar = 'تَ' + firstRoot + 'َ' + secondRoot + 'ُّ' + thirdRoot + 'ًا';
            faail = 'مُ' + 'تَ' + firstRoot + 'َ' + secondRoot + 'ِّ' + thirdRoot + 'ٌ';

            pastP = 'تُ' + firstRoot + 'ُ' + secondRoot + 'ِّ' + thirdRoot + 'َ';
            presentP = 'يُتَ' + firstRoot + 'َ' + secondRoot + 'َّ' + thirdRoot + 'ُ';
            mafool = 'مُ' + 'تَ' + firstRoot + 'َ' + secondRoot + 'َّ' + thirdRoot + 'ٌ';
            dharf = mafool;
            command = 'تَ' + firstRoot + 'َ' + secondRoot + 'َّ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تَتَ' + firstRoot + 'َ' + secondRoot + 'َّ' + thirdRoot + 'ْ';
        }
    } else if (patternNum === '6') {
        // Irregularities: naaqis, mudhaaf
        if (letterIsVowel(thirdRoot)) {
            past = 'تَ' + firstRoot + 'َا' + secondRoot + 'َى';
            present = 'يَتَ' + firstRoot + 'َا' + secondRoot + 'َى';

            masdar = 'تَ' + firstRoot + 'َا' + secondRoot + 'ِ' + 'يًا';
            faail = 'مُ' + 'تَ' + firstRoot + 'َا' + secondRoot + 'ٍ';

            pastP = 'تُ' + firstRoot + 'ُو' + secondRoot + 'ِيَ';
            presentP = 'يُتَ' + firstRoot + 'ا' + secondRoot + 'َى';
            mafool = 'مُ' + 'تَ' + firstRoot + 'َا' + secondRoot + 'ًى';
            dharf = mafool;
            command = 'تَ' + firstRoot + 'َا' + secondRoot + 'َ';
            forbid = ' لا  ' + 'تَتَ' + firstRoot + 'َا' + secondRoot + 'َ';
        } else if (secondRoot === thirdRoot) {
            // Mudhaf
            past = 'تَ' + firstRoot + 'َا' + secondRoot + 'َّ';
            present = 'يَتَ' + firstRoot + 'َا' + secondRoot + 'ُّ';

            masdar = 'تَ' + firstRoot + 'َا' + secondRoot + 'ُ' + thirdRoot + 'ًا';
            faail = 'مُ' + 'تَ' + firstRoot + 'َا' + secondRoot + 'ٌّ';

            pastP = 'تُ' + firstRoot + 'ُ' + 'و' + secondRoot + 'َّ';
            presentP = 'يُتَ' + firstRoot + 'ا' + secondRoot + 'ُّ';
            mafool = faail;
            dharf = mafool;
            command = 'تَ' + firstRoot + 'َا' + secondRoot + 'َّ';
            command = command + '  ' + 'تَ' + firstRoot + 'َا' + secondRoot + 'ِّ';
            command = command + '  ' + 'تَ' + firstRoot + 'َا' + secondRoot + 'ِ' + thirdRoot + 'ْ';

            forbid = ' لا  ' + 'تَتَ' + firstRoot + 'َا' + secondRoot + 'َّ';
            forbid = forbid + '  ' + ' لا  ' + 'تَتَ' + firstRoot + 'َا' + secondRoot + 'ِّ';
            forbid = forbid + '  ' + ' لا  ' + 'تَتَ' + firstRoot + 'َا' + secondRoot + 'َ' + thirdRoot + 'ْ';
        } else {
            past = 'تَ' + firstRoot + 'َا' + secondRoot + 'َ' + thirdRoot + 'َ';
            present = 'يَتَ' + firstRoot + 'َا' + secondRoot + 'َ' + thirdRoot + 'ُ';

            masdar = 'تَ' + firstRoot + 'َا' + secondRoot + 'ُ' + thirdRoot + 'ًا';
            faail = 'مُ' + 'تَ' + firstRoot + 'َا' + secondRoot + 'ِ' + thirdRoot + 'ٌ';

            pastP = 'تُ' + firstRoot + 'ُوْ' + secondRoot + 'ِ' + thirdRoot + 'َ';
            presentP = 'يُتَ' + firstRoot + 'َا' + secondRoot + 'َ' + thirdRoot + 'ُ';
            mafool = 'مُ' + 'تَ' + firstRoot + 'َا' + secondRoot + 'َ' + thirdRoot + 'ٌ';
            dharf = mafool;
            command = 'تَ' + firstRoot + 'َا' + secondRoot + 'َ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تَتَ' + firstRoot + 'َا' + secondRoot + 'َ' + thirdRoot + 'ْ';
        }
    } else if (patternNum === '7') {
        // Irregularities: ajwaf, naaqis
        hasPassive = false;
        if (letterIsVowel(thirdRoot)) {
            past = 'انْ' + firstRoot + 'َ' + secondRoot + 'َى';
            present = 'يَنْ' + firstRoot + 'َ' + secondRoot + 'ِي';

            masdar = 'انْ' + firstRoot + 'ِ' + secondRoot + 'ا' + 'ءً';
            faail = 'مُنْ' + firstRoot + 'َ' + secondRoot + 'ٍ';

            dharf = 'مُنْ' + firstRoot + 'َ' + secondRoot + 'ًى';

            command = 'انْ' + firstRoot + 'َ' + secondRoot + 'ِ';
            forbid = ' لا  ' + 'تَنْ' + firstRoot + 'َ' + secondRoot + 'ِ';
        } else if (letterIsVowel(secondRoot)) {
            past = 'انْ' + firstRoot + 'َا' + thirdRoot + 'َ';
            present = 'يَنْ' + firstRoot + 'َا' + thirdRoot + 'ُ';

            masdar = 'انْ' + firstRoot + 'ِيا' + thirdRoot + 'ًا';
            faail = 'مُنْ' + firstRoot + 'َا' + thirdRoot + 'ٌ';

            dharf = faail;

            command = 'انْ' + firstRoot + 'َ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تَنْ' + firstRoot + 'َ' + thirdRoot + 'ْ';
        } else if (secondRoot === thirdRoot) {
            // Mudhaaf
            past = 'انْ' + firstRoot + 'َ' + secondRoot + 'َّ';
            present = 'يَن' + firstRoot + 'َ' + secondRoot + 'ُّ';

            masdar = 'انْ' + firstRoot + 'ِ' + secondRoot + 'َا' + thirdRoot + 'ًا';
            faail = 'مُن' + firstRoot + 'َ' + secondRoot + 'ٌّ';

            dharf = faail;
            command = 'انْ' + firstRoot + 'َ' + secondRoot + 'َّ';
            command = command + '  ' + 'انْ' + firstRoot + 'َ' + secondRoot + 'ِّ';
            command = command + '  ' + 'انْ' + firstRoot + 'َ' + secondRoot + 'ِ' + thirdRoot + 'ْ';

            forbid = ' لا  ' + 'تَن' + firstRoot + 'َ' + secondRoot + 'َّ';
            forbid = forbid + '  ' + ' لا  ' + 'تَن' + firstRoot + 'ََ' + secondRoot + 'ِّ';
            forbid = forbid + '  ' + ' لا  ' + 'تَن' + firstRoot + 'ََ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
        } else {
            past = 'انْ' + firstRoot + 'َ' + secondRoot + 'َ' + thirdRoot + 'َ';
            present = 'يَنْ' + firstRoot + 'َ' + secondRoot + 'ِ' + thirdRoot + 'ُ';

            masdar = 'انْ' + firstRoot + 'ِ' + secondRoot + 'َا' + thirdRoot + 'ًا';
            faail = 'مُنْ' + firstRoot + 'َ' + secondRoot + 'ِ' + thirdRoot + 'ٌ';

            dharf = 'مُنْ' + firstRoot + 'َ' + secondRoot + 'َ' + thirdRoot + 'ٌ';

            command = 'انْ' + firstRoot + 'َ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تَنْ' + firstRoot + 'َ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
        }
    } else if (patternNum === '8') {
        // Irregularities: mithaal, ajwaf, naaqis, lafeef mafrooq (merge mithaal and naaqis)
        if (letterIsVowel(firstRoot) && letterIsVowel(thirdRoot)) {
            past = 'اِتَّ' + secondRoot + 'َى';
            present = 'يَتَّ' + secondRoot + 'ِي';

            masdar = 'اِتِّ' + secondRoot + 'ا' + 'ءً';
            faail = 'مُتَّ' + secondRoot + 'ٍ';

            pastP = 'اُتُّ' + secondRoot + 'ِ' + 'يَ';
            presentP = 'يُتَّ' + secondRoot + 'َى';

            mafool = 'مُتَّ' + secondRoot + 'ًى';
            dharf = mafool;

            command = 'اِتَّ' + secondRoot + 'ِ';
            forbid = ' لا  ' + 'تَتَّ' + secondRoot + 'ِ';
        } else if (letterIsVowel(thirdRoot)) {
            // Naaqis and lafeef mafrooq
            past = 'ا' + firstRoot + 'ْتَ' + secondRoot + 'َى';
            present = 'يَ' + firstRoot + 'ْتَ' + secondRoot + 'ِي';

            masdar = 'ا' + firstRoot + 'ْتِ' + secondRoot + 'ا' + 'ءً';
            faail = 'مُ' + firstRoot + 'ْتَ' + secondRoot + 'ٍ';

            pastP = 'ا' + firstRoot + 'ْتُ' + secondRoot + 'ِ' + 'يَ';
            presentP = 'يُ' + firstRoot + 'ْتَ' + secondRoot + 'َى';

            mafool = 'مُ' + firstRoot + 'ْتَ' + secondRoot + 'ًى';
            dharf = mafool;

            command = 'ا' + firstRoot + 'ْتَ' + secondRoot + 'ِ';
            forbid = ' لا  ' + 'تَ' + firstRoot + 'ْتَ' + secondRoot + 'ِ';
        } else if (letterIsVowel(firstRoot) || firstRoot === 'ت' || firstRoot === 'ء') {
            // Mithaal
            past = 'ا' + 'تَّ' + secondRoot + 'َ' + thirdRoot + 'َ';
            present = 'يَ' + 'تَّ' + secondRoot + 'ِ' + thirdRoot + 'ُ';

            masdar = 'ا' + 'تِّ' + secondRoot + 'َا' + thirdRoot + 'ًا';
            faail = 'مُ' + 'تَّ' + secondRoot + 'ِ' + thirdRoot + 'ٌ';

            pastP = 'ا' + 'تُّ' + secondRoot + 'ِ' + thirdRoot + 'َ';
            presentP = 'يُ' + 'تَّ' + secondRoot + 'َ' + thirdRoot + 'ُ';

            mafool = 'مُ' + 'تَّ' + secondRoot + 'َ' + thirdRoot + 'ٌ';
            dharf = mafool;

            command = 'ا' + 'تَّ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تَتَّ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
        } else if (letterIsVowel(secondRoot)) {
            // Ajwaf
            past = 'ا' + firstRoot + 'ْتَا' + thirdRoot + 'َ';
            present = 'يَ' + firstRoot + 'ْتَا' + thirdRoot + 'ُ';

            masdar = 'ا' + firstRoot + 'ْتِ' + 'يَا' + thirdRoot + 'ًا';
            faail = 'مُ' + firstRoot + 'ْتَا' + thirdRoot + 'ٌ';

            pastP = 'اُ' + firstRoot + 'ْتِي' + thirdRoot + 'َ';
            presentP = 'يُ' + firstRoot + 'ْتَا' + thirdRoot + 'ُ';

            mafool = faail;
            dharf = mafool;

            command = 'ا' + firstRoot + 'ْتَ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تَ' + firstRoot + 'ْتَ' + thirdRoot + 'ْ';
        } else if (secondRoot === thirdRoot) {
            // Mudhaaf
            past = 'ا' + firstRoot + 'ْتَ' + secondRoot + 'َّ';
            present = 'يَ' + firstRoot + 'ْتَ' + secondRoot + 'ُّ';

            masdar = 'ا' + firstRoot + 'ْتِ' + secondRoot + 'َا' + thirdRoot + 'ًا';
            faail = 'مُ' + firstRoot + 'ْتَ' + secondRoot + 'ٌّ';

            pastP = 'ا' + firstRoot + 'ْتُ' + secondRoot + 'َّ';
            presentP = 'يُ' + firstRoot + 'ْتَ' + secondRoot + 'ُّ';

            mafool = faail;
            dharf = mafool;

            command = 'ا' + firstRoot + 'ْتَ' + secondRoot + 'َّ';
            command = command + '  ' + 'ا' + firstRoot + 'ْتَ' + secondRoot + 'ِّ';
            command = command + '  ' + 'ا' + firstRoot + 'ْتَ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تَ' + firstRoot + 'ْتَ' + secondRoot + 'َّ';
            forbid = forbid + '  ' + ' لا  ' + 'تَ' + firstRoot + 'ْتَ' + secondRoot + 'ِّ';
            forbid = forbid + '  ' + ' لا  ' + 'تَ' + firstRoot + 'ْتَ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
        } else {
            past = 'ا' + firstRoot + 'ْتَ' + secondRoot + 'َ' + thirdRoot + 'َ';
            present = 'يَ' + firstRoot + 'ْتَ' + secondRoot + 'ِ' + thirdRoot + 'ُ';

            masdar = 'ا' + firstRoot + 'ْتِ' + secondRoot + 'َا' + thirdRoot + 'ًا';
            faail = 'مُ' + firstRoot + 'ْتَ' + secondRoot + 'ِ' + thirdRoot + 'ٌ';

            pastP = 'ا' + firstRoot + 'ْتُ' + secondRoot + 'ِ' + thirdRoot + 'َ';
            presentP = 'يُ' + firstRoot + 'ْتَ' + secondRoot + 'َ' + thirdRoot + 'ُ';

            mafool = 'مُ' + firstRoot + 'ْتَ' + secondRoot + 'َ' + thirdRoot + 'ٌ';
            dharf = mafool;

            command = 'ا' + firstRoot + 'ْتَ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تَ' + firstRoot + 'ْتَ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
        }
    } else if (patternNum === '9') {
        hasPassive = false;
        past = 'ا' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'َّ';
        present = 'يَ' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'ُّ';

        masdar = 'ا' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'َا' + thirdRoot + 'ًا';
        faail = 'مُ' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'ٌّ';

        dharf = faail;

        command = 'ا' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'َّ';
        command = command + '  ' + 'ا' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'ِّ';
        command = command + '  ' + 'ا' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'ِ' + thirdRoot + 'ْ';

        forbid = ' لا  ' + 'تَ' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'َّ';
        forbid = forbid + '  ' + ' لا  ' + 'تَ' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'ِّ';
        forbid =
            forbid + '  ' + ' لا  ' + 'تَ' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'ِ' + thirdRoot + 'ْ';
    } else if (patternNum === '10') {
        // Irregularitiess mithaal, ajwaf, naaqis, lafeef maqroon(acts like naaqis), mudhaaf
        if (letterIsVowel(thirdRoot)) {
            // Naaqis and lafeef maqroon
            past = 'اسْتَ' + firstRoot + 'ْ' + secondRoot + 'َى';
            present = 'يَسْتَ' + firstRoot + 'ْ' + secondRoot + 'ِي';

            if (letterIsVowel(firstRoot)) {
                masdar = 'استِي' + secondRoot + 'َاءً';
            } else {
                masdar = 'اسْتِ' + firstRoot + 'ْ' + secondRoot + 'َاءً';
            }
            faail = 'مُسْتَ' + firstRoot + 'ْ' + secondRoot + 'ٍ';

            pastP = 'اسْتُ' + firstRoot + 'ْ' + secondRoot + 'ِ' + 'يَ';
            presentP = 'يُسْتَ' + firstRoot + 'ْ' + secondRoot + 'َى';

            mafool = 'مُسْتَ' + firstRoot + 'ْ' + secondRoot + 'ًى';
            dharf = mafool;

            command = 'اسْتَ' + firstRoot + 'ْ' + secondRoot + 'ِ';
            forbid = ' لا  ' + 'تَسْتَ' + firstRoot + 'ْ' + secondRoot + 'ِ';
        } else if (letterIsVowel(secondRoot)) {
            // Ajwaf
            past = 'اسْتَ' + firstRoot + 'َا' + thirdRoot + 'َ';
            present = 'يَسْتَ' + firstRoot + 'ِي' + thirdRoot + 'ُ';

            masdar = 'اسْتِ' + firstRoot + 'َا' + thirdRoot + 'َةً';
            faail = 'مُسْتَ' + firstRoot + 'ِي' + thirdRoot + 'ٌ';

            pastP = 'اسْتُ' + firstRoot + 'ِي' + thirdRoot + 'َ';
            presentP = 'يُسْتَ' + firstRoot + 'َا' + thirdRoot + 'ُ';

            mafool = 'مُسْتَ' + firstRoot + 'َا' + thirdRoot + 'ٌ';
            dharf = mafool;

            command = 'اسْتَ' + firstRoot + 'ِ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تَسْتَ' + firstRoot + 'ِ' + thirdRoot + 'ْ';
        } else if (secondRoot === thirdRoot) {
            // Mudhaaf
            past = 'اسْتَ' + firstRoot + 'َ' + secondRoot + 'َّ';
            present = 'يَسْتَ' + firstRoot + 'ِ' + secondRoot + 'ُّ';

            masdar = 'استِ' + firstRoot + 'ْ' + secondRoot + 'ا' + thirdRoot + 'ًا';
            faail = 'مُسْتَ' + firstRoot + 'ِ' + secondRoot + 'ٌّ';

            pastP = 'اسْتُ' + firstRoot + 'ِ' + secondRoot + 'َّ';
            presentP = 'يُسْتَ' + firstRoot + 'َ' + secondRoot + 'ُّ';

            masdar = 'استِ' + firstRoot + 'ْ' + secondRoot + 'ا' + thirdRoot + 'ًا';
            mafool = 'مُسْتَ' + firstRoot + 'َ' + secondRoot + 'ٌّ';

            dharf = mafool;
            command = 'اسْتَ' + firstRoot + 'ِ' + secondRoot + 'َّ';
            command = command + '  ' + 'اسْتَ' + firstRoot + 'ِ' + secondRoot + 'ِّ';
            command = command + '  ' + 'اسْتَ' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'ْ';

            forbid = ' لا  ' + 'تَسْتَ' + firstRoot + 'ِ' + secondRoot + 'َّ';
            forbid = forbid + '  ' + ' لا  ' + 'تَسْتَ' + firstRoot + 'ِ' + secondRoot + 'ِّ';
            forbid = forbid + '  ' + ' لا  ' + 'تَسْتَ' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
        } else {
            // Includes mithaal masdar change
            past = 'اسْتَ' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'َ';
            present = 'يَسْتَ' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'ُ';

            if (letterIsVowel(firstRoot)) {
                masdar = 'اسْتِيْ' + secondRoot + 'َا' + thirdRoot + 'ًا';
            } else {
                masdar = 'اسْتِ' + firstRoot + 'ْ' + secondRoot + 'َا' + thirdRoot + 'ًا';
            }
            faail = 'مُسْتَ' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'ٌ';

            pastP = 'اسْتُ' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'َ';
            presentP = 'يُسْتَ' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'ُ';

            mafool = 'مُسْتَ' + firstRoot + 'ْ' + secondRoot + 'َ' + thirdRoot + 'ٌ';
            dharf = mafool;

            command = 'اسْتَ' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
            forbid = ' لا  ' + 'تَسْتَ' + firstRoot + 'ْ' + secondRoot + 'ِ' + thirdRoot + 'ْ';
        }
    }

    past = fixHamzas(past);
    present = fixHamzas(present);
    masdar = fixHamzas(masdar);
    faail = fixHamzas(faail);
    pastP = fixHamzas(pastP);
    presentP = fixHamzas(presentP);
    mafool = fixHamzas(mafool);
    dharf = fixHamzas(dharf);
    command = fixHamzas(command);
    forbid = fixHamzas(forbid);

    return [
        past,
        present,
        masdar,
        faail,
        hasPassive ? pastP : '',
        hasPassive ? presentP : '',
        hasPassive ? masdar : '',
        hasPassive ? mafool : '',
        command,
        forbid,
        dharf
    ];
}
