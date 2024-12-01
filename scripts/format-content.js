// This script is used to format the data copied from the following doc created by a fellow Qalam student
// https://docs.google.com/document/d/1L5CM_g-oMylXOkL6PoIMkA5JUU9bvf5P1o7SAI6Ceq0/edit
const fs = require('fs');

const content = fs.readFileSync('./content.txt').toString().trim();

const lines = content.split('\n');

let currentVerb;

const formattedVerbs = [];

lines.forEach((line) => {
    if (line === '') {
        return;
    }

    if (line.startsWith('Active') || line.startsWith('Passive')) {
        if (currentVerb) {
            formattedVerbs.push(currentVerb);
        }
        const [type, pattern, ...rest] = line.toLowerCase().split(' ');
        const bab = rest.length > 0 ? rest.join(' ') : undefined;
        currentVerb = { irregularity: 'لفيف', type, pattern, bab, table: [] };
    } else {
        currentVerb.table.push(line);
    }
});

formattedVerbs.push(currentVerb);

// Now we re-order all the verbs because they copy out of order
formattedVerbs.forEach((verb) => {
    const table = verb.table;
    verb.table = [
        table[2],
        table[1],
        table[0],
        table[5],
        table[4],
        table[3],
        table[8],
        table[7],
        table[6],
        table[10],
        table[7],
        table[9],
        table[12],
        table[11]
    ];
});

console.log('Done!');

fs.writeFileSync('./formatted-content.js', JSON.stringify(formattedVerbs, null, 2));
