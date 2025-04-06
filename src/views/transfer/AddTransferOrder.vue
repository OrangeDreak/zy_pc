<template>
  <div class="add-transfer">
    <!-- 使用公共头部 -->
    <common-header />

    <div class="content">
      <!-- 页面标题 -->
      <div class="page-header">
        <div class="title">{{ $t('transfer.addOrder.title') }}</div>
        <el-link type="primary" @click="$router.push('/orders')"
          >{{ $t('transfer.addOrder.backToList') }}</el-link
        >
      </div>

      <!-- 仓库地址信息 -->
      <div class="section warehouse-section">
        <div class="section-title">{{ $t('transfer.addOrder.warehouse.title') }}</div>
        <div class="section-content">
          <el-link type="primary" @click="getWarehouseAddress">
            {{ $t('transfer.addOrder.warehouse.getAddress') }}
          </el-link>
        </div>
        <div class="section-tip">
          <el-alert type="warning" :closable="false" show-icon>
            {{ $t('transfer.addOrder.warehouse.tip') }}
          </el-alert>
        </div>
      </div>

      <!-- 转运订单列表 -->
      <div v-for="(order, orderIndex) in orders" :key="orderIndex" class="order-group">
        <div class="order-header">
          <div class="order-title">转运订单 #{{orderIndex + 1}}</div>
          <el-button 
            type="danger" 
            link 
            @click="removeOrder(orderIndex)"
            v-if="orders.length > 1"
          >
            删除此订单
          </el-button>
        </div>

        <div class="order-content">
          <!-- 寄送信息 -->
          <div class="info-section">
            <div class="section-title">{{ $t('transfer.addOrder.form.title') }}</div>
            <div class="section-content">
              <el-form :model="order" label-width="120px">
                <el-form-item :label="$t('transfer.addOrder.form.customCode')" required>
                  <el-select
                    v-model="order.userNo"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入关键词搜索"
                    :remote-method="remoteSearchCustomCode"
                    :loading="customCodeLoading"
                    @change="handleUserNoChange(orderIndex)"
                    class="custom-code-select"
                  >
                    <el-option
                      v-for="item in customCodeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                    <template #prefix>
                      <el-icon><Search /></el-icon>
                    </template>
                  </el-select>
                  <el-button type="primary" plain @click="showCustomCodeHelp">
                    {{ $t('transfer.addOrder.form.customCodeHelp') }}
                  </el-button>
                  <el-tooltip content="编码说明" placement="top" class="custom-code-help">
                    <el-icon><QuestionFilled /></el-icon>
                  </el-tooltip>
                </el-form-item>

                <el-form-item :label="$t('transfer.addOrder.form.recentAddress')">
                  <div class="recent-address">
                    <span class="address-text">{{
                      order.recentAddress || $t('transfer.addOrder.form.noAddress')
                    }}</span>
                    <el-button
                      v-if="order.userNo"
                      type="primary"
                      link
                      class="add-address-btn"
                      @click="showAddressForm(orderIndex)"
                    >
                      {{order.userAddressId ?  $t('transfer.addOrder.form.editAddress') : $t('transfer.addOrder.form.addAddress') }}
                      <el-tooltip content="地址说明" placement="top">
                        <el-icon class="address-help"><QuestionFilled /></el-icon>
                      </el-tooltip>
                    </el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <!-- 快递单号列表 -->
          <div class="info-section">
            <div class="section-title">{{ $t('transfer.addOrder.form.expressTitle') }}</div>
            <div class="section-content">
              <div
                v-for="(item, index) in order.trackingInfoList"
                :key="index"
                class="express-item"
              >
                <el-input
                  v-model="item.trackingNumber"
                  :placeholder="$t('transfer.addOrder.form.trackingNumber')"
                />
                <el-input
                  v-model="item.price"
                  :placeholder="$t('transfer.addOrder.form.value')"
                />
                <!-- <el-upload
                  class="upload-area"
                  action="#"
                  :auto-upload="false"
                  :show-file-list="false"
                  @change="(event) => handleImageUpload(event, orderIndex, index)"
                >
                  <el-button type="primary" plain>
                    <el-icon><Camera /></el-icon>
                    {{ $t('transfer.addOrder.form.photo') }}
                  </el-button>
                </el-upload> -->
                <el-button
                  type="danger"
                  link
                  @click="removeExpressItem(orderIndex, index)"
                  v-if="order.trackingInfoList.length > 1"
                >
                  删除
                </el-button>
              </div>

              <div class="add-express">
                <el-button
                  type="primary"
                  plain
                  class="add-btn"
                  @click="addExpressItem(orderIndex)"
                >
                  <el-icon><Plus /></el-icon>
                  {{ $t('transfer.addOrder.form.addExpress') }}
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 添加新的转运订单按钮 -->
      <div class="add-order-section">
        <el-button
          type="primary"
          plain
          class="add-order-btn"
          @click="addNewOrder"
        >
          <el-icon><Plus /></el-icon>
          添加新的转运订单
        </el-button>
      </div>

      <!-- 提交按钮 -->
      <div class="submit-section">
        <el-button type="primary" :loading="loading" @click="handleSubmit">
          {{ $t('transfer.addOrder.form.submit') }}
        </el-button>
      </div>
    </div>

    <!-- 地址表单对话框 -->
    <address-form v-model="showAddress" :subCode="orders[currentOrderIndex].userNo" :formData="orders[currentOrderIndex]" @submit="handleAddressSubmit" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import {
  ArrowDown,
  QuestionFilled,
  Camera,
  Plus,
  Search,
} from '@element-plus/icons-vue';
import AddressForm from './AddressForm.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import CommonHeader from '@/components/layout/CommonHeader.vue'
import { transfer } from '@/api/transfer'

const router = useRouter();
const authStore = useAuthStore();

const currentTime = ref('');
const loading = ref(false);
const showAddress = ref(false);
const currentOrderIndex = ref(0);

// 自定义编码搜索相关
const customCodeLoading = ref(false);
const customCodeOptions = ref([]);

// 模拟远程搜索方法
const remoteSearchCustomCode = async (query) => {
  if (query) {
    customCodeLoading.value = true;
    try {
      // TODO: 替换为实际的API调用
      const response = await transfer.subUserList({
        userNo: query,
        pageSize: 100,
        pageNo: 1,
      });
      // 搜索结果
      customCodeOptions.value = response.data.map((item)=>{
        return {
          ...item,
          value: item.userNo,
          label: item.userNo,
        }
      });
    } catch (error) {
      console.error('搜索失败:', error);
      ElMessage.error('搜索失败');
    } finally {
      customCodeLoading.value = false;
    }
  } else {
    customCodeOptions.value = [];
  }
};
const handleUserNoChange= (orderIndex)=>{
  console.log(orders.value[orderIndex].userNo)
  // this.handleAddressSubmit();
  customCodeOptions.value.map((item)=>{
    if(item.value === orders.value[orderIndex].userNo){
      orders.value[orderIndex].recentAddress = `${item.userAddressInfo.firstName}, ${item.userAddressInfo.address}, ${item.userAddressInfo.mobile}`;
      orders.value[orderIndex].userAddressInfo = item.userAddressInfo;
      orders.value[orderIndex].userAddressId = item.userAddressInfo.id;
    }
  })
};

const createNewOrder = () => ({
  userNo: '',
  recentAddress: '',
  userAddressId: '',
  userAddressInfo: {},
  trackingInfoList: [
    {
      trackingNumber: '',
      price: '',
      images: [],
    },
  ],
});

// 订单列表
const orders = ref([createNewOrder()]);
// 更新时间
const updateTime = () => {
  const now = new Date();
  currentTime.value = now
    .toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\//g, '-');
};

let timer = null;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
  if (!authStore.token) {
    router.push('/login')
  }
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});

// 获取仓库地址
const getWarehouseAddress = () => {
  ElMessage.info('请联系在线客服获取仓库地址');
};
const showCustomCodeHelp = async() =>{
  try {
    const response = await transfer.getCustomCode();
    orders.value[currentOrderIndex.value].userNo = response.data;
    orders.value[currentOrderIndex.value].recentAddress = '';
    orders.value[currentOrderIndex.value].userAddressInfo = {};
    orders.value[currentOrderIndex.value].userAddressId = '';
  } catch (error) {
    ElMessage.error('获取自定义编码失败');
  }
};
// 显示地址表单
const showAddressForm = (orderIndex) => {
  currentOrderIndex.value = orderIndex;
  showAddress.value = true;
};

// 处理地址提交
const handleAddressSubmit = (address) => {
  orders.value[currentOrderIndex.value].recentAddress = `${address.name}, ${address.address}, ${address.mobile}`;
  orders.value[currentOrderIndex.value].userAddressInfo = address;
  showAddress.value = false;
};

// 添加快递单号
const addExpressItem = (orderIndex) => {
  orders.value[orderIndex].trackingInfoList.push({
    trackingNumber: '',
    price: '',
    images: [],
  });
};

// 删除快递单号
const removeExpressItem = (orderIndex, itemIndex) => {
  if (orders.value[orderIndex].trackingInfoList.length > 1) {
    orders.value[orderIndex].trackingInfoList.splice(itemIndex, 1);
  }
};

// 处理图片上传
const handleImageUpload = (file, orderIndex, itemIndex) => {
  // TODO: 处理图片上传
  ElMessage.success('图片上传功能待实现');
};

// 提交表单
const handleSubmit = async () => {
  loading.value = true;
  try {
    // TODO: 调用提交API，提交整个orders数组
    console.log('提交的订单数据:', orders.value);
    const params = {};
    params.transportDataList = orders.value;
    await transfer.submitTpOrder(params);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    ElMessage.success('提交成功');
    // 提交成功后重置表单
    orders.value = [createNewOrder()];
  } catch (error) {
    console.error('提交失败:', error);
    ElMessage.error('提交失败');
  } finally {
    loading.value = false;
  }
};

// 添加新的转运订单
const addNewOrder = () => {
  orders.value.push(createNewOrder());
};

