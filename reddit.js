const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

const DATA_PATH = path.join(__dirname, './popular-articles.json');

rp('https://reddit.com/r/popular.json')
    .then(res => {
        let articles = []
        
        JSON.parse(res).data.children.forEach(item => {
            articles.push({
                title: item.data.title,
                url: item.data.url,
                author: item.data.author
            });
        });

        fs.writeFile(DATA_PATH, JSON.stringify(articles), err => {
            if (err) {
                console.log(err);
                return;
            }
        
            console.log('fs write complete!')
        });
    })
    .catch(err => {
        console.log(err);
    });