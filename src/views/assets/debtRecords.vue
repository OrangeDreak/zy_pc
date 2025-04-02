<template>
  <!-- 欠款记录 -->
  <div class="titleRow">
    <div class="titleLeft">
      <img src="@/assets/images/icon/arrow-left.png" alt="" @click="goBack" />
      <span>{{ $t("assets.balance.arrears_records") }}</span>
    </div>
  </div>
    <!-- 交易记录 -->
    <div class="transaction-list">
        <!-- 交易表格 -->
        <el-table :data="dataSource.data" v-loading="loading">
            <el-table-column :label="$t('assets.transaction.table.time')" prop="gmtCreated" />
            <el-table-column :label="$t('assets.transaction.table.type')" prop="flowDesc"  />
            <el-table-column :label="$t('assets.transaction.table.amount2')">
                <template #default="{ row }">
                    <span> {{ formatPrice(row, "amount", true) }} </span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('assets.transaction.table.serviceNumber')" prop="outFlowId"  />
            <el-table-column :label="$t('assets.transaction.table.options')">
                <template #default="{ row }">
                    <div v-if="row.flowStatus == 1">
                        <span> $t('assets.transaction.table.repaymented') </span>
                    </div>
                    <div v-else>
                        <el-button type="primary" @click="showModalFun(row)">{{ $t("assets.balance.paymentOfArrears") }}</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination">
            <div class="total">共 {{ pageInfo.total }} 条</div>
            <el-pagination
                    v-model:current-page="pageInfo.pageNum"
                    v-model:page-size="pageInfo.pageSize"
                    :page-sizes="[10, 20, 50]"
                    :total="pageInfo.total"
                    layout="prev, pager, next, sizes"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { formatTitle, formatNum2, formatPrice, currencySymbol, getCurrencyStr, formatAmount } from "@/utils/tools";
import {
  listDebtFlow,
} from "@/api/balance";

const router = useRouter();
const { t } = useI18n();
const { proxy } = getCurrentInstance();

const loading = ref(false);
const formData = reactive({ timeValue: null, typeValue: null });
const dataSource = reactive({ data: [] });
const pageInfo = reactive({ pageNum: 1, pageSize: 10, total: 0 });


const getListDebtFlowFun = async () => {
  loading.value = true;
  const data = {
    pageNo: pageInfo.pageNum,
    pageSize: pageInfo.pageSize,
  };
  try {
    const res = await listDebtFlow(data);
    if (res.success) {
      dataSource.data = res.data || [];
      pageInfo.total = res.total;
      loading.value = false;
    }
  } catch (e) {
    loading.value = false;
  }
};

const showModalFun = (item) => {
  router.push({
    path: "/pay",
    query: {
      payType: 7,
      userPayId: item.userPayId || undefined,
      source: "repayment",
    },
  });
};

// 页码变更
const handleCurrentChange = (page, pageSize) => {
  pageInfo.pageNum = page;
  pageInfo.pageSize = pageSize;
  getListDebtFlowFun();
};
const handleSizeChange = (current, size) => {
  pageInfo.pageNum = 1;
  pageInfo.pageSize = size;
  getListDebtFlowFun();
};

const emits = defineEmits(["back"]);
const goBack = () => {
  emits("back");
};

onBeforeMount(() => {
  getListDebtFlowFun();
});
</script>
<style lang="less" scoped>
@import '@/styles/variables.less';
.titleRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 20px;
  height: 52px;
  padding: 0 24px;
  .titleLeft {
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
    img {
      height: 18px;
      margin-right: 15px;
      cursor: pointer;
    }
  }
  .titleRight {
    font-size: 14px;
  }
}
.table-data {
  padding: 0 24px;
  min-height: 282px;
}
.paginationBox {
  background: #ffffff;
  box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: flex-end;
  padding: 0 24px;
  align-items: center;
  height: 72px;
}
.transaction-list {
    background: #fff;
    padding: 20px;
    border-radius: 8px;

    .search-area {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      margin-top: 32px;
      padding: 0 24px;
      .FormMingXi {
        margin-right: 12px;
      }
    }

    .income {
      color: #67c23a;
    }

    .expense {
      color: #f56c6c;
    }

    .pagination {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .total {
        color: @text-regular;
      }

      :deep(.el-pagination.is-background) {
        .el-pager li:not(.is-disabled).is-active {
          background-color: @primary-color;
        }
      }
    }

    .transaction-table {
      width: 100% !important;

      :deep(.el-table__expanded-cell) {
        padding: 10px 20px;
      }

      :deep(.el-table__body) {
        width: 100%;
      }
    }
  }
</style>
