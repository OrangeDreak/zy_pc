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
      <el-button>搜索</el-button>
    </div>

    <!-- 订单列表 -->
    <div class="order-list-content">
      <el-table
        :data="orders"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        stripe
      >
        <!-- 选择列 -->
        <el-table-column v-if="status === 1" type="selection" width="55" />
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
        <el-table-column prop="logisticsNumber" label="快递信息">
          <template #default="{ row }">
            <span>快递单号：{{ row.logisticsNumber }}</span>
            <div>
              物流轨迹：{{
                row.trackingList && row.trackingList[0]?.logisticsDesc
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="创建日期" width="100" />
        <el-table-column prop="statusDesc" label="最新状态" width="100">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <div>
              <el-button
                type="text"
                :icon="row.isStarred ? 'el-icon-star-on' : 'el-icon-star-off'"
                class="star-btn"
                @click="handleStarClick(row)"
              >
                分享
              </el-button>

              <el-button
                v-if="row.status === 0"
                type="text"
                :icon="row.isStarred ? 'el-icon-star-on' : 'el-icon-star-off'"
                class="star-btn"
                @click="handleMarkClick(row)"
              >
                {{ row.isMark ? "取消特别关注" : "特别关注" }}
              </el-button>
              <el-button
                v-if="row.status === 1"
                type="text"
                :icon="row.isStarred ? 'el-icon-star-on' : 'el-icon-star-off'"
                class="star-btn"
              >
                退货
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="status === 1" class="btn-box">
      <el-button>一键估算运费</el-button
      ><el-button type="primary" @click="handleSendSubmit">一键发货</el-button>
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
import { defineComponent, reactive, ref, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import { allOrderList } from "@/api/orderList";
import { useRouter } from 'vue-router';

interface Order {
  id: number;
  trackingNo: string;
  userNo: string;
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
    const router = useRouter();
    const { proxy } = getCurrentInstance();
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
    const status = ref(-1);
    const selectedOrders = ref([]);

    // 流程项数据
    // 状态：-1已取消、0已录入、1已QC、2已发货、3已签收、4退货
    const flowItems = ref<FlowItem[]>([
      { status: -1, icon: "icon-all", label: "全部", count: 107 },
      { status: 0, icon: "icon-recorded", label: "已录入", count: 45 },
      { status: 1, icon: "icon-qc", label: "已QC", count: 23 },
      { status: 2, icon: "icon-shipped", label: "已发货", count: 35 },
      { status: 3, icon: "icon-received", label: "已签收", count: 18 },
    ]);
    const handleSelectionChange = async (selected) => {
      selectedOrders.value = selected;
    };
    const handleSendSubmit = async () => {
      if (selectedOrders.value.length === 0) {
        ElMessage.error(proxy.$t("order.orderSelectTip"));
        return;
      }
      let userNo = selectedOrders.value[0].userNo;
      let sameUser = true;
      selectedOrders.value.forEach(item => {
         if (item.userNo !== userNo) {
            sameUser = false;
         }
      });
      if (!sameUser) {
         ElMessage.error(proxy.$t("order.orderNotSameUserTip"));
         return;
      }
      const ids = selectedOrders.value.map((item) => item.id);
      console.log(ids);

      sessionStorage.setItem("SubOrderIds", ids);
      router.push("/submit-transfer");
    };
    // 加载订单列表
    const loadOrders = async () => {
      try {
        loading.value = true;
        error.value = null;

        let params: any = {
          pageNo: pagination.currentPage,
          pageSize: pagination.pageSize,
          ...searchForm,
        };
        if (status.value > -1) {
          params.status = status.value;
        }
        let requestName = "getOrderList";
        if (status.value === 1) {
          params.status = status.value;
          // requestName = 'getQcOrderList';
          requestName = "getOrderList";
        }
        if (status.value === 2 || status.value === 3) {
          params.status = status.value;
          requestName = "myPackageOrderList";
        }
        const result = await allOrderList[requestName](params);
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
    // 处理mark点击事件
    const handleMarkClick = async (order: any) => {
      const { data } = await allOrderList.updateAttentionMark({
        tpSubOrderId: order.id,
        isMark: order.isMark ? 0 : 1,
      });
      ElMessage.success(`标记订单：${order.trackingNo}`);
      loadOrders();
    };
    // 处理share点击事件
    const handleStarClick = async (order: Order) => {
      const { data } = await allOrderList.getSharingCode({
        userNo: order.userNo,
        orderId: order.id,
      });
      console.log(2222, data);
      // 处理shareCount点击事件
      ElMessage.success(`分享订单：${order.trackingNo}`);
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
      selectedOrders,
      handleSizeChange,
      handleCurrentChange,
      handleFlowItemClick,
      handleStarClick,
      handleMarkClick,
      handleSelectionChange,
      handleSendSubmit,
    };
  },
});
</script>

<style scoped>
.order-list {
  padding: 20px;
}
.btn-box {
  padding-top: 20px;
  display: flex;
  align-content: center;
  justify-content: end;
}
.user-info {
  display: flex;
  align-items: center;
  width: 300px;
  word-break: break-all;
}
.order-flow {
  display: flex;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 8px;
}

.flow-item {
  display: flex;
  align-items: center;
  color: #666;
  padding: 20px;
}

.flow-item.active {
  color: #c803be;
  background: #fcf2fc;
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