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
      responseData: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/data'); // 서버의 경로
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
