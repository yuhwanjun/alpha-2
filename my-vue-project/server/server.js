// server.js (백엔드 서버)

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// CORS 설정
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 모든 출처에서 요청 허용 (*)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 클라이언트로부터의 요청을 처리하는 엔드포인트
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbyuhwanjun1232001&QueryType=ItemNewAll&MaxResults=100&start=1&SearchTarget=Book&output=js&Version=20131101&CategoryId=50993');
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
