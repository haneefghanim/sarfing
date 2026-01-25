import { describe, it, expect } from 'vitest';
import { generateSarfSagheerTableFromRoot } from './generate-sarf-sagheer-table-from-root';
import { sarfHelpers, type Chapter } from '@arabiyya/sarf';

/**
 * Strip sukoon diacritic from Arabic text.
 */
function stripSukoon(text: string): string {
    return text.replace(/\u0652/g, '');
}

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
    // Apply root letters to get actual conjugations
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

describe('generateSarfSagheerTableFromRoot', () => {
    // ============================================
    // PATTERN 2 (تفعيل)  TESTS
    // ============================================
    describe('Pattern 2 (تفعيل)', () => {
        describe('sahih (صحيح)', () => {
            it('should correctly conjugate pattern 2 sahih verbs', () => {
                // Get reference from @arabiyya/sarf and use its root letters
                const chapter = sarfHelpers.getChapterById('sahih/2') as Chapter<true>;
                expect(chapter).toBeTruthy();

                const rootLetters = getRootLetters(chapter);
                const result = generateSarfSagheerTableFromRoot(rootLetters, '2');
                const sarfSagheer = getSarfSagheerFromPackage(chapter);

                // Active voice - compare base letters
                expect(result[0]).toBe(sarfSagheer.معروف.ماضي);
                expect(result[1]).toBe(sarfSagheer.معروف.مضارع);
                expect(result[3]).toBe(sarfSagheer.معروف.فاعل);

                // Compare masdar
                expect(result[2]).toBe(sarfSagheer.مصدر);

                // Passive voice (if exists)
                if (sarfSagheer.مجهول) {
                    expect(result[4]).toBe(sarfSagheer.مجهول.ماضي);
                    expect(result[5]).toBe(sarfSagheer.مجهول.مضارع);
                    expect(result[7]).toBe(sarfSagheer.مجهول.مفعول);
                }
            });
        });
    });

    // ============================================
    // PATTERN 3 (مفاعلة) TESTS
    // ============================================
    describe('Pattern 3 (مفاعلة)', () => {
        describe('sahih (صحيح)', () => {
            it('should correctly conjugate pattern 3 sahih verbs', () => {
                const chapter = sarfHelpers.getChapterById('sahih/3') as Chapter<true>;
                expect(chapter).toBeTruthy();

                const rootLetters = getRootLetters(chapter);
                const result = generateSarfSagheerTableFromRoot(rootLetters, '3');
                const sarfSagheer = getSarfSagheerFromPackage(chapter);

                // Active voice
                expect(result[0]).toBe(sarfSagheer.معروف.ماضي);
                expect(result[1]).toBe(sarfSagheer.معروف.مضارع);
                expect(result[3]).toBe(sarfSagheer.معروف.فاعل);

                // Compare masdar
                expect(result[2]).toBe(sarfSagheer.مصدر);

                // Passive voice (if exists)
                if (sarfSagheer.مجهول) {
                    expect(result[4]).toBe(sarfSagheer.مجهول.ماضي);
                    expect(result[5]).toBe(sarfSagheer.مجهول.مضارع);
                    expect(result[7]).toBe(sarfSagheer.مجهول.مفعول);
                }
            });
        });
    });

    // ============================================
    // PATTERN 4 (إفعال) TESTS
    // ============================================
    describe('Pattern 4 (إفعال)', () => {
        describe('sahih (صحيح)', () => {
            it('should correctly conjugate pattern 4 sahih verbs', () => {
                const chapter = sarfHelpers.getChapterById('sahih/4') as Chapter<true>;
                expect(chapter).toBeTruthy();

                const rootLetters = getRootLetters(chapter);
                const result = generateSarfSagheerTableFromRoot(rootLetters, '4');
                const sarfSagheer = getSarfSagheerFromPackage(chapter);

                // Active voice
                expect(result[0]).toBe(sarfSagheer.معروف.ماضي);
                expect(result[1]).toBe(sarfSagheer.معروف.مضارع);
                expect(result[3]).toBe(sarfSagheer.معروف.فاعل);

                // Compare masdar
                expect(result[2]).toBe(sarfSagheer.مصدر);

                // Passive voice (if exists)
                if (sarfSagheer.مجهول) {
                    expect(result[4]).toBe(sarfSagheer.مجهول.ماضي);
                    expect(result[5]).toBe(sarfSagheer.مجهول.مضارع);
                    expect(result[7]).toBe(sarfSagheer.مجهول.مفعول);
                }
            });
        });
    });

    // ============================================
    // PATTERN 5 (تفعّل) TESTS
    // ============================================
    describe('Pattern 5 (تفعّل)', () => {
        describe('sahih (صحيح)', () => {
            it('should correctly conjugate pattern 5 sahih verbs', () => {
                const chapter = sarfHelpers.getChapterById('sahih/5') as Chapter<true>;
                expect(chapter).toBeTruthy();

                const rootLetters = getRootLetters(chapter);
                const result = generateSarfSagheerTableFromRoot(rootLetters, '5');
                const sarfSagheer = getSarfSagheerFromPackage(chapter);

                // Active voice
                expect(result[0]).toBe(sarfSagheer.معروف.ماضي);
                expect(result[1]).toBe(sarfSagheer.معروف.مضارع);
                expect(result[3]).toBe(sarfSagheer.معروف.فاعل);

                // Compare masdar
                expect(result[2]).toBe(sarfSagheer.مصدر);

                // Passive voice (if exists)
                if (sarfSagheer.مجهول) {
                    expect(result[4]).toBe(sarfSagheer.مجهول.ماضي);
                    expect(result[5]).toBe(sarfSagheer.مجهول.مضارع);
                    expect(result[7]).toBe(sarfSagheer.مجهول.مفعول);
                }
            });
        });
    });

    // ============================================
    // PATTERN 6 (تفاعل) TESTS
    // ============================================
    describe('Pattern 6 (تفاعل)', () => {
        describe('sahih (صحيح)', () => {
            it('should correctly conjugate pattern 6 sahih verbs', () => {
                const chapter = sarfHelpers.getChapterById('sahih/6') as Chapter<true>;
                expect(chapter).toBeTruthy();

                const rootLetters = getRootLetters(chapter);
                const result = generateSarfSagheerTableFromRoot(rootLetters, '6');
                const sarfSagheer = getSarfSagheerFromPackage(chapter);

                // Active voice
                expect(result[0]).toBe(sarfSagheer.معروف.ماضي);
                expect(result[1]).toBe(sarfSagheer.معروف.مضارع);
                expect(result[3]).toBe(sarfSagheer.معروف.فاعل);

                // Compare masdar
                expect(result[2]).toBe(sarfSagheer.مصدر);

                // Passive voice (if exists)
                if (sarfSagheer.مجهول) {
                    expect(result[4]).toBe(sarfSagheer.مجهول.ماضي);
                    expect(result[5]).toBe(sarfSagheer.مجهول.مضارع);
                    expect(result[7]).toBe(sarfSagheer.مجهول.مفعول);
                }
            });
        });
    });

    // ============================================
    // PATTERN 7 (انفعال) TESTS
    // ============================================
    describe('Pattern 7 (انفعال)', () => {
        describe('sahih (صحيح)', () => {
            it('should correctly conjugate pattern 7 sahih verbs', () => {
                const chapter = sarfHelpers.getChapterById('sahih/7') as Chapter<true>;
                expect(chapter).toBeTruthy();

                const rootLetters = getRootLetters(chapter);
                const result = generateSarfSagheerTableFromRoot(rootLetters, '7');
                const sarfSagheer = getSarfSagheerFromPackage(chapter);

                // Active voice
                expect(result[0]).toBe(sarfSagheer.معروف.ماضي);
                expect(result[1]).toBe(sarfSagheer.معروف.مضارع);
                expect(result[3]).toBe(sarfSagheer.معروف.فاعل);

                // Compare masdar
                expect(result[2]).toBe(sarfSagheer.مصدر);

                // Passive voice (if exists)
                if (sarfSagheer.مجهول) {
                    expect(result[4]).toBe(sarfSagheer.مجهول.ماضي);
                    expect(result[5]).toBe(sarfSagheer.مجهول.مضارع);
                    expect(result[7]).toBe(sarfSagheer.مجهول.مفعول);
                }
            });
        });
    });

    // ============================================
    // PATTERN 8 (افتعال) TESTS
    // ============================================
    describe('Pattern 8 (افتعال)', () => {
        describe('sahih (صحيح)', () => {
            it('should correctly conjugate pattern 8 sahih verbs', () => {
                const chapter = sarfHelpers.getChapterById('sahih/8') as Chapter<true>;
                expect(chapter).toBeTruthy();

                const rootLetters = getRootLetters(chapter);
                const result = generateSarfSagheerTableFromRoot(rootLetters, '8');
                const sarfSagheer = getSarfSagheerFromPackage(chapter);

                // Active voice
                expect(result[0]).toBe(sarfSagheer.معروف.ماضي);
                expect(result[1]).toBe(sarfSagheer.معروف.مضارع);
                expect(result[3]).toBe(sarfSagheer.معروف.فاعل);

                // Compare masdar
                expect(result[2]).toBe(sarfSagheer.مصدر);

                // Passive voice (if exists)
                if (sarfSagheer.مجهول) {
                    expect(result[4]).toBe(sarfSagheer.مجهول.ماضي);
                    expect(result[5]).toBe(sarfSagheer.مجهول.مضارع);
                    expect(result[7]).toBe(sarfSagheer.مجهول.مفعول);
                }
            });
        });
    });

    // ============================================
    // PATTERN 9 (افعلال) TESTS
    // ============================================
    describe('Pattern 9 (افعلال)', () => {
        describe('sahih (صحيح)', () => {
            it('should correctly conjugate pattern 9 sahih verbs', () => {
                const chapter = sarfHelpers.getChapterById('sahih/9') as Chapter<true>;
                expect(chapter).toBeTruthy();

                const rootLetters = getRootLetters(chapter);
                const result = generateSarfSagheerTableFromRoot(rootLetters, '9');
                const sarfSagheer = getSarfSagheerFromPackage(chapter);

                // Active voice
                expect(result[0]).toBe(sarfSagheer.معروف.ماضي);
                expect(result[1]).toBe(sarfSagheer.معروف.مضارع);
                expect(result[3]).toBe(sarfSagheer.معروف.فاعل);

                // Compare masdar
                expect(result[2]).toBe(sarfSagheer.مصدر);

                // Passive voice (if exists)
                if (sarfSagheer.مجهول) {
                    expect(result[4]).toBe(sarfSagheer.مجهول.ماضي);
                    expect(result[5]).toBe(sarfSagheer.مجهول.مضارع);
                    expect(result[7]).toBe(sarfSagheer.مجهول.مفعول);
                }
            });
        });
    });

    // ============================================
    // PATTERN 10 (استفعال) TESTS
    // ============================================
    describe('Pattern 10 (استفعال)', () => {
        describe('sahih (صحيح)', () => {
            it('should correctly conjugate pattern 10 sahih verbs', () => {
                const chapter = sarfHelpers.getChapterById('sahih/10') as Chapter<true>;
                expect(chapter).toBeTruthy();

                const rootLetters = getRootLetters(chapter);
                const result = generateSarfSagheerTableFromRoot(rootLetters, '10');
                const sarfSagheer = getSarfSagheerFromPackage(chapter);

                // Active voice
                expect(result[0]).toBe(sarfSagheer.معروف.ماضي);
                expect(result[1]).toBe(sarfSagheer.معروف.مضارع);
                expect(result[3]).toBe(sarfSagheer.معروف.فاعل);

                // Compare masdar
                expect(result[2]).toBe(sarfSagheer.مصدر);

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
