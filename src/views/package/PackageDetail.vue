<template>
  <div class="package-detail">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <el-link type="primary" @click="$router.push('/orders')">我的包裹</el-link>
      <el-icon><ArrowRight /></el-icon>
      <span>包裹详情</span>
    </div>

    <!-- 状态栏 -->
    <div class="status-bar">
      <el-icon class="status-icon"><Box /></el-icon>
      <span class="status-text">{{packageDetail.orderStatusDesc}}</span>
      <div class="package-no">
        包裹编号：{{ packageDetail.packageOrderNo }}
        <el-button link type="primary" class="copy-btn">
          <el-icon><DocumentCopy /></el-icon>
        </el-button>
      </div>
      <div class="submit-time">提交时间：{{ packageDetail.gmtCreate }}</div>
      <!-- <div class="tip">如果在运输过程中发生任何问题，您将通过Account->Message收到通知</div> -->
      <!-- <div class="tag">关键词：ces</div> -->
    </div>

    <!-- 收货信息 -->
    <div class="info-card">
      <div class="card-title">收货信息</div>
      <div class="info-content">
        <div class="info-item">
          <span class="label">{{packageDetail.firstName}} {{packageDetail.lastName}}</span>
          <span class="value">{{ packageDetail.mobile }}</span>
        </div>
        <div class="info-item full-width">
          <span class="value">{{packageDetail.countryName}}/{{packageDetail.provinceName}}/{{packageDetail.cityName}}/{{packageDetail.address}}</span>
        </div>
      </div>
    </div>

    <!-- 物流信息 -->
    <div class="info-card">
      <div class="card-title">物流信息</div>
      <div class="info-content">
        <div class="info-row">
          <div class="info-item">
            <span class="label">寄送国家：</span>
            <span class="value">{{packageDetail.sendCountry}}</span>
          </div>
          <div class="info-item">
            <span class="label">寄送线路：</span>
            <span class="value">{{packageDetail.logisticsLineName}}</span>
          </div>
          <div class="info-item">
            <span class="label">物流跟踪：</span>
            <span class="value">--</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 包装方式 -->
    <div class="info-card">
      <div class="card-title">包装方式</div>
      <div class="package-options">
        <div class="option">
          <el-radio v-model="packageType" label="paper" disabled>
            纸箱包装
          </el-radio>
        </div>
        <div class="option">
          <el-radio v-model="packageType" label="extra" disabled>
            免费服务
          </el-radio>
        </div>
      </div>
    </div>


