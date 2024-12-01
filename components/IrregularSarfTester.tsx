import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/Drawer';
import { Separator } from '@/components/ui/Separator';
import { pastTenseVerbs, PastTenseVerb, allIrregularities } from '@/lib/past-tense-irregular-verbs';
import PastTenseVerbTable from '@/components/PastTenseVerbTable';
import { MultiSelect } from '@/components/ui/MultiSelect';

const allIrregularityOptions = allIrregularities.map((irregularity) => ({ label: irregularity, value: irregularity }));

export default function IrregularSarfTester() {
    const [time, setTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [currentVerb, setCurrentVerb] = useState<PastTenseVerb>();
    const [currentVerbIndex, setCurrentVerbIndex] = useState<number>();
    const [irregularities, setIrregularities] = useState(allIrregularities);

    // Timer calculation
    const seconds = Math.floor(time / 100);
    const milliseconds = time % 100;

    const onClickGenerate = function () {
        setTime(0);
        setIsTimerRunning(false);
        const filteredPastTenseVerbs = pastTenseVerbs.filter((verb) => {
            return irregularities.includes(verb.irregularity);
        });
        const verb = filteredPastTenseVerbs[Math.floor(Math.random() * filteredPastTenseVerbs.length)];
        setCurrentVerb(verb);
        setCurrentVerbIndex(Math.floor(Math.random() * verb.table.length));
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
                <CardTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Irregular Sarfing App
                </CardTitle>
                <CardDescription>
                    Generates a past tense verb (active or passive) with an irregularity in its roots. First, identify
                    which irregularity, pattern number and conjugation you are looking at, then aim to recite the full
                    past tense verb table in under 30s.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <MultiSelect
                        options={allIrregularityOptions}
                        onValueChange={(value) => setIrregularities(value)}
                        defaultValue={irregularities}
                        placeholder="Select irregularities"
                        optionName="irregularity"
                        optionNamePlural="irregularities"
                        className="mb-4 max-w-[300px] sm:max-w-[440px]"
                    />
                    <Button size="lg" onClick={onClickGenerate} disabled={irregularities.length === 0}>
                        Generate
                    </Button>
                    {currentVerb && (
                        <Drawer>
                            <DrawerTrigger>
                                <Button size="lg" className="ml-2" variant="outline">
                                    Hint
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className="ml-auto mr-auto max-w-[600px] p-4">
                                    <PastTenseVerbTable verb={currentVerb} />
                                </div>
                            </DrawerContent>
                        </Drawer>
                    )}
                </div>
                {currentVerb && (
                    <>
                        <Separator className="my-4" />
                        <div className="mt-2 rounded bg-blue-100 px-5 py-3 text-3xl">
                            Do &quot;<strong className="font-medium">{currentVerb.table[currentVerbIndex || 0]}</strong>
                            &quot;
                        </div>
                        <div
                            className={cn('mt-5 font-mono text-xl', {
                                'text-green-700': seconds <= 15,
                                'text-yellow-600': seconds > 20 && seconds < 30,
                                'text-red-700': seconds >= 30
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
