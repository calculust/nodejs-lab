const path = require('path');
const URL = require('url');
const fs = require('fs');
const rp = require('request-promise');

const DOWNLOADS_PATH = path.join(__dirname, './downloads/');

rp('https://reddit.com/r/popular.json')
    .then(res => {
        
        JSON.parse(res).data.children.forEach(item => {
            let url = item.data.url;
            let result = path.extname(URL.parse(url).pathname);
            
            if (result === '.jpg' || result === '.png' || result === '.gif') {
                
                download(
                    url,
                    path.join(__dirname, `./downloads/${item.data.id}${result}`), 
                    () => {
                        console.log('done');
                    });
            }
        });
    })
    .catch(err => {
        console.log(err);
    });

function download(uri, filename, callback) {
    rp.head(uri, (err, res, body) => {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
    
        rp(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};
    
    