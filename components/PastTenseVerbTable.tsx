import { Table, TableBody, TableCell, TableRow, TableCaption } from '@/components/ui/Table';
import { PastTenseVerb } from '@/lib/past-tense-irregular-verbs';
import capitalize from 'lodash/capitalize';

interface Props {
    verb: PastTenseVerb;
}

export default function PastTenseVerbTable({ verb }: Props) {
    const table = verb.table;

    return (
        <Table className="text-left text-sm sm:text-lg">
            <TableCaption>
                {capitalize(verb.type)} {verb.pattern} {verb.bab} - {verb.irregularity}
            </TableCaption>
            <TableBody>
                <TableRow>
                    <TableCell>{table[2]}</TableCell>
                    <TableCell>{table[1]}</TableCell>
                    <TableCell>{table[0]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{table[5]}</TableCell>
                    <TableCell>{table[4]}</TableCell>
                    <TableCell>{table[3]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{table[8]}</TableCell>
                    <TableCell>{table[7]}</TableCell>
                    <TableCell>{table[6]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>{table[11]}</TableCell>
                    <TableCell>{table[10]}</TableCell>
                    <TableCell>{table[9]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell> </TableCell>
                    <TableCell>{table[13]}</TableCell>
                    <TableCell>{table[12]}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