// 删除转运订单
const removeOrder = (orderIndex) => {
  if (orders.value.length > 1) {
    orders.value.splice(orderIndex, 1);
  }
};
</script>

<style lang="less" scoped>
@import '@/styles/variables.less';

.add-transfer {
  padding-top: 60px;
  min-height: 100vh;
  // background: linear-gradient(135deg, @primary-bg 0%, @primary-lighter 100%);

  .content {
    margin: 60px auto 0;
    max-width: 1200px;
    padding: 20px;
    animation: fadeIn 0.3s ease-in-out;

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding: 0 10px;

      .title {
        font-size: 28px;
        font-weight: bold;
        color: @primary-color;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      }
    }

    .section {
      background: #fff;
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 25px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border: 2px solid rgba(0, 0, 0, 0.08);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      }

      .section-title {
        font-size: 20px;
        font-weight: bold;
        color: @text-primary;
        margin-bottom: 25px;
        padding-left: 15px;
        border-left: 4px solid @primary-color;
        display: flex;
        align-items: center;
      }

      .section-content {
        padding: 0 15px;
      }

      .section-tip {
        margin-top: 20px;
      }

      .recent-address {
        display: flex;
        align-items: center;
        gap: 25px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 8px;

        .address-text {
          color: @text-regular;
          flex: 1;
        }

        .address-help {
          margin-left: 5px;
          font-size: 14px;
        }
      }

      .express-item {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
        align-items: flex-start;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
          background: #f0f2f5;
        }

        .el-input {
          width: 250px;
        }

        .upload-area {
          .el-button {
            height: 40px;
          }
        }
      }

      .add-express {
        padding: 25px 0;
        display: flex;
        justify-content: center;

        .add-btn {
          width: 220px;
          height: 45px;
          border-style: dashed;
          border-width: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-2px);
          }
        }
      }
    }

    .submit-section {
      text-align: center;
      margin-top: 40px;
      margin-bottom: 30px;

      .el-button {
        width: 220px;
        height: 48px;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 1px;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
        }
      }
    }
  }

  :deep(.el-button--primary) {
    background-color: @primary-color;
    border-color: @primary-color;

    &:hover {
      background-color: darken(@primary-color, 8%);
      border-color: darken(@primary-color, 8%);
    }

    &.is-plain {
      background-color: #fff;
      color: @primary-color;

      &:hover {
        background-color: mix(@primary-color, #fff, 8%);
        border-color: @primary-color;
      }
    }
  }

  :deep(.el-link.el-link--primary) {
    color: @primary-color;
    transition: all 0.3s ease;

    &:hover {
      color: darken(@primary-color, 10%);
    }
  }
}
.add-address-btn{
  color: #fff;
}
.order-group {
  margin-bottom: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 2px solid rgba(0, 0, 0, 0.08);

  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    padding: 0 15px;
    
    .order-title {
      font-size: 24px;
      font-weight: bold;
      color: @primary-color;
      display: flex;
      align-items: center;
      gap: 10px;

      &::before {
        content: '';
        display: block;
        width: 4px;
        height: 24px;
        background: @primary-color;
        border-radius: 2px;
      }
    }
  }

  .order-content {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    overflow: hidden;

    .info-section {
      padding: 25px;
      position: relative;

      &:not(:last-child)::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 25px;
        right: 25px;
        height: 1px;
        background: linear-gradient(to right, transparent, #e0e0e0, transparent);
      }

      .section-title {
        font-size: 18px;
        font-weight: 600;
        color: @text-primary;
        margin-bottom: 20px;
        padding-left: 12px;
        border-left: 3px solid @primary-color;
      }

      .section-content {
        padding: 0 12px;
      }

      .recent-address {
        display: flex;
        align-items: center;
        gap: 25px;
        padding: 12px 15px;
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #ebeef5;

        .address-text {
          color: @text-regular;
          flex: 1;
        }

        .address-help {
          margin-left: 5px;
          font-size: 14px;
        }
      }

      .express-item {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
        align-items: flex-start;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #ebeef5;
        transition: all 0.3s ease;

        &:hover {
          background: #f0f2f5;
          border-color: #dcdfe6;
        }

        .el-input {
          width: 250px;
        }

        .upload-area {
          .el-button {
            height: 40px;
          }
        }
      }

      .add-express {
        padding: 20px 0 5px;
        display: flex;
        justify-content: center;

        .add-btn {
          width: 220px;
          height: 45px;
          border-style: dashed;
          border-width: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-2px);
          }
        }
      }
    }
  }
}

.add-order-section {
  text-align: center;
  margin: 40px 0;
  padding: 0 20px;

  .add-order-btn {
    margin: 0 auto;
    width: 280px;
    height: 50px;
    border-style: dashed;
    border-width: 2px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    }

    .el-icon {
      font-size: 20px;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-code-select {
  width: 100%;
  max-width: 400px;
  margin-right: 10px;

  :deep(.el-input__prefix) {
    color: #909399;
  }
}

.custom-code-help {
  margin-left: 10px;
  color: #909399;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: @primary-color;
  }
}
</style>
