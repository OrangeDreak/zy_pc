<!--<template>-->
<!--  &lt;!&ndash; 欠款记录 &ndash;&gt;-->
<!--  <div class="titleRow">-->
<!--    <div class="titleLeft">-->
<!--      <img src="@/assets/images/icon/arrow-left.png" alt="" @click="goBack" />-->
<!--      <span>{{ $t("arrears_records") }}</span>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div class="table-data">-->
<!--    <CommonTable-->
<!--      ref="commonTableRef"-->
<!--      :columns="columns"-->
<!--      :params="formData"-->
<!--      :data-source="dataSource.data"-->
<!--      :loading="loading"-->
<!--      @showModalFun="showModalFun"-->
<!--    >-->
<!--    </CommonTable>-->
<!--  </div>-->
<!--  <a-affix v-if="dataSource.data.length" :offset-bottom="0">-->
<!--    <div class="paginationBox">-->
<!--      <a-pagination-->
<!--        v-model:current="pageInfo.pageNum"-->
<!--        v-model:page-size="pageInfo.pageSize"-->
<!--        :total="pageInfo.total"-->
<!--        show-quick-jumper-->
<!--        show-size-changer-->
<!--        :show-total="(total) => `${$t('total')} ${total} ${$t('strip')}`"-->
<!--        @change="pageSizeChange"-->
<!--        @showSizeChange="sizeChange"-->
<!--      />-->
<!--    </div>-->
<!--  </a-affix>-->
<!--</template>-->

<!--<script setup>-->
<!--import { getCurrentInstance, reactive, ref, onBeforeMount } from "vue";-->
<!--import { useRouter } from "vue-router";-->
<!--import { useStore } from "vuex";-->
<!--import { useI18n } from "vue-i18n";-->
<!--import dayjs from "dayjs";-->
<!--import CommonTable from "./components/table.vue";-->
<!--import Api from "@/api/property";-->

<!--const { getters } = useStore();-->
<!--const router = useRouter();-->
<!--const { t } = useI18n();-->
<!--const { proxy } = getCurrentInstance();-->

<!--const commonTableRef = ref();-->
<!--const loading = ref(false);-->
<!--const formData = reactive({ timeValue: null, typeValue: null });-->
<!--const dataSource = reactive({ data: [] });-->
<!--const pageInfo = reactive({ pageNum: 1, pageSize: 10, total: 0 });-->

<!--const columns = [-->
<!--  {-->
<!--    title: t("property.gmtCreated"),-->
<!--    dataIndex: "gmtCreated",-->
<!--    customRender: ({ text }) => {-->
<!--      return dayjs(text).format("YYYY-MM-DD HH:mm:ss");-->
<!--    },-->
<!--  },-->
<!--  {-->
<!--    title: t("property.type"),-->
<!--    dataIndex: "flowDesc",-->
<!--  },-->
<!--  {-->
<!--    title: t("amount"),-->
<!--    dataIndex: "amount",-->
<!--    customRender: ({ record }) => {-->
<!--      return proxy.$formatPrice(record, "amount");-->
<!--    },-->
<!--  },-->
<!--  {-->
<!--    title: t("serviceNumber"),-->
<!--    dataIndex: "outFlowId",-->
<!--  },-->
<!--  {-->
<!--    title: t("menu.options"),-->
<!--    dataIndex: "repaymentBtn",-->
<!--    align: "center",-->
<!--  },-->
<!--];-->

<!--const getListDebtFlowFun = async () => {-->
<!--  loading.value = true;-->
<!--  const data = {-->
<!--    pageNo: pageInfo.pageNum,-->
<!--    pageSize: pageInfo.pageSize,-->
<!--  };-->
<!--  // const res = await listBalanceFlow(data);-->
<!--  try {-->
<!--    const res = await Api.balanceListDebtFlow(data);-->
<!--    if (res?.success) {-->
<!--      dataSource.data = res?.data || [];-->
<!--      pageInfo.total = res.cnt;-->
<!--      loading.value = false;-->
<!--    }-->
<!--  } catch (e) {-->
<!--    loading.value = false;-->
<!--  }-->
<!--};-->

<!--const showModalFun = (item) => {-->
<!--  sessionStorage.setItem(-->
<!--    "payInfo",-->
<!--    JSON.stringify({-->
<!--      amount: item.amount,-->
<!--      amountTrans: item.amountTrans,-->
<!--    }),-->
<!--  );-->
<!--  router.push({-->
<!--    path: "/order-pay",-->
<!--    query: {-->
<!--      payType: 7,-->
<!--      userPayId: item.userPayId || undefined,-->
<!--      source: "repayment",-->
<!--    },-->
<!--  });-->
<!--};-->

<!--// 页码变更-->
<!--const pageSizeChange = (page, pageSize) => {-->
<!--  pageInfo.pageNum = page;-->
<!--  pageInfo.pageSize = pageSize;-->
<!--  getListDebtFlowFun();-->
<!--};-->
<!--const sizeChange = (current, size) => {-->
<!--  pageInfo.pageNum = 1;-->
<!--  pageInfo.pageSize = size;-->
<!--};-->

<!--const emits = defineEmits(["back"]);-->
<!--const goBack = () => {-->
<!--  emits("back");-->
<!--};-->

<!--onBeforeMount(() => {-->
<!--  getListDebtFlowFun();-->
<!--});-->
<!--</script>-->
<!--<style lang="less" scoped>-->
<!--.titleRow {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  border-bottom: 1px solid #eeeeee;-->
<!--  margin-bottom: 20px;-->
<!--  height: 52px;-->
<!--  padding: 0 24px;-->
<!--  .titleLeft {-->
<!--    font-size: 18px;-->
<!--    font-weight: 500;-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--    img {-->
<!--      height: 18px;-->
<!--      margin-right: 15px;-->
<!--      cursor: pointer;-->
<!--    }-->
<!--  }-->
<!--  .titleRight {-->
<!--    font-size: 14px;-->
<!--  }-->
<!--}-->
<!--.table-data {-->
<!--  padding: 0 24px;-->
<!--  min-height: 282px;-->
<!--}-->
<!--.paginationBox {-->
<!--  background: #ffffff;-->
<!--  box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);-->
<!--  display: flex;-->
<!--  justify-content: flex-end;-->
<!--  padding: 0 24px;-->
<!--  align-items: center;-->
<!--  height: 72px;-->
<!--}-->
<!--</style>-->
