const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 8080;

// URL을 디코딩하여 한글 파일명 등을 처리하는 함수
const server = http.createServer((req, res) => {
    let decodedUrl = decodeURIComponent(req.url);
    let requestUrl = decodedUrl === '/' ? '/index.html' : decodedUrl;
    let filePath = path.join(__dirname, requestUrl);
    
    // 파일 확장자 확인
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'text/html';
    
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.pdf': 'application/pdf',
        '.svg': 'image/svg+xml'
    };
    
    contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`File not found: ${filePath}`);
                res.writeHead(404);
                res.end('File Not Found');
            } else {
                console.error(`Server error: ${err.code}`);
                res.writeHead(500);
                res.end(`Sorry, check with the site admin for error: ${err.code} ..\n`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('\n=========================================\n');
    console.log('🚀 고준서 포트폴리오 서버 실행 중!');
    console.log(`포트: ${PORT}`);
    console.log('=========================================\n');
});