<!-- 运费明细 -->
<div class="info-card">
      <div class="card-title">运费明细</div>
      <div class="fee-details">

    <div class="bg-gray-50 flex justify-center">
    <div class="w-[1440px] p-8">
      <div class="flex space-x-4">
        <!-- 预估信息卡片 -->
        <div class="flex-1 bg-gray-100 rounded-lg p-6">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <span class="text-gray-600">预估押金</span>
                <el-icon class="ml-1 text-gray-400">
                  <QuestionFilled />
                </el-icon>
              </div>
              <span class="text-xl font-medium">¥{{packageDetail.freightDeposit}}</span>
            </div>
          
            
            <div class="flex justify-between items-center">
              <span class="text-gray-600">包裹预估重量</span>
              <span class="text-gray-900">{{packageDetail.estimatePackageWeight}}g</span>
            </div>
          </div>
        </div>

        <!-- 实际结算卡片 -->
        <div class="flex-1  rounded-lg p-6">
          <div class="space-y-4"  v-if="packageDetail.realFreightDeposit">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <span class="text-gray-600">最终支付</span>
                <el-icon class="ml-1 text-gray-400">
                  <QuestionFilled />
                </el-icon>
              </div>
              <span class="text-xl font-medium text-red-500">¥ {{ packageDetail.realFreightDeposit }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-gray-600">运费补款</span>
              <span class="text-red-500">¥ 26.17</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-gray-600">实际称重</span>
              <span class="text-gray-900">{{packageDetail.realPackageWeight}}g</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>






    
      
        <div class="fee-row total">
          <span class="label">申报金额：</span>
          <span class="value">--</span>
        </div>
      </div>
    </div>

    <!-- 商品清单 -->
    <div class="info-card">
      <div class="card-title">商品清单</div>
      <el-table :data="packageDetail.skuDetailList" style="width: 100%">
        <el-table-column label="商品详情" min-width="400">
          <template #default="{ row }">
            <div class="product-info">
              <el-image :src="row.headPic" class="product-image" />
              <div class="product-detail">
                <div class="product-name">{{ row.productName }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template #default="{ row }">
            ×{{ row.skuNum }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight, Box, DocumentCopy } from '@element-plus/icons-vue'
import { allOrderList } from "@/api/orderList";


const route = useRoute()
const packageDetail = ref({});
const packageNo = 'EP26083887545365708'
const submitTime = '2024-12-20 18:40:34'
const packageType = ref('paper')
const weight = 525
const fees = {
  deposit: 48.56,
  shipping: 46.31,
  firstWeight: 38.37,
  additionalWeight: 7.95,
  valueAddedService: 0,
  processingFee: 0,
  fuelCharge: 0,
  operationFee: 2.25,
  serviceFee: 0
}

const firstWeightRate = '$38.37'
const additionalWeightRate = '7.95'

const productList = [
  {
    id: 'SI231364071519347264',
    name: '治愈系蝴蝶结小熊-可爱毛绒熊发夹公主少女心刘海碎发夹百搭头饰',
    color: '35B1【樱色小熊】',
    image: '/img1.jpg',
    quantity: 1
  },
  {
    id: 'SI249984069543350272',
    name: '白色衬衫男长袖修身春秋韩版潮流男士商务打底衬衣上衣',
    color: '白色',
    size: 'XL',
    image: '/img2.jpg',
    quantity: 1
  }
]
 // 在组件挂载时获取路由参数
 onMounted(() => {
    if(route.query.id){
      loadOrderDetail();
    }
  });
  const loadOrderDetail = async () => {
    await allOrderList.packageOrderDetail({
      packageOrderId: route.query.id
    }).then((res) => {
      if (res.code === 200) {
        packageDetail.value = res.data;
      }
    });
  };
</script>

<style lang="less" scoped>
@import '@/styles/variables.less';

.package-detail {
  padding-top: 20px;
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    color: @text-regular;

    .el-icon {
      font-size: 12px;
    }
  }

  .status-bar {
    background: linear-gradient(to right, @primary-color, lighten(@primary-color, 10%));
    color: #fff;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 20px;

    .status-icon {
      font-size: 24px;
      margin-right: 10px;
    }

    .status-text {
      font-size: 18px;
      font-weight: bold;
    }

    .package-no {
      margin: 10px 0;
      display: flex;
      align-items: center;
      gap: 10px;

      .copy-btn {
        color: #fff;
      }
    }

    .tip {
      font-size: 14px;
      margin: 10px 0;
      opacity: 0.9;
    }

    .tag {
      font-size: 12px;
      opacity: 0.8;
    }
  }

  .info-card {
    background: #fff;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 20px;

    .card-title {
      font-size: 16px;
      font-weight: bold;
      color: @text-primary;
      margin-bottom: 20px;
      border-bottom: 1px solid @border-color;
      padding-bottom: 10px;
    }

    .info-content {
      .info-row {
        display: flex;
        gap: 40px;
      }

      .info-item {
        display: flex;
        align-items: center;
        gap: 10px;

        &.full-width {
          width: 100%;
        }

        .label {
          color: @text-regular;
          min-width: 80px;
        }

        .value {
          color: @text-primary;
        }
      }
    }

    .package-options {
      display: flex;
      gap: 40px;

      :deep(.el-radio) {
        --el-radio-text-color: @text-regular;
        --el-radio-input-border-color: @primary-color;
        --el-radio-checked-text-color: @primary-color;
      }
    }

    .fee-details {
      .fee-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;

        &.sub-item {
          padding-left: 20px;
          color: @text-regular;
          font-size: 14px;
        }

        &.total {
          border-top: 1px dashed @border-color;
          padding-top: 15px;
          margin-top: 15px;
          font-weight: bold;
        }
      }
    }

    .product-info {
      display: flex;
      gap: 15px;

      .product-image {
        width: 80px;
        height: 80px;
        border-radius: 4px;
      }

      .product-detail {
        .product-name {
          color: @text-primary;
          margin-bottom: 8px;
        }

        .product-spec {
          color: @text-regular;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .product-id {
          color: @text-secondary;
          font-size: 12px;
        }
      }
    }
  }
}
</style> 