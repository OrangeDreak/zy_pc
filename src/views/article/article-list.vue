<template>
  <div class="container">
    <common-header />
    <div class="content">
      <div class="content-title">{{ list.cateName }}</div>
      <div v-for="(item,index) in list.articleList" :key="index" class="t-list-item" @click="toDetail(item.articleId)">
        <span>{{ item.articleName }}</span> <el-icon><ArrowRight /></el-icon>
      </div>
    </div>
  </div>
  <common-footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router";

// import { ArrowRight } from 'element-plus'
import {getArticleList } from '@/api/common'
import CommonHeader from "@/components/layout/CommonHeader.vue";
import CommonFooter from '@/components/layout/CommonFooter.vue'

const router = useRouter()
const route = useRoute();

const list = ref({});
const name = ref('');
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const articleList = async () => {
  const res = await getArticleList({
    pageNo: page.value,
    pageSize: pageSize.value,
    articleCategoryId: 26
  })
  if (res.code === 200) {
    list.value = res.data[0] || {};
    total.value = res.total;
  }
}
// 分页相关方法
const handleSizeChange = (val) => {
  page.value = 1;
  pageSize.value = val;
  articleList();
}
const toDetail = (id) => {
  router.push({
    path: '/article',
    query: {
      id: id
    }
  })
}
const handleCurrentChange = (val) => {
  page.value = val;
  articleList();
}
onMounted(() => {
  articleList()
})


</script>

<style lang="less" scoped>
@import '@/styles/variables.less';

.container {
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 80px;
  .content-title{
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 20px;
  }
  .content {
    width: 1280px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
  }
  .t-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }
}
</style> 