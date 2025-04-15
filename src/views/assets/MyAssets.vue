<template xmlns="http://www.w3.org/1999/html">
  <div>
  <div class="my-assets" v-if="showWithDraw === 0">
    <!-- 资产卡片 -->
    <div class="assets-card">
      <div class="balance-info">
        <div class="title">
          {{ $t('assets.balance.title') }}
          <span>({{ getCurrencyStr() }})</span>
        </div>
        <div class="amount">{{ formatPrice(balanceInfo, "balance") }}</div>
        <div class="frozen">({{ $t('assets.balance.frozen') }}：{{ formatPrice(balanceInfo, "nonWithdrawBalance") }})</div>
      </div>
      <div class="actions">
        <el-button  @click="handleWithdraw">
          {{ $t('assets.balance.withdraw') }}
        </el-button>
        <el-button type="primary" @click="handleRecharge">
          {{ $t('assets.balance.recharge') }}
        </el-button>
        <el-tooltip :content="$t('assets.balance.help')" placement="top">
          <el-icon class="help-icon"><QuestionFilled /></el-icon>
        </el-tooltip>
      </div>
    </div>
    <div class="availableBalance">
      <div class="availableBalanceBottom">
        <div class="availableBalanceBottomLeft">
          <span>{{ $t("assets.balance.arrears") }}</span>
          <el-tooltip :content="$t('assets.balance.arrearsTip')" placement="top">
            <el-icon class="help-icon"><QuestionFilled /></el-icon>
          </el-tooltip>
          <span class="qiaKuaNum">{{ formatPrice(balanceInfo, "debtBalance", true) }}</span>
          <el-button
                  v-if="balanceInfo.debtBalance"
                  class="huanKuanBtn"
                  type="primary"
                  @click="showDebtFun()"
          >{{ $t("assets.balance.paymentOfArrears") }}</el-button
          >
        </div>
        <div class="availableBalanceBottomRight">
          <div class="lookRecords">
            <el-button @click="showDebtFun()">{{ $t("assets.transaction.viewStatement") }}</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 交易记录 -->
    <div class="transaction-list">
      <!-- 搜索区域 -->
      <div class="search-area">
        <span class="FormMingXi">{{ $t("assets.transaction.balanceDetails") }}</span>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          :range-separator="$t('assets.transaction.dateRange.separator')"
          :start-placeholder="$t('assets.transaction.dateRange.start')"
          :end-placeholder="$t('assets.transaction.dateRange.end')"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          @change="getList"
        />
      </div>

      <!-- 交易表格 -->
      <el-table :data="transactionList" v-loading="loading">
        <el-table-column :label="$t('assets.transaction.table.time')" prop="gmtCreated" />
        <el-table-column :label="$t('assets.transaction.table.type')" prop="flowDesc"  />
        <el-table-column :label="$t('assets.transaction.table.amount')">
          <template #default="{ row }">
            <span :class="{ 'income': row.disburseFlag <= 0, 'expense': row.disburseFlag > 0 }">
              {{ row.disburseFlag <= 0 ? '+' : '-' }}{{ formatPrice(row, "amount", true) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('assets.transaction.table.balance')"  >
          <template #default="{ row }">
            <span>
              {{ formatPrice(row, "afterBalance", true) }}
            </span>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <div class="total">共 {{ total }} 条</div>
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          :total="total"
          layout="prev, pager, next, sizes"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
  <rechargeForm ref="rechargeFormRef" :exchange="exchange" @finish="finish"></rechargeForm>
  <debtRecords v-if="showWithDraw === 3" @back="backFun"></debtRecords>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from 'vue'
import { useRouter } from 'vue-router'
import rechargeForm from "./components/rechargeForm.vue";
import debtRecords from "./debtRecords.vue";
import { QuestionFilled, DocumentCopy } from '@element-plus/icons-vue'
import { formatTitle, formatNum2, formatPrice, currencySymbol, getCurrencyStr, formatAmount } from "@/utils/tools";
import {
  getBalance,
  listBalanceFlow,
  listDebtFlow,
  charge,
} from "@/api/balance";

import { payExchange } from "@/api/pay";


const router = useRouter()
const rechargeFormRef = ref(null);
const loading = ref(false)
const dateRange = ref([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const expandedRows = ref([])
const balanceInfo = reactive({
  balance: 0,
  balanceTrans: 0,
  nonWithdrawBalance: 0,
  nonWithdrawBalanceTrans: 0,
  debtBalance: 0,
  debtBalanceTrans: 0

});

// 余额明细数据
const transactionList = ref([])
const showWithDraw = ref(0);

// 提现
const handleWithdraw = () => {
  // 实现提现逻辑
}

// 欠款记录
const showDebtFun = () => {
  showWithDraw.value = 3;
};
const backFun = () => {
  showWithDraw.value = 0;
};

// 充值
const exchange = ref(1);
const handleRecharge = () => {
  // 实现充值逻辑
  const currency = getCurrencyStr();
  if (currency !== "CNY") {
    //查询汇率
    payExchange().then((res) => {
       exchange.value = res.data;
    });
  } else {
    exchange.value = 1;
  }
  rechargeFormRef.value.opRechargeModal();
}

// 查看账单
const viewStatement = () => {
  // 实现查看账单逻辑
  getList();
}

// 分页相关方法
const handleSizeChange = (val) => {
  page.value = 1;
  pageSize.value = val;
  getList();
}

const handleCurrentChange = (val) => {
  page.value = val;
  getList();
}

const getList = () => {
  loading.value = true;
  const requestParameters = {
    pageNo: page.value,
    pageSize: pageSize.value
  }
  if (dateRange.value && dateRange.value.length > 0) {
    requestParameters.gmtCreatedStart = `${dateRange.value[0]} 00:00:00`;
    requestParameters.gmtCreatedEnd = `${dateRange.value[1]} 23:59:59`;
  }
  listBalanceFlow(requestParameters)
    .then((res) => {
      transactionList.value = res.data || [];
      total.value = res.total;
    })
    .finally(() => {
      loading.value = false;
    });
};
onBeforeMount(() => {
  getBalance().then((res) => {
    balanceInfo.balance = res.data.availableBalance;
    balanceInfo.balanceTrans = res.data.availableBalanceTrans;
    balanceInfo.nonWithdrawBalance = res.data.nonWithdrawBalance;
    balanceInfo.nonWithdrawBalanceTrans = res.data.nonWithdrawBalanceTrans;
    balanceInfo.debtBalance = res.data.debtBalance;
    balanceInfo.debtBalanceTrans = res.data.debtBalanceTrans;
  });
  getList();
});

const finish = (data) => {
  router.push({
    path: "/pay",
    query: {
      source: data.source,
      payType: 6,
      userPayId: data.userPayId,
    },
  });
};
</script>

<style lang="less" scoped>
@import '@/styles/variables.less';

.my-assets {
  .assets-card {
    background: @primary-color;
    padding: 30px;
    border-radius: 8px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .balance-info {
      .title {
        font-size: 16px;
        opacity: 0.9;
        margin-bottom: 10px;
      }

      .amount {
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .frozen {
        font-size: 14px;
        opacity: 0.8;
      }
    }

    .actions {
      display: flex;
      gap: 10px;
      align-items: center;

      .el-button {
        --el-button-bg-color: rgba(255, 255, 255, 0.2);
        --el-button-border-color: rgba(255, 255, 255, 0.3);
        --el-button-hover-bg-color: rgba(255, 255, 255, 0.3);
        --el-button-hover-border-color: rgba(255, 255, 255, 0.4);
        --el-button-active-bg-color: rgba(255, 255, 255, 0.4);
        --el-button-active-border-color: rgba(255, 255, 255, 0.5);
        --el-button-text-color: #fff;

        &.el-button--primary {
          --el-button-bg-color: #fff;
          --el-button-border-color: #fff;
          --el-button-hover-bg-color: #f5f7fa;
          --el-button-hover-border-color: #f5f7fa;
          --el-button-active-bg-color: #e4e7ed;
          --el-button-active-border-color: #e4e7ed;
          --el-button-text-color: @primary-color;
        }
      }

      .help-icon {
        color: rgba(255, 255, 255, 0.8);
        font-size: 20px;
        cursor: pointer;

        &:hover {
          color: #fff;
        }
      }
    }
  }

  .transaction-list {
    background: #fff;
    padding: 20px;
    border-radius: 8px;

    .search-area {
      display: flex;
      width: 560px;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      margin-top: 32px;
      padding: 0 24px;
      .FormMingXi {
        margin-right: 42px;
        flex-shrink: 0;
      }
    }

    .income {
      color: #c803be;
    }

    .expense {
      color: #67c23a;
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
  .availableBalance {
      background-color: #fff;
      .availableBalanceBottom {
        width: 100%;
        height: 60px;
        background-color: #f8f8f8;
        border-radius: 0 0 8px 8px;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        .availableBalanceBottomLeft {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .qiaKuaImg {
            width: 12px;
            height: 12px;
            margin-left: 2px;
            margin-right: 12px;
          }
          .huanKuanBtn {
            border: none;
            // color: #fff;
            padding: 0 16px;
            border-radius: 14px;
            height: 28px;
            font-size: 12px;
            margin-left: 12px;
          }
          .qiaKuaNum {
            font-weight: 500;
            color: var(--amount-color);
          }
          .disButton {
            // color: #000;
            background-color: transparent !important;
            color: #ccc !important;
            border: 1px solid #ccc;
          }
        }
        .availableBalanceBottomRight {
          display: flex;
          align-items: center;
          font-size: 14px;
        }
      }
  }
}
</style> 