#!/bin/bash

echo "-----------------------------------------"
echo "🚀 포트폴리오 배포를 시작합니다!"
echo "-----------------------------------------"

# 1. GitHub에서 최신 코드 가져오기
echo "📦 GitHub에서 최신 코드 가져오는 중..."
git fetch origin main
git reset --hard origin/main

# 2. pm2 서버 재시작
echo "🔄 pm2 서버 재시작 중..."
# pm2에 등록되어 있지 않으면 start, 있으면 restart
if pm2 list | grep -q "server"; then
    pm2 restart server.js
else
    pm2 start server.js
fi

echo "-----------------------------------------"
echo "✅ 배포가 성공적으로 완료되었습니다!"
echo "-----------------------------------------"
pm2 status