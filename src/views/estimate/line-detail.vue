<template>
  <div v-show="!loading" class="line-detail">
    <div class="box">
      <section class="limit">
        <div class="item-title">{{ $t("estimate.PackageRestrictions") }}</div>
        <div class="limit-table">
          <div class="top">
            <div class="min-weight flex-1">
              {{ $t("estimate.estTip9") }}
              {{ formData.data.packageWeightMin ? formData.data.packageWeightMin + "g" : "--" }}
            </div>
            <div class="max-weight flex-1">
              {{ $t("estimate.estTip10") }}
              {{ formData.data.packageWeightMax ? formData.data.packageWeightMax + "g" : "--" }}
            </div>
          </div>
          <div class="middle">
            {{ $t("estimate.estTip11") }}
            <!-- {{ formatTitle(formData.data, "sizeLimit") }} -->
            <span ref="refSizeLimit"></span>
          </div>
          <div class="bottom">
            {{ $t("estimate.estTip12") }}
            <!-- {{ formatTitle(formData.data, "volumeChargeLimit") }} -->
            <!-- {{ formData.data.volumeChargeLimit }} -->
            <span ref="refVolumeChargeLimit"></span>
          </div>
        </div>
        <div class="product-type">
          <div class="header">
            <div class="item"><span class="circle disabled"></span>{{ $t("estimate.estTip13") }}</div>
            <div class="item"><span class="circle enabled"></span>{{ $t("estimate.estTip14") }}</div>
          </div>
          <div class="con">
            <div v-for="(item, i) in formData.data.productTypeLabelList" :key="i" class="item">
              <div class="title">{{ formatTitle(item, "labelName", "en") }}:</div>
              <div
                v-for="child in item.children"
                :key="child.labelId"
                :class="['tag', !child.logisticsLineSupportFlag ? 'yes' : 'no']"
              >
                {{ formatTitle(child, "labelName", "en") }}
              </div>
              <!-- <div :class="['tag']">
                {{ formatTitle(item, "labelName", "en") }}
              </div> -->
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="cost">
      <div class="title">{{ $t("estimate.estTip15") }}</div>
      <a-table :data-source="dataSource" bordered :columns="columns" :pagination="false">
        <template #bodyCell="{ column, record, index, text }">
          <template v-if="column.dataIndex === 'firstWeightPrice'">
            <!-- <div class="cut">¥ 22.00/ 100 g</div> -->
            <div>
              <span class="priceText">¥ {{ formatNum2(text, false) }}</span>
              <span class="keText">/{{ record.firstWeight }} g</span>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'additionalWeightPrice'">
            <div>
              <span class="priceText">¥ {{ formatNum2(text, false) }}</span>
              <span class="keText">/{{ record.additionalWeight }} g</span>
            </div>
          </template>
          <template v-else-if="column.key === 'price'">
            <div>
              <span class="priceText">
                <template v-if="text !== null">¥ {{ formatNum2(text, false) }}</template>
                <template v-else>-</template>
              </span>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <div v-if="loading" class="line-detail loadingBox">
    <a-spin></a-spin>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, getCurrentInstance } from "vue";
import { formatNum2, formatTitle } from "@/utils/tools";
import { logisticsLineDetail } from "@/api/order";
const { proxy } = getCurrentInstance();
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
    default: "",
  },
  selectedLine: {
    type: [String, Number],
    default: "",
  },
  fatherData: {
    type: Object,
    default: () => {},
  },
  countryName: {
    type: String,
    default: "",
  },
});
const refSizeLimit = ref();
const refVolumeChargeLimit = ref();
const getData = async () => {
  console.log(props.fatherData);
  loading.value = true;
  const data = {
    logisticsLineId: props.fatherData?.logisticsLineId,
    logisticsLineCostId: props.fatherData?.logisticsLineCostId,
  };
  const res = await logisticsLineDetail(data);
  if (res?.success) {
    loading.value = false;
    formData.data = res?.data;
    refSizeLimit.value.innerHTML = res?.data.sizeLimit;
    refVolumeChargeLimit.value.innerHTML = res?.data.volumeChargeLimit;
    dataSource.value[0].firstWeightPrice = res?.data.firstWeightPrice;
    dataSource.value[0].firstWeight = res?.data.firstWeight;
    dataSource.value[0].additionalWeightPrice = res?.data.additionalWeightPrice;
    dataSource.value[0].additionalWeight = res?.data.additionalWeight;
    dataSource.value[0].servicePrice = res?.data.servicePrice;
    dataSource.value[0].additionalWeight = res?.data.additionalWeight;
    dataSource.value[0].fuelCost = res?.data.fuelCost;
    dataSource.value[0].logisticsProviderProcessingFee = res?.data.logisticsProviderProcessingFee;
    dataSource.value[0].operationFee = res?.data.operationFee;
    // console.log(dataSource.value);
  }
};

