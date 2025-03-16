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
  trackingNo: string
  customerCode: string
}

export default defineComponent({
  name: 'OrderList',
  data() {
    return {
      searchForm: {
        trackingNo: '',
        customerCode: '',
      } as SearchForm,
      orders: [
        {
          id: 1,
          trackingNo: '1234',
          customerCode: '1234',
          createdAt: 'xx年x月x日',
          latestTracking: 'x月x日，xxxxxx',
          isStarred: true,
          shareCount: 1
        },
        {
          id: 2,
          trackingNo: '5678',
          customerCode: '5678',
          createdAt: 'xx年x月x日',
          latestTracking: 'x月x日，xxxxxx',
          isStarred: false,
          shareCount: 0
        }
      ] as Order[]
    }
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