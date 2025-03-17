<template>
  <div class="order-list">
    <!-- 订单状态流程 -->
    <div class="order-flow">
      <div class="flow-item" :class="{ active: true }">
        <i class="icon-all"></i>
        <span>{{ $t('order.flow.all') }}(107)</span>
      </div>
      <div class="flow-item">
        <i class="icon-recorded"></i>
        <span>{{ $t('order.flow.recorded') }}(45)</span>
      </div>
      <div class="flow-item">
        <i class="icon-qc"></i>
        <span>{{ $t('order.flow.qc') }}(23)</span>
      </div>
      <div class="flow-item">
        <i class="icon-shipped"></i>
        <span>{{ $t('order.flow.shipped') }}(35)</span>
      </div>
      <div class="flow-item">
        <i class="icon-received"></i>
        <span>{{ $t('order.flow.received') }}(18)</span>
      </div>
    </div>

    <!-- 搜索工具栏 -->
    <div class="search-toolbar">
      <el-button>{{ $t('order.toolbar.starred') }}</el-button>
      <el-input
        v-model="searchForm.trackingNo"
        :placeholder="$t('order.toolbar.trackingSearch')"
        class="search-input"
      ></el-input>
      <el-input
        v-model="searchForm.customerCode"
        :placeholder="$t('order.toolbar.customerSearch')"
        class="search-input"
      ></el-input>
      <el-button>{{ $t('order.toolbar.shared') }}</el-button>
    </div>

    <!-- 订单列表 -->
    <div class="order-list-content">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <div class="tracking-no">
            {{ $t('order.card.trackingNo') }}：{{ order.trackingNo }}
            <el-button type="text" icon="el-icon-edit"></el-button>
          </div>
          <el-button 
            type="text" 
            :icon="order.isStarred ? 'el-icon-star-on' : 'el-icon-star-off'"
            class="star-btn"
          >
            {{ $t('order.card.star') }}
          </el-button>
        </div>
        <div class="order-info">
          <div class="info-item">
            <span class="label">{{ $t('order.card.customerCode') }}：</span>
            <span>{{ order.customerCode }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('order.card.recordDate') }}：</span>
            <span>{{ order.createdAt }}</span>
          </div>
          <div class="info-item tracking-info">
            <span class="label">{{ $t('order.card.latestTracking') }}：</span>
            <span>{{ order.latestTracking }}</span>
          </div>
        </div>
        <div class="order-footer">
          <el-button type="primary" size="small">{{ $t('order.card.share') }}</el-button>
          <span class="share-count" v-if="order.shareCount">
            {{ $t('order.card.sharedTimes', { count: order.shareCount }) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { allOrderList } from '@/api/orderList'

interface Order {
  id: number
  trackingNo: string
  customerCode: string
  createdAt: string
  latestTracking: string
  isStarred: boolean
  shareCount: number
}

interface SearchForm {
  userNo: string
  customerCode: string
  trackingNumber: string
  isMark: 0
}
const fetchOrderList = async (searchParams: SearchForm) => {
  try {
    // 调用获取订单接口，并传入搜索参数
    const response = await allOrderList.getOrderList({
      userNo: searchParams.userNo,
      customerCode: searchParams.customerCode
      // 可添加其他接口需要的参数
    })
    // return response;
    // 转换接口返回的数据结构（根据实际接口字段调整）
    return response.map(item => ({
      id: item.id,
      trackingNo: item.logisticsNumber,  // 假设接口返回字段为 trackingNumber
      customerCode: item.userNo,
      createdAt: item.createTime,  // 需要日期格式化函数
      // latestTracking: formatTracking(item.trackingInfo),  // 需要物流信息处理
      isStarred: item.starred,
      shareCount: item.shareCount
    }))
  } catch (error) {
    console.error('获取订单列表失败:', error)
    ElMessage.error('获取订单列表失败')
    throw error  // 抛出错误以便组件层处理
  }
}


export default defineComponent({
  name: 'OrderList',
  data() {
    return {
      searchForm: {
        userNo: '',
        customerCode: '',
      } as SearchForm,
      orders: [] as Order[],  // 初始化为空数组
      loading: false,         // 新增加载状态
      error: null as string | null  // 新增错误状态
    }
  },
  methods: {
    async loadOrders() {
      try {
        this.loading = true
        this.error = null
        // 调用接口并更新订单数据
        const result = await fetchOrderList(this.searchForm)
        console.log(111, result);
        this.orders = result
      } catch (error) {
        this.error = error.message || '获取订单失败'
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    // 组件挂载时自动加载
    this.loadOrders()
  }
})
</script>

<style scoped>
.order-list {
  padding: 20px;
}

.order-flow {
  display: flex;
  margin-bottom: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.flow-item {
  display: flex;
  align-items: center;
  margin-right: 40px;
  color: #666;
}

.flow-item.active {
  color: #409EFF;
}

.search-toolbar {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.search-input {
  width: 200px;
}

.order-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.tracking-no {
  font-size: 16px;
  font-weight: bold;
}

.order-info {
  margin-bottom: 16px;
}

.info-item {
  margin-bottom: 8px;
}

.info-item .label {
  color: #666;
}

.tracking-info {
  color: #409EFF;
}

.order-footer {
  display: flex;
  align-items: center;
  gap: 12px;
}

.share-count {
  color: #666;
  font-size: 14px;
}
</style> 