import { describe, it, expect } from 'vitest';
import { generateSarfSagheerTableFromRoot } from './generate-sarf-sagheer-table-from-root';
import { sarfHelpers, type Chapter } from '@arabiyya/sarf';

/**
 * Extract root letters from a chapter's first root_letters entry.
 */
function getRootLetters(chapter: Chapter<true>): string {
    const roots = chapter.root_letters[0].arabic;
    return roots['ف'] + roots['ع'] + roots['ل'];
}

/**
 * Get the صرف صغير from the @arabiyya/sarf package.
 */
function getSarfSagheerFromPackage(chapter: Chapter<true>) {
    const withRoots = sarfHelpers.replaceRoots(chapter);
    return withRoots['صرف صغير'];
}

/**
 * Maps our function output indices to their meanings:
 * [0] past (active)
 * [1] present (active)
 * [2] masdar
 * [3] faail (ism faail)
 * [4] past (passive)
 * [5] present (passive)
 * [6] masdar (repeated)
 * [7] mafool (ism mafool)
 * [8] command (amr)
 * [9] forbid (nahy)
 * [10] dharf (ism dharf / mafool)
 */

// Pattern configurations for test generation
interface Pattern {
    num: string;
    name: string;
    hasDualMasdar?: boolean;
}
const patterns: Pattern[] = [
    { num: '2', name: 'تفعيل' },
    { num: '3', name: 'مفاعلة', hasDualMasdar: true },
    { num: '4', name: 'إفعال' },
    { num: '5', name: 'تفعّل' },
    { num: '6', name: 'تفاعل' },
    { num: '7', name: 'انفعال' },
    { num: '8', name: 'افتعال' },
    { num: '9', name: 'افعلال' },
    { num: '10', name: 'استفعال' }
] as const;

describe('generateSarfSagheerTableFromRoot', () => {
    patterns.forEach(({ num, name, hasDualMasdar }) => {
        describe(`Pattern ${num} (${name})`, () => {
            describe('sahih (صحيح)', () => {
                it(`should correctly conjugate pattern ${num} sahih verbs`, () => {
                    const chapter = sarfHelpers.getChapterById(`sahih/${num}`) as Chapter<true>;
                    expect(chapter).toBeTruthy();

                    const rootLetters = getRootLetters(chapter);
                    const result = generateSarfSagheerTableFromRoot(rootLetters, num);
                    const sarfSagheer = getSarfSagheerFromPackage(chapter);

                    // Active voice
                    expect(result[0]).toBe(sarfSagheer.معروف.ماضي);
                    expect(result[1]).toBe(sarfSagheer.معروف.مضارع);
                    expect(result[3]).toBe(sarfSagheer.معروف.فاعل);

                    // Compare masdar - some patterns have dual masdar format
                    if (hasDualMasdar) {
                        expect(result[2]).toContain(sarfSagheer.مصدر);
                    } else {
                        expect(result[2]).toBe(sarfSagheer.مصدر);
                    }

                    // Passive voice (if exists)
                    if (sarfSagheer.مجهول) {
                        expect(result[4]).toBe(sarfSagheer.مجهول.ماضي);
                        expect(result[5]).toBe(sarfSagheer.مجهول.مضارع);
                        expect(result[7]).toBe(sarfSagheer.مجهول.مفعول);
                    }
                });
            });
        });
    });
});
