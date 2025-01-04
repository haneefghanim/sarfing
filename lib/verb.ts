import { Irregularity } from './irregularities';
export interface Verb {
    irregularity: Irregularity;
    type: 'passive' | 'active';
    pattern: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '10';
    table: string[];
    state?: 'رفع' | 'نصب' | 'جزم';
    bab?: string;
}
