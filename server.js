const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const nodemailer = require('nodemailer');

const PORT = 8080;

// 이메일 설정 (Google 앱 비밀번호 사용 권장)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gojunseoooo@gmail.com', // 주니님 이메일
        pass: '주니님의_앱_비밀번호' // 발급받은 16자리 앱 비밀번호 (공백 없이 입력)
    }
});

const server = http.createServer((req, res) => {
    let decodedUrl = decodeURIComponent(req.url);
    
    // API 요청 처리 (문의 보내기)
    if (req.method === 'POST' && decodedUrl === '/api/contact') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const { name, email, message } = JSON.parse(body);

            const mailOptions = {
                from: email,
                to: 'gojunseoooo@gmail.com', // 받는 이메일
                subject: `[문의] ${name}님으로부터 새로운 문의가 도착했습니다.`,
                text: `성함: ${name}\n이메일: ${email}\n내용:\n${message}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('메일 전송 실패:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: error.message }));
                } else {
                    console.log('메일 전송 성공:', info.response);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                }
            });
        });
        return;
    }

    // 일반 정적 파일 처리 (HTML, JPG, PDF 등)
    let requestUrl = decodedUrl === '/' ? '/index.html' : decodedUrl;
    let filePath = path.join(__dirname, requestUrl);
    const ext = path.extname(filePath).toLowerCase();
    
    const mimeTypes = {
        '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
        '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
        '.pdf': 'application/pdf'
    };
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404); res.end('File Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 포트폴리오 서버 실행 중 (포트: ${PORT})`);
});