const http = require('http');
const server = http.createServer((req, res) => {
    console.log(`요청 받음: ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Hello World! 서버가 정상적으로 응답하고 있습니다. 🚀');
});

server.listen(8080, '0.0.0.0', () => {
    console.log('초미니 서버 실행 중: http://localhost:8080');
});

server.on('error', (err) => console.error('서버 에러:', err));