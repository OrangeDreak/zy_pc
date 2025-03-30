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
        <span>{{ item.label }}({{ countList[item.count] }})</span>
      </div>
    </div>

    <!-- 搜索工具栏 -->
    <div class="search-toolbar">
      <el-input
        v-model="searchForm.trackingNo"
        :placeholder="$t('order.toolbar.trackingSearch')"
        class="search-input"
      ></el-input>
      <el-input
        v-model="searchForm.userNo"
        :placeholder="$t('order.toolbar.customerSearch')"
        class="search-input"
      ></el-input>
      <el-button @click="handleSearch">{{$t('header.searchButton')}}</el-button>
      <el-button :type="searchForm.isMark? 'primary' : 'default'" @click="handleSearchMark">{{ $t("order.toolbar.starred") }}</el-button>
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
        <el-table-column prop="userNo" :label="$t('package.table.customerCode')" width="100" />
        <el-table-column prop="userNo" :label="$t('package.table.addressInfo')" width="320">
          <template #default="{ row }">
            <div class="user-info">
              <div>
                <div>{{$t('customers.info.name')}}：{{ row.userAddressInfo.firstName }}</div>
                <div>{{$t('customers.info.postcode')}}：{{ row.userAddressInfo.postcode }}</div>
                <div>{{$t('customers.info.phoneNumber')}}：{{ row.userAddressInfo.mobile }}</div>
                <div>{{$t('customers.info.email')}}：{{ row.userAddressInfo.email }}</div>
                <div>{{$t('customers.info.address')}}：{{ row.userAddressInfo.countryName }} {{ row.userAddressInfo.provinceName }} {{ row.userAddressInfo.cityName }} {{ row.userAddressInfo.address }}</div>
              </div>
              <!-- <div>
                <div>地址：{{ row.userAddressInfo.address }}</div>
                <div>城市：{{ row.userAddressInfo.cityName }}</div>
                <div>省份：{{ row.userAddressInfo.provinceName }}</div>
                <div>国家：{{ row.userAddressInfo.countryName }}</div>
              </div> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="logisticsNumber" :label="$t('package.table.expressDelivery')">
          <template #default="{ row }">
            <div>{{$t('trackingNumber')}}：{{ row.logisticsNumber }}</div>
            <el-popover :width="800">
              <template #reference>
                <div v-if="row.trackingList && row.trackingList.length > 0">
                  {{$t('logisticsTrack')}}：{{
                    row.trackingList && row.trackingList[0]?.logisticsDesc
                  }}
                </div>
              </template>
              <template #default> 
                <div class="timeline">
                  <el-timeline>
                    <el-timeline-item v-for="(item, index) in row.trackingList" :key="index" :timestamp="item.gmtTime" placement="top">
                      <p>{{ item.logisticsDesc }}</p>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </template>
            </el-popover>
            <div class="image-list">
              <div v-for="(url, index) in row.imgUrlList" :key="url" class="block">
                <el-image
                  class="image-list-item"
                  style="width: 60px; height: 60px"
                  close-on-press-escape
                  preview-teleported
                  :src="url"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="row.imgUrlList"
                  :initial-index="index"
                  z-index="8"
                  fit="cover"
                />
              </div>
              
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" :label="$t('commont.createTime')" width="100" />
        <el-table-column prop="statusDesc" :label="$t('package.table.latestStatus')" width="100">
          <template #default="{ row }">
            <el-tag>
              {{ row.statusDesc }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('commont.operation')" width="200" align="center">
          <template #default="{ row }">
            <div>
              <el-button
                type="text"
                :icon="row.isStarred ? 'el-icon-star-on' : 'el-icon-star-off'"
                class="star-btn"
                @click="handleStarClick(row)"
              >
                {{$t('commont.share')}}
              </el-button>

              <el-button
                type="text"
                :icon="row.isStarred ? 'el-icon-star-on' : 'el-icon-star-off'"
                class="star-btn"
                @click="handleMarkClick(row)"
              >
                {{ row.isMark ? "取消特别关注" : "特别关注" }}
              </el-button>
              <!-- <el-button
                v-if="row.status === 1"
                type="text"
                :icon="row.isStarred ? 'el-icon-star-on' : 'el-icon-star-off'"
                class="star-btn"
              >
                退货
              </el-button> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="status === 1" class="btn-box">
      <!-- <el-button @click="handleEstimate">一键估算运费</el-button> -->
      <el-button type="primary" @click="handleSendSubmit">一键发货</el-button>
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
import { defineComponent, onMounted, reactive, ref, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import { allOrderList, getOrderCount } from "@/api/orderList";
import { useRouter, useRoute } from 'vue-router';

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
  count: string;
}

export default defineComponent({
  name: "OrderList",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    // 分页状态
    const pagination = reactive({
      currentPage: 1,
      pageSize: 10,
    });

    // 搜索表单
    const searchForm = reactive({
      userNo: "",
      trackingNo: "",
      isMark: 0,
    });

    // 订单列表
    const orders = ref<Order[]>([]);
    const total = ref(0);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const countList = ref({});
    // 当前状态
    const status = ref(-1);
    const selectedOrders = ref([]);

    // 流程项数据
    // 状态：-1已取消、0已录入、1已QC、2已发货、3已签收、4退货
    const flowItems = ref<FlowItem[]>([
      { status: -1, icon: "icon-all", label: proxy.$t('package.status.all'), count: 'allOrder' },
      { status: 0, icon: "icon-recorded", label: proxy.$t('package.status.recorded'), count: 'enterCount' },
      { status: 1, icon: "icon-qc", label: proxy.$t('package.status.qc'), count: 'qcCount' },
      { status: 2, icon: "icon-shipped", label: proxy.$t('package.status.shipped'), count: 'sendCount' },
      { status: 3, icon: "icon-received", label: proxy.$t('package.status.received'), count: 'signCount' },
    ]);
    // 在组件挂载时获取路由参数
    onMounted(() => {
      if(route.query.userNo){
        searchForm.userNo = route.query.userNo as string; // 获取userNo参数
      }
      loadOrders();
    });
    const handleSelectionChange = async (selected) => {
      selectedOrders.value = selected;
    };
    const handleEstimate = async () => {
        router.push("/estimate");
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
        if (!params.isMark) {
          delete params.isMark;
        }
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
    const handleSearch = () => {
      loadOrders();
    };
    const handleSearchMark = () => {
      searchForm.isMark = searchForm.isMark ? 0 : 1;
      loadOrders();
    };
    const getCountList = async() => {
      try {
        const res =  await allOrderList.getOrderCount();
        countList.value = res.data;
      } catch (error) {
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
    getCountList();

    return {
      searchForm,
      orders,
      total,
      pagination,
      status,
      flowItems,
      selectedOrders,
      countList,
      handleSizeChange,
      handleCurrentChange,
      handleFlowItemClick,
      handleStarClick,
      handleMarkClick,
      handleSelectionChange,
      handleSendSubmit,
      handleEstimate,
      getCountList,
      handleSearch,
      handleSearchMark,
    };
  },
});
</script>

<style lang="less" scoped>
.order-list {
  padding: 20px;
}
.timeline{
  height: 350px;
  overflow: scroll;
}
.image-list{
  display: flex;
  .image-list-item{
    width: 100px;
    margin-right: 8px;
    border-radius: 8px;
  }
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
  min-width: 300px;
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