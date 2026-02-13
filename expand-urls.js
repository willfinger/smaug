const https = require('https');
const fs = require('fs');

const urls = [
    'https://t.co/Bm4U8qEp82',
    'https://t.co/owyFzMSUdI',
    'https://t.co/AXOSn88suR',
    'https://t.co/1f635fzrFW',
    'https://t.co/gqdUxvuaLc',
    'https://t.co/gupiw10kRV',
    'https://t.co/GsnRM0SQua'
];

function expandUrl(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const location = res.headers.location;
                resolve(location || url);
            });
        });
        req.on('error', reject);
        req.end();
    });
}

async function processUrls() {
    for (const url of urls) {
        try {
            const expanded = await expandUrl(url);
            console.log(`${url} -> ${expanded}`);

            // Check if it's a GitHub URL
            if (expanded.includes('github.com')) {
                console.log(`  -> This is a GitHub tool`);
            }
            // Check if it's Medium, Substack, etc.
            else if (expanded.includes('medium.com') || expanded.includes('substack.com') || expanded.includes('dev.to') || expanded.includes('blog.')) {
                console.log(`  -> This is an article/blog`);
            }
            else {
                console.log(`  -> Unknown category`);
            }
        } catch (error) {
            console.error(`Error expanding ${url}:`, error.message);
        }
    }
}

processUrls();