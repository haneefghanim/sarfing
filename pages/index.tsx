import localFont from 'next/font/local';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Head from 'next/head';

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
    const [time, setTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // Seconds calculation
    const seconds = Math.floor(time / 100);
    // Milliseconds calculation
    const milliseconds = time % 100;

    const onClickGenerate = function () {
        setTime(0);
        setIsTimerRunning(true);
        setPattern((Math.floor(Math.random() * 10) + 1).toString());
        setRoot(roots[Math.floor(Math.random() * 8)]);
    };

    const onClickPauseTimer = function () {
        setIsTimerRunning(!isTimerRunning);
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (isTimerRunning) {
            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isTimerRunning, time]);

    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20`}
        >
            <Head>
                <title>Sarfing App</title>
            </Head>
            <main className="row-start-2 flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Sarfing App</h1>
                <p className="mb-2 max-w-[300px] sm:max-w-[440px]">
                    Generates a 3-letter root and a pattern to conjugate it in. Aim to recite the sarf sagheer table in
                    less than 10-15s.
                </p>
                <div>
                    <Button size="lg" onClick={onClickGenerate}>
                        {pattern && root ? 'Generate again' : 'Generate'}
                    </Button>
                </div>
                {pattern && root && (
                    <>
                        <div className="mt-2 rounded bg-blue-100 px-[0.5rem] py-[0.2rem] text-3xl">
                            Do &quot;<strong className="font-medium">{root}</strong>&quot; in pattern{' '}
                            <strong className="font-medium">{pattern}</strong>.
                        </div>
                        <div
                            className={cn('mt-5 font-mono text-xl', {
                                'text-green-700': seconds <= 10,
                                'text-yellow-600': seconds > 10 && seconds < 20,
                                'text-red-700': seconds >= 20
                            })}
                        >
                            {seconds}.{milliseconds}s
                        </div>
                        {isTimerRunning && (
                            <Button size="sm" variant="secondary" onClick={onClickPauseTimer}>
                                Stop
                            </Button>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
