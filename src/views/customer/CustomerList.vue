<template>
    <div class="order-list">
  
      <!-- 搜索工具栏 -->
      <div class="search-toolbar">
        <el-input
          v-model="searchForm.userNo"
          :placeholder="$t('order.toolbar.customerSearch')"
          class="search-input"
        ></el-input>
        <el-button @click="handleSearch">搜索</el-button>
        <el-button 
          type="primary" 
          link 
          class="new-address"
          @click="handleAddAddress"
        >
          新增用户地址信息
          <el-tooltip content="地址信息说明" placement="top">
            <el-icon class="address-help"><QuestionFilled /></el-icon>
          </el-tooltip>
        </el-button>
      </div>
  
      <!-- 订单列表 -->
      <div class="order-list-content">
        <el-table :data="customers" style="width: 100%" stripe>
          <el-table-column prop="userNo" label="客户编码" width="100" />
          <el-table-column prop="userNo" label="客户信息">
            <template #default="{ row }">
              <div class="user-info">
                <div>
                  <div>姓名：{{ row.userAddressInfo.firstName }}</div>
                  <div>邮编：{{ row.userAddressInfo.postcode }}</div>
                  <div>手机号：{{ row.userAddressInfo.mobile }}</div>
                  <div>邮箱：{{ row.userAddressInfo.email }}</div>
                  <div>地址：{{ row.userAddressInfo.countryName }} {{ row.userAddressInfo.provinceName }} {{ row.userAddressInfo.cityName }} {{ row.userAddressInfo.address }}</div>
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
          <!-- <el-table-column prop="remark" label="备注" ></el-table-column> -->
          <el-table-column prop="orderCount" label="订单数" width="130" />
          <el-table-column prop="gmtCreate" label="添加日期" width="150" />
          <el-table-column prop="statusDesc" label="操作" width="130">
            <template #default="scope">
              <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                v-if="scope.row.orderCount"
                type="text"
                :icon="'el-icon-star-on'"
                class="star-btn"
                @click="handleStarClick(scope.row)"
              >
                分享
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
    <!-- 新增地址对话框 -->
    <AddressForm
      v-model="addressDialogVisible"
      :formData="formData"
      :subCode="formData.userNo"
      @submit="handleAddressSubmit"
    />
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive, ref } from "vue"
  import { ElMessage } from "element-plus"
  import { allCustomerList } from "@/api/customerList"
  import { allOrderList } from "@/api/orderList"
  import AddressForm from '../transfer/AddressForm.vue'
  
  interface Customer {
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
  }


  export default defineComponent({
    name: "CustomerList",
    components: {
      AddressForm
    },
    setup() {
      // 分页状态
      const pagination = reactive({
        currentPage: 1,
        pageSize: 10,
      });
  
      // 搜索表单
      const searchForm = reactive({
        userNo: "",
      });

      const addressDialogVisible = ref(false)

      // 订单列表
      const customers = ref<Customer[]>([]);
      const total = ref(0);
      const loading = ref(false);
      const error = ref<string | null>(null);
      const formData = ref({});
      
      // 加载订单列表
      const loadCustomers = async () => {
        try {
          loading.value = true;
          error.value = null;
  
          let params:any = {
            pageNo: pagination.currentPage,
            pageSize: pagination.pageSize,
            ...searchForm,
          };
          
          let requestName = 'getCustomerList';
          const result = await allCustomerList[requestName](params);
          customers.value = result.data;
          total.value = result.total;
        } catch (err) {
          error.value = err.message || "获取客户失败";
          ElMessage.error("获取客户列表失败");
        } finally {
          loading.value = false;
        }
      };
      
      // 添加搜索处理方法
      const handleSearch = () => {
        // 搜索时重置到第一页
        pagination.currentPage = 1;
        loadCustomers();
      };
      // 处理share点击事件
    const handleStarClick = async (row: any) => {
      const { data } = await allOrderList.getSharingCode({
        userNo: row.userNo,
        orderId: row.id,
      });

      // 处理shareCount点击事件
      ElMessage.success(`分享订单：${data.trackingNo}`);
    };
      // 添加地址
      const handleAddAddress = () => {
        formData.value = {};
        addressDialogVisible.value = true
      }

      const handleEdit = (customer: Customer) => {
        formData.value = customer;
        addressDialogVisible.value = true;
      }


      // 分页事件处理
      const handleSizeChange = (val: number) => {
        pagination.pageSize = val;
        loadCustomers();
      };
  
      const handleCurrentChange = (val: number) => {
        pagination.currentPage = val;
        loadCustomers();
      };

      
      // 处理地址提交
    const handleAddressSubmit = (address) => {
      //orders.value[currentOrderIndex.value].recentAddress = `${address.name}, ${address.address}, ${address.mobile}`;
      //orders.value[currentOrderIndex.value].userAddressInfo = address;
      //showAddress.value = false;
    };

      // 组件挂载时加载数据
      loadCustomers();

      
  
      return {
        searchForm,
        customers,
        total,
        pagination,
        formData,
        handleSizeChange,
        handleCurrentChange,
        handleSearch,
        handleAddAddress,
        addressDialogVisible,
        handleAddressSubmit,
        handleEdit,
        handleStarClick,
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
    /* margin-right: 40px; */
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