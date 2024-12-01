import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { cn } from '@/lib/utils';
import SarfPatternTable from '@/components/SarfPatternTable';
import { BabId, PatternId, sarfPatterns, babs } from '@/lib/sarf-patterns';
import { roots } from '@/lib/roots';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/Drawer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';

export default function RegularSarfTester() {
    const [patternOptions, setPatternOptions] = useState(sarfPatterns.map((pattern) => pattern.value));
    const [currentPattern, setCurrentPattern] = useState<PatternId>();
    const [currentRoot, setCurrentRoot] = useState('');
    const [currentBab, setCurrentBab] = useState<BabId>();
    const [time, setTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // Timer calculation
    const seconds = Math.floor(time / 100);
    const milliseconds = time % 100;

    const onClickGenerate = function () {
        setTime(0);
        setIsTimerRunning(false);
        setCurrentPattern(patternOptions[Math.floor(Math.random() * patternOptions.length)]);
        setCurrentRoot(roots[Math.floor(Math.random() * roots.length)]);
        setCurrentBab(babs[Math.floor(Math.random() * babs.length)]);
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
        <Card>
            <CardHeader>
                <CardTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">Sarfing App</CardTitle>
                <CardDescription>
                    Generates a 3-letter root and a pattern to conjugate it in. Aim to recite the sarf sagheer table in
                    under 15s.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <MultiSelect
                    options={sarfPatterns}
                    onValueChange={(value) => setPatternOptions(value as PatternId[])}
                    defaultValue={patternOptions}
                    placeholder="Select patterns"
                    optionName="pattern"
                    optionNamePlural="patterns"
                    className="mb-4 max-w-[300px] sm:max-w-[440px]"
                />
                <div className="mt-2">
                    <Button size="lg" onClick={onClickGenerate} disabled={patternOptions.length === 0}>
                        {currentPattern && currentRoot ? 'Generate again' : 'Generate'}
                    </Button>
                    {currentPattern && currentBab && (
                        <Drawer>
                            <DrawerTrigger>
                                <Button size="lg" className="ml-2" variant="outline">
                                    Hint
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className="ml-auto mr-auto max-w-[600px] p-4">
                                    <SarfPatternTable patternId={currentPattern} babId={currentBab} />
                                </div>
                            </DrawerContent>
                        </Drawer>
                    )}
                </div>
                {currentPattern && currentRoot && (
                    <>
                        <Separator className="my-4" />
                        <div className="mt-2 rounded bg-blue-100 px-5 py-3 text-3xl">
                            Do &quot;<strong className="font-medium">{currentRoot}</strong>&quot; in pattern{' '}
                            <strong className="font-medium">
                                {currentPattern}
                                {currentPattern === '1' ? ` (${currentBab})` : ''}
                            </strong>
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
                        <Button
                            size="sm"
                            variant="secondary"
                            className={
                                isTimerRunning
                                    ? 'bg-red-100 text-red-900 hover:bg-red-200'
                                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }
                            onClick={onClickPauseTimer}
                        >
                            {isTimerRunning ? 'Stop' : 'Start'}
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
