<template>
  <div>
    <button @click="fetchData">데이터 가져오기</button>
    <div v-if="responseData">
      <h2>서버로부터 받은 데이터:</h2>
      <pre>{{ responseData }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      key: 'ttbyuhwanjun1232001', // 키 입력
      responseData: null,
    };
  },
  methods: {
    async fetchData() {
      const url = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${this.key}&QueryType=ItemNewAll&MaxResults=100&start=1&SearchTarget=Book&output=js&Version=20131101&CategoryId=50993`;

      try {
        const response = await axios.get(url);
        this.responseData = response.data;
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    },
  },
};
</script>

<style>
/* 필요한 스타일을 추가할 수 있습니다. */
</style>
