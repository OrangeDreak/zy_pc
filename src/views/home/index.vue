<template>
  <div class="estima">
    <!-- 使用公共头部 -->
    <common-header />

    <div class="min-h-screen bg-gray-50">
      <!-- 顶部公告栏 -->
      <div class="w-full bg-purple-600 text-white px-6 py-3 flex justify-between items-center rounded-lg mb-8">
        <span class="text-sm">最新公告：新增增值服务 2 项、跨境物流线路 3 条</span>
        <button class="text-sm !rounded-button whitespace-nowrap">查看详情</button>
      </div>
      <!-- 主要内容区域 -->
      <div class="container mx-auto px-4 flex gap-8 h-[600px]">
        <!-- 左侧仓库导览 -->
        <div class="w-1/3 rounded-2xl overflow-hidden relative group cursor-pointer">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img :src="warehouseImage" alt="warehouse tour" class="w-full h-full object-cover" />
          <div class="absolute bottom-8 left-8 z-20 text-white">
            <h2 class="text-3xl font-bold mb-2">仓库导览</h2>
            <p class="text-sm opacity-80">探索我们的智能仓储设施</p>
          </div>
          <div class="absolute top-4 right-4 z-20">
            <el-icon class="text-white text-2xl">
              <Plus />
            </el-icon>
          </div>
        </div>
        <!-- 中间服务介绍 -->
        <div class="w-1/3 bg-white rounded-2xl p-8 relative background-color" >
          <h2 class="text-2xl font-bold mb-8">服务介绍</h2>
          <div class="grid grid-cols-2 gap-6">
            <div v-for="(service, index) in services" :key="index"
              class="flex flex-col items-center justify-center bg-purple-100 rounded-full aspect-square p-6 cursor-pointer hover:bg-purple-200 transition-colors">
              <el-icon class="text-6xl text-purple-600 mb-2">
                <component :is="service.icon" />
              </el-icon>
              <span class="text-purple-900">{{ service.name }}</span>
            </div>
          </div>
          <div class="absolute top-4 right-4">
            <el-icon class="text-purple-600 text-2xl">
              <Plus />
            </el-icon>
          </div>
        </div>
        <!-- 右侧快捷操作 -->
        <div
          class="w-1/3 bg-purple-600 rounded-2xl p-8 flex flex-col justify-center items-center text-white cursor-pointer hover:bg-purple-700 transition-colors">
          <div>
            <a href="/add-transfer">
              <h2 class="text-4xl font-bold mb-4">立即使用</h2>
              <div>
                <el-icon class="text-4xl"><ArrowRight /></el-icon>
              </div>
          </a>
          </div>
          <p class="text-lg opacity-80 mb-8">开启智能物流服务</p>
          
            
          
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import CommonHeader from '@/components/layout/CommonHeader.vue'
import { ref } from 'vue';
// import {
//   Monitor,
//   Box,
//   Service,
//   MessageBox,
//   Shop,
//   TrendCharts,
//   Headset,
//   ArrowRightBold,
// } from '@element-plus/icons-vue';
import { Plus, ArrowRight, Box, Search, User, Lock } from '@element-plus/icons-vue';
const warehouseImage = 'https://ai-public.mastergo.com/ai/img_res/a68e4f6d0fc21bcce90156ffec5372c6.jpg';
const services = ref([
{ name: 'QC 质检', icon: Search },
{ name: '智能打包', icon: Box },
{ name: '客户管理', icon: User },
{ name: '物流保险', icon: Lock },
]);

const router = useRouter();


</script>

<style lang="less" scoped>
.background-color {
      background-color: #e0e0e0;
    }
.el-icon-margin-top {
  margin-top: 5px;
}
</style>
