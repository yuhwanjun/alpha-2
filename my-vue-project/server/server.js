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

//! ISBN 검색 엔드포인트
app.get('/api/isbn', async (req, res) => {
  try {
    const { ttbkey, itemId } = req.query;
    const response = await axios.get(`http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx`, {
      params: {
        ttbkey,
        itemIdType: 'ISBN',
        ItemId: itemId,
        output: 'js',
        Version: '20131101',
        Cover: "Big",
        OptResult: 'previewImgList,packing,ratingInfo,previewImgList,reviewList,fulldescription,Toc,Story',
        // https://docs.google.com/forms/d/e/1FAIpQLSfjynYb6jp0q8IMGJ9jlVUmnnGMfq8HLDUp54lJM6naXq42tg/viewform?vc=0&c=0&w=1&flr=0
        // 목차나 줄거리는 프리미엄 api 심사를 통해야 받을 수 있을 듯
      },
    });

    // 서버에서 받아온 도서 정보를 바로 클라이언트에 전달
    res.send(response.data);
  } catch (error) {
    console.error('ISBN 검색 중 오류 발생:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 리스트 검색 엔드포인트
app.get('/api/data', async (req, res) => {
  try {
    // 클라이언트에서 설정한 쿼리 매개변수를 서버에서 받아옴
    const { ttbkey, QueryType, MaxResults, start, SearchTarget, output, Version, CategoryId, Cover } = req.query;

    // 서버에서 받아온 쿼리 매개변수를 외부 API 요청에 전달
    const response = await axios.get(
      `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${ttbkey}&QueryType=${QueryType}&MaxResults=${MaxResults}&start=${start}&SearchTarget=${SearchTarget}&output=${output}&Version=${Version}&CategoryId=${CategoryId}&Cover=${Cover}`);
    
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
