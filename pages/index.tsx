import localFont from 'next/font/local';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

const roots = ['ك ت ب', 'ع ل م', 'د ر س', 'ذ ه ب', 'ن ز ل', 'ف ت ح', 'ج ل س', 'خ ر ج'];

export default function Home() {
    const [pattern, setPattern] = useState('');
    const [root, setRoot] = useState('');
    const onClickGenerate = function () {
        setPattern((Math.floor(Math.random() * 10) + 1).toString());
        setRoot(roots[Math.floor(Math.random() * 8)]);
    };

    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20`}
        >
            <main className="row-start-2 flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Sarfing</h1>
                <p className="mb-2 max-w-[300px] sm:max-w-full">
                    Click the button below to get a 3-letter root and a pattern to conjugate it in.
                </p>
                <Button size="lg" onClick={onClickGenerate}>
                    {pattern && root ? 'Generate again' : 'Generate'}
                </Button>
                {pattern && root && (
                    <div className="mt-2 rounded bg-blue-100 px-[0.5rem] py-[0.2rem] text-3xl">
                        Do &quot;<strong className="font-medium">{root}</strong>&quot; in pattern{' '}
                        <strong className="font-medium">{pattern}</strong>.
                    </div>
                )}
            </main>
        </div>
    );
}