// watch(
//   () => props.selectedLine,
//   () => {
//     if (props.selectedLine === props.id) {
//       getData();
//     }
//   },
// );

const searchForm = reactive({
  area: undefined,
  timeRange: [],
});

const loading = ref(false);

const formData = reactive({ data: {} });

const lineDetail = ref({
  area: "GD-EUB To USA-美国",
  tips: "01/27-02/11",
  ageingProgress: [
    {
      label: "0-7",
      value: 0,
    },
    {
      label: "8-15",
      value: 27,
    },
    {
      label: "16-25",
      value: 87.25,
    },
    {
      label: "26-40",
      value: 17,
    },
    {
      label: ">40",
      value: 1,
    },
  ],
  rateProgress: [
    {
      label: proxy.$t("estimate.NotYetDelivered"),
      value: 0,
    },
  ],
  limitInfo: {
    minW: null,
    maxW: 2000,
    size: "长宽高之和不得大于90cm | 最长边不得大于60cm",
    vo: "该路线按照包裹实际重量计费。",
    productInfo: [
      {
        title: "服饰",
        typeInfo: [
          {
            enabled: true,
            type: "普货",
          },
          {
            enabled: true,
            type: "普通品牌",
          },
          {
            enabled: true,
            type: "普货",
          },
          {
            enabled: false,
            type: "普货",
          },
        ],
      },
      {
        title: "饰品",
        typeInfo: [
          {
            enabled: true,
            type: "普货",
          },
          {
            enabled: true,
            type: "普通品牌",
          },
          {
            enabled: true,
            type: "普货",
          },
          {
            enabled: false,
            type: "普货",
          },
        ],
      },
      {
        title: "鞋子",
        typeInfo: [
          {
            enabled: true,
            type: "普货",
          },
          {
            enabled: true,
            type: "普通品牌",
          },
          {
            enabled: true,
            type: "普货",
          },
          {
            enabled: false,
            type: "普货",
          },
        ],
      },
      {
        title: "鞋子",
        typeInfo: [
          {
            enabled: true,
            type: "普货",
          },
        ],
      },
      {
        title: "鞋子",
        typeInfo: [
          {
            enabled: true,
            type: "普货",
          },
        ],
      },
      {
        title: "鞋子",
        typeInfo: [
          {
            enabled: true,
            type: "普货",
          },
        ],
      },
      {
        title: "鞋子",
        typeInfo: [
          {
            enabled: true,
            type: "普货",
          },
        ],
      },
      {
        title: "鞋子",
        typeInfo: [
          {
            enabled: true,
            type: "普货",
          },
        ],
      },
    ],
  },
});

const dataSource = ref([
  {
    // key: '1',
    firstWeightPrice: null,
    additionalWeightPrice: null,
    servicePrice: null,
    firstWeight: null,
    additionalWeight: null,
    fuelCost: null,
    logisticsProviderProcessingFee: null,
    operationFee: null,
  },
]);
const customCell = () => {
  return {
    style: {
      height: "50px",
      padding: "0px",
      "font-size": "12px",
    },
  };
};
const customHeaderCell = () => {
  return {
    style: {
      "font-size": "12px",
      padding: "13px 16px",
      background: "#fdfdfd",
    },
  };
};
const columns = [
  {
    title: proxy.$t("estimate.firstWeightPrice"),
    dataIndex: "firstWeightPrice",
    align: "center",
    width: "16.6%",
    customCell,
    customHeaderCell,
  },
  {
    title: proxy.$t("estimate.additionalWeightPrice"),
    dataIndex: "additionalWeightPrice",
    align: "center",
    width: "16.6%",
    customCell,
    customHeaderCell,
  },
  {
    title: proxy.$t("estimate.carrierProcessingFee"),
    dataIndex: "logisticsProviderProcessingFee",
    align: "center",
    width: "16.6%",
    key: "price",
    customCell,
    customHeaderCell,
  },
  {
    title: proxy.$t("estimate.fuelCharge"),
    dataIndex: "fuelCost",
    align: "center",
    width: "16.6%",
    key: "price",
    customCell,
    customHeaderCell,
  },
  {
    title: proxy.$t("estimate.operationFee"),
    dataIndex: "operationFee",
    align: "center",
    width: "16.6%",
    key: "price",
    customCell,
    customHeaderCell,
  },
  {
    title: proxy.$t("estimate.servicePrice"),
    dataIndex: "servicePrice",
    align: "center",
    key: "price",
    width: "16.6%",
    customCell,
    customHeaderCell,
  },
];

