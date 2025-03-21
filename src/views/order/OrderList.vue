<template>
  <div class="order-list">
    <!-- 订单状态流程 -->
    <div class="order-flow">
      <div
        v-for="item in flowItems"
        :key="item.status"
        class="flow-item"
        :class="{ active: item.status === status }"
        @click="handleFlowItemClick(item.status)"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}({{ item.count }})</span>
      </div>
    </div>

    <!-- 搜索工具栏 -->
    <div class="search-toolbar">
      <el-button>{{ $t("order.toolbar.starred") }}</el-button>
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
      <el-button>{{ $t("order.toolbar.shared") }}</el-button>
    </div>

    <!-- 订单列表 -->
    <div class="order-list-content">
      <el-table :data="orders" style="width: 100%" stripe>
        <el-table-column prop="userNo" label="客户编码" width="100" />
        <el-table-column prop="userNo" label="客户信息" width="300">
          <template #default="{ row }">
            <div class="user-info">
              <div>
                <div>姓名：{{ row.userAddressInfo.firstName }}</div>
                <div>邮编：{{ row.userAddressInfo.postcode }}</div>
                <div>手机号：{{ row.userAddressInfo.mobile }}</div>
                <div>邮箱：{{ row.userAddressInfo.email }}</div>
              </div>
              <div>
                <div>地址：{{ row.userAddressInfo.address }}</div>
                <div>城市：{{ row.userAddressInfo.cityName }}</div>
                <div>省份：{{ row.userAddressInfo.provinceName }}</div>
                <div>国家：{{ row.userAddressInfo.countryName }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="logisticsNumber" label="快递信息" >
          <template #default="{ row }">
            <span>快递单号：{{ row.logisticsNumber }}</span>
            <div>物流轨迹：{{ row.trackingList[0]?.logisticsDesc }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="创建日期" width="100" />
        <el-table-column label="最新状态" width="100">
          <template #default="{ row }">
            <el-button
              type="text"
              :icon="row.isStarred ? 'el-icon-star-on' : 'el-icon-star-off'"
              class="star-btn"
            >
              {{ row.status }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <div class="total">共 {{ total }} 条</div>
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50]"
        :total="total"
        layout="prev, pager, next, sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { allOrderList } from "@/api/orderList";

interface Order {
  id: number;
  trackingNo: string;
  customerCode: string;
  createdAt: string;
  latestTracking: string;
  isStarred: boolean;
  shareCount: number;
}

interface SearchForm {
  userNo: string;
  customerCode: string;
  trackingNumber: string;
  isMark: 0;
}

interface FlowItem {
  status: number;
  icon: string;
  label: string;
  count: number;
}

export default defineComponent({
  name: "OrderList",
  setup() {
    // 分页状态
    const pagination = reactive({
      currentPage: 1,
      pageSize: 10,
    });

    // 搜索表单
    const searchForm = reactive({
      userNo: "",
      customerCode: "",
    });

    // 订单列表
    const orders = ref<Order[]>([]);
    const total = ref(0);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // 当前状态
    const status = ref(1);

    // 流程项数据
    // 状态：-1已取消、0已录入、1已QC、2已发货、3已签收、4退货
    const flowItems = ref<FlowItem[]>([
      { status: 1, icon: "icon-all", label: "全部", count: 107 },
      { status: 0, icon: "icon-recorded", label: "已记录", count: 45 },
      { status: 1, icon: "icon-qc", label: "质检中", count: 23 },
      { status: 2, icon: "icon-shipped", label: "已发货", count: 35 },
      { status: 3, icon: "icon-received", label: "已签收", count: 18 },
    ]);

    // 加载订单列表
    const loadOrders = async () => {
      try {
        loading.value = true;
        error.value = null;

        let params:any = {
          pageNo: pagination.currentPage,
          pageSize: pagination.pageSize,
          ...searchForm,
        };
        if(status.value !== 1){
          params.status = status.value;
        }

        const result = await allOrderList.getOrderList(params);
        orders.value = result.data;
        total.value = result.total;
      } catch (err) {
        error.value = err.message || "获取订单失败";
        ElMessage.error("获取订单列表失败");
      } finally {
        loading.value = false;
      }
    };

    // 分页事件处理
    const handleSizeChange = (val: number) => {
      pagination.pageSize = val;
      loadOrders();
    };

    const handleCurrentChange = (val: number) => {
      pagination.currentPage = val;
      loadOrders();
    };
    // 处理流程项点击事件
    const handleFlowItemClick = (newStatus: number) => {
      status.value = newStatus;
      // 根据状态加载对应订单数据
      loadOrders();
    };

    // 组件挂载时加载数据
    loadOrders();

    return {
      searchForm,
      orders,
      total,
      pagination,
      status,
      flowItems,
      handleSizeChange,
      handleCurrentChange,
      handleFlowItemClick,
    };
  },
});
</script>

<style scoped>
.order-list {
  padding: 20px;
}
.user-info{
  display: flex;
  align-items: center;
  width: 300px;
  word-break: break-all;
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
  color: #409eff;
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
  color: #409eff;
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

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  padding: 10px 20px;
}
</style>