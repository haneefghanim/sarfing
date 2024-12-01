import localFont from 'next/font/local';
import Head from 'next/head';
import { DrawerWrapper } from '@/components/ui/Drawer';
import RegularSarfTester from '@/components/RegularSarfTester';
import IrregularSarfTester from '@/components/IrregularSarfTester';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

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

export default function Home() {
    return (
        <DrawerWrapper>
            <div
                className={`${geistSans.variable} ${geistMono.variable} p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20`}
            >
                <Head>
                    <title>Sarfing App</title>
                </Head>
                <Tabs defaultValue="regular" className="max-w-[500px] mx-auto">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="regular">Regular Sarfing</TabsTrigger>
                        <TabsTrigger value="irregular">Irregular Sarfing</TabsTrigger>
                    </TabsList>
                    <TabsContent value="regular">
                        <RegularSarfTester />
                    </TabsContent>
                    <TabsContent value="irregular">
                        <IrregularSarfTester />
                    </TabsContent>
                </Tabs>
            </div>
        </DrawerWrapper>
    );
}
