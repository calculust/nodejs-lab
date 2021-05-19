const path = require('path');
const fs = require('fs');

const DATA_PATH = path.join(__dirname, '../chirps.json');

const chirps = [
    {
        id: 1,
        username: 'cat',
        content: 'meow'
    },
    {
        id: 2,
        username: 'dog',
        content: 'woof'
    },
    {
        id: 3,
        username: 'cow',
        content: 'moo'
    },
    {
        id: 4,
        username: 'horse',
        content: 'neehaww'
    },
    {
        id: 5,
        username: 'frog',
        content: 'ribbit'   
    },
]

fs.writeFile(DATA_PATH, JSON.stringify(chirps, null, 2), err => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('fs write complete!')
});