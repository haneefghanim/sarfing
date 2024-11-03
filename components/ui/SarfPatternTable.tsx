import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { sarfPatterns, PatternId, BabId } from '@/lib/sarf-patterns';

interface Props {
    patternId: PatternId;
    babId?: BabId;
}

export default function SarfPatternTable({ patternId, babId }: Props) {
    const pattern = sarfPatterns.find((pattern) => pattern.value === patternId);
    const table = pattern ? (Array.isArray(pattern.table) ? pattern.table : pattern.table[babId!]) : [];

    return (
        <Table className="text-left text-sm sm:text-lg">
            <TableHeader>
                <TableRow>
                    <TableHead>الاسم الفاعل</TableHead>
                    <TableHead>مصدر</TableHead>
                    <TableHead>الفعل المضارع</TableHead>
                    <TableHead>الفعل الماضي</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>{table[3]}</TableCell>
                    <TableCell>{table[2]}</TableCell>
                    <TableCell>{table[1]}</TableCell>
                    <TableCell>{table[0]}</TableCell>
                </TableRow>
            </TableBody>
            <TableHeader>
                <TableRow>
                    <TableHead>الاسم المفعول</TableHead>
                    <TableHead>مصدر</TableHead>
                    <TableHead>الفعل المضارع المجهول</TableHead>
                    <TableHead>الفعل الماضي المجهول</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>{table[7] || 'x'}</TableCell>
                    <TableCell>{table[6] || 'x'}</TableCell>
                    <TableCell>{table[5] || 'x'}</TableCell>
                    <TableCell>{table[4] || 'x'}</TableCell>
                </TableRow>
            </TableBody>
            <TableHeader>
                <TableRow>
                    <TableHead>الآلة منه</TableHead>
                    <TableHead>الظفر منه</TableHead>
                    <TableHead>النهي عنه</TableHead>
                    <TableHead>الأمر منه</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>{table[11] || 'x'}</TableCell>
                    <TableCell>{table[10] || 'x'}</TableCell>
                    <TableCell>{table[9] || 'x'}</TableCell>
                    <TableCell>{table[8] || 'x'}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
