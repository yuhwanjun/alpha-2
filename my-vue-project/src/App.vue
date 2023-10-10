<template>
  <div>
    <div class="bookInfo" v-if="bookInfo">
      <h2>{{ bookInfo.title }}</h2>
      <h3>지은이: {{ bookInfo.author }}</h3>
      <img v-if="bookInfo.cover" :src="bookInfo.cover" alt="책 표지 이미지" />
      <a :href="bookInfo.link">알라딘 이동</a>
      <p>설명: {{ bookInfo.description }}</p>
      <p>카테고리: {{ bookInfo.categoryName }}</p>
      <p>페이지 수: {{ bookInfo.subInfo.itemPage }}</p>
      <p>무게: {{ bookInfo.subInfo.packing.weight }}</p>
      <p>별점: {{ bookInfo.subInfo.ratingInfo.ratingScore }}</p>
      <!-- <pre>{{ bookInfo }}</pre> -->
    </div>
    <h2>도서 정보:</h2>
    <button @click="fetchData">데이터 가져오기</button>
    <div class="book-wrap" v-if="bookData">
      <div class="book-item" v-for="(book, index) in bookData.item" :key="index">
        <div @click="testData(book.isbn)">
          <p><strong>제목:</strong> {{ book.title }}</p>
          <p><strong>저자:</strong> {{ book.author }}</p>
          <p><strong>출판일:</strong> {{ book.pubDate }}</p>
          <p><strong>가격:</strong> {{ book.priceSales }}원</p>
          <p><strong>줄거리:</strong> {{ book.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      responseData: null,
      bookData: null,
      bookInfo: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const params = {
          ttbkey: 'ttbyuhwanjun1232001',
          QueryType: 'Bestseller',
          MaxResults: 10,
          start: 1,
          SearchTarget: 'Book',
          output: 'js',
          Version: '20131101',
          CategoryId: 0
          //? https://docs.google.com/document/d/1mX-WxuoGs8Hy-QalhHcvuV17n50uGI2Sg_GHofgiePE/edit
        };

        const response = await axios.get('http://localhost:3000/api/data', { params }); // 서버의 경로와 params 설정
        this.bookData = response.data; // 받아온 데이터를 responseData에 저장
        console.log(response.data)
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    },
    async testData(itemId) {
      try {
        const params = {
          ttbkey: 'ttbyuhwanjun1232001',
          itemId: itemId,
        };

        const response = await axios.get('http://localhost:3000/api/isbn', { params }); // 서버의 경로와 params 설정
        this.responseData = response.data; // 받아온 데이터를 responseData에 저장
        this.bookInfo = this.responseData.item[0];
        console.log(this.bookInfo)
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    },
  },
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
  .book-wrap {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
  }
  .book-item {
    flex: 1 1 30%;
    padding: 20px;
  }
  .book-item div{
    cursor: pointer;
    border: 1px solid pink;
    padding: 10px;
    border-radius: 4px;
  }
  .bookInfo {
    width: 65%;
  }
  .bookInfo p{
    padding-bottom: 1em;
  }
  /* 필요한 스타일을 추가할 수 있습니다. */
</style>