onMounted(() => {
  getData();
});
</script>
<style>
.line-detail-range-picker .ant-picker-input > input {
  font-size: 12px;
  text-align: center;
}
</style>
<style lang="less" scoped>
.smT {
  margin-bottom: 10px;
}
.keText {
  color: #999;
}
.sjrBox {
  background-color: #f8f8f8;
  color: #333333;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 12px;
}
.loadingBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.priceText {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
.line-detail {
  padding: 30px 20px 10px;
  font-size: 14px;
  .box {
    display: flex;
    justify-content: space-between;
    height: 100%;
    .item-title {
      color: #333;
      font-weight: 700;
      height: 30px;
    }
  }
  .chart {
    width: 600px;
    flex-shrink: 0;
    .search-form {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .refresh {
        width: 100px;
        height: 40px;
        color: #fff;
      }
    }
    .con {
      font-size: 12px;
      padding: 10px 10px 40px;
      height: calc(100% - 30px);

      background-color: hsla(0, 0%, 94.9%, 0.5);
      .progress-con {
        overflow-y: auto;
        // height: 558px;
        // height: 100%;
        height: calc(100% - 30px);
      }
      .area {
        font-size: 16px;
        margin-bottom: 16px;
      }
      .progress {
        margin-bottom: 30px;
        .item {
          display: flex;
          align-items: center;
          .label {
            flex-shrink: 0;
            width: 62px;
            padding: 0 5px;
          }
          .value {
            flex-grow: 1;
          }
          :deep(.ant-progress-text) {
            font-size: 12px;
            width: 50px;
          }
          :deep(.ant-progress-show-info .ant-progress-outer) {
            margin-right: calc(-50px - 8px);
            padding-right: calc(50px + 8px);
          }
        }
      }
    }
    .tips {
      float: right;
      span {
        color: #1890ff;
      }
    }
  }
  .limit {
    width: 1100px;
    font-size: 12px;
    .item-title {
      font-size: 14px;
    }
    .limit-table {
      border: 1px solid #eee;
      .top {
        border-bottom: 1px solid #eee;
        display: flex;
        .flex-1 {
          display: flex;
          align-items: center;
          flex: 1;
          padding: 0 20px;
          height: 50px;
        }
        .min-weight {
          border-right: 1px solid #eee;
        }
      }
      .middle {
        min-height: 50px;
        padding: 10px 20px;
        border-bottom: 1px solid #eee;
      }
      .bottom {
        padding: 10px 20px;
        min-height: 62px;
      }
    }
    .product-type {
      height: 442px;
      border: 1px solid #eee;
      border-top: none;
      .header {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0px 20px;
        .item {
          margin-right: 16px;
          .disabled {
            background-color: #ff4700;
          }
          .enabled {
            background-color: #11ba66;
          }
          .circle {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 4px;
          }
        }
      }
      .con {
        height: 392px;
        overflow-y: auto;
        padding: 10px 20px;
        // display: flex;
        .item {
          margin-bottom: 10px;
          // display: inline-block;
        }
        .title {
          font-weight: 500;
          margin-bottom: 8px;
        }
        .tag {
          display: inline-block;
          padding: 2px 4px;
          margin-right: 10px;
          margin-bottom: 10px;
          font-weight: 400;
        }
        .yes {
          background: rgba(17, 186, 102, 0.1);
          border-radius: 2px;
          color: #11ba66;
        }
        .no {
          background: rgba(255, 0, 0, 0.1);
          border-radius: 2px;
          color: #ff1e05;
        }
      }
    }
  }
  .cost {
    .title {
      margin-top: 18px;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      font-weight: 700;
      color: #333;
    }
    .cut {
      text-decoration-line: line-through;
    }
    .real {
      font-size: 14px;
      color: #ff1e05;
    }
  }
  .tax {
    .title {
      margin-top: 18px;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      font-weight: 700;
      color: #333;
      display: flex;
      align-items: center;
      img {
        margin-left: 4px;
      }
    }
    .con {
      color: #999;
    }
  }
  .characteristic {
    .title {
      margin-top: 24px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: 700;
      color: #333;
    }
    .con {
      color: #999;
      div:last-child {
        margin-top: 8px;
      }
    }
  }
}
</style>
