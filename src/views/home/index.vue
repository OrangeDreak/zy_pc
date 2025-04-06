<template>
  <div class="estima">
    <!-- 使用公共头部 -->
    <common-header />
    <div class="content">

      <div class="relative h-[600px] overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent">
        <img src="https://ai-public.mastergo.com/ai/img_res/119612b2d8b89d3f2915c01200e9ba61.jpg" class="w-full h-full object-cover object-center" alt="Warehouse">
      </div>
      <div class="relative z-10 flex items-center h-full max-w-7xl mx-auto px-8">
        <div class="max-w-2xl text-white">
          <h1 class="text-5xl font-bold mb-6">智能仓储管理系统</h1>
          <p class="text-xl mb-8">打造数字化智能仓储解决方案，提升仓储效率，降低运营成本</p>
          <div class="flex space-x-4">
            <button class="px-8 py-3 bg-white/20 text-white hover:bg-white/30 transition-colors !rounded-button whitespace-nowrap use-rightNow" @click="$router.push('/add-transfer')">立即体验 <el-icon><ArrowRightBold /></el-icon></button>
          </div>
        </div>
      </div>
    </div>

    <div class="py-20 px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-4">服务介绍</h2>
        <p class="text-gray-600">全方位的仓储管理解决方案，助力企业数字化转型</p>
      </div>

      <div class="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
        <el-card v-for="(service, index) in services" :key="index" class="service-card" :body-style="{ padding: '2rem' }">
          <div class="text-center">
            <div class="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
              <el-icon :size="24" class="text-white">
                <component :is="service.icon" />
              </el-icon>
            </div>
            <h3 class="text-xl font-bold mb-4">{{ service.title }}</h3>
            <p class="text-gray-600">{{ service.description }}</p>
          </div>
        </el-card>
      </div>
    </div>

    <div class="bg-white py-20 px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">为什么选择我们</h2>
          <p class="text-gray-600">专业的团队，先进的技术，优质的服务</p>
        </div>

        <div class="grid grid-cols-3 gap-8">
          <el-card v-for="(feature, index) in features" :key="index" :body-style="{ padding: '2rem' }">
            <el-icon :size="40" class="text-primary mb-4">
              <component :is="feature.icon" />
            </el-icon>
            <h3 class="text-xl font-bold mb-4">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </el-card>
        </div>
      </div>
    </div>


    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import CommonHeader from '@/components/layout/CommonHeader.vue'
import { ref } from 'vue';
import {
  Monitor,
  Box,
  Service,
  MessageBox,
  Shop,
  TrendCharts,
  Headset,
  ArrowRightBold,
} from '@element-plus/icons-vue';

const router = useRouter();
const services = ref([
  {
    icon: Monitor,
    title: '仓库导览',
    description: '智能化仓储空间管理，实时监控库存状态'
  },
  {
    icon: Service,
    title: '质量控制',
    description: '全流程质量把控，确保货物完整性'
  },
  {
    icon: Box,
    title: '智能打包',
    description: '自动化包装系统，提高作业效率'
  },
  {
    icon: MessageBox,
    title: '货物保险',
    description: '全面的保险方案，保障货物安全'
  }
]);

const features = ref([
  {
    icon: Shop,
    title: '智能化管理',
    description: '采用人工智能技术，实现仓储全流程自动化管理'
  },
  {
    icon: TrendCharts,
    title: '数据分析',
    description: '深度数据分析，助力企业决策优化'
  },
  {
    icon: Headset,
    title: '7×24 小时服务',
    description: '专业团队全天候在线，随时解决您的问题'
  }
]);


</script>

<style lang="less" scoped>
.use-rightNow{
  width: 200px;
  height: 60px;
  background-color: #c803be;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.service-card {
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.gradient-bg {
  background: linear-gradient(135deg, #c803be 0%, #f95bf1 100%);
}
.text-white{
  color: #fff;
}
:deep(.el-button) {
  font-weight: normal;
}

:deep(.el-button--primary) {
  background-color: #8B5CF6;
  border-color: #8B5CF6;
}

:deep(.el-button--primary:hover) {
  background-color: #A78BFA;
  border-color: #A78BFA;
}

:deep(.el-header) {
  padding: 0;
}

:deep(.el-footer) {
  padding: 0;
}

:deep(.el-card) {
  border: 1px solid #f0f0f0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
}
</style>
