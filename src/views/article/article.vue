<template>
  <div class="container">
    <common-header />
    <div class="content">
     <div class="content-title">{{ name }}</div>
     <div class="content-content" v-html="decodeURIComponent(content)"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router";

import { ElMessage } from 'element-plus'
import { getAgreementList, getArticle } from '@/api/common'
import CommonHeader from "@/components/layout/CommonHeader.vue";

const router = useRouter()
const route = useRoute();

const props = defineProps({
  id: {
      type: Number,
      default: 0
  },
  type: {
      type: String,
      default: ''
  },
})

const id = ref(0);
const type = ref('');
const content = ref('');
const name = ref('');
const article = async () => {
  const res = await getArticle({
    articleId: id.value
  })
  if (res.code === 200) {
    content.value = res.data.content
    name.value = res.data.name
  }
}
const Agreement = async () => {
  const res = await getAgreementList({
    position: id.value
  })
  if (res.code === 200) {
    id.value = res.data[0].articleId;
    article();
  }
}
onMounted(() => {
  id.value = route.query.id || props.id;
  type.value = route.query.type || props.type;
  if (type.value === 'agreement') {
    Agreement()
  } else {
    article()
  }
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
    .content-content{
      font-size: 16px;
      line-height: 30px;
    }
  }
}
</style> 