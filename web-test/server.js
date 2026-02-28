const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 8080;

const server = http.createServer((req, res) => {
    let requestUrl = req.url === '/' ? '/index.html' : req.url;
    let filePath = path.join(__dirname, requestUrl);
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('\n🚀 서버가 실행되었습니다!');
    console.log(`포트: ${PORT}`);
    console.log('\n다른 기기에서 접속하려면:');
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                console.log(`🔗 http://${net.address}:${PORT}`);
            }
        }
    }
});