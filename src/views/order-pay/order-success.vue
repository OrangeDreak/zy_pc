<template>
  <div class="orderPayBox">
    <div class="orderPayText">{{ $t("pay.mine_cart_orderPay_nav") }}</div>
    <div>
      <a-spin :spinning="loading">
        <div v-if="!loading" class="paySuccessBox">
          <template v-if="status">
            <img src="@/assets/images/order/success.png" class="paySuccessImg" />
            <div class="paySuccessTitle">
              <span>
                {{ route.query.path === "recharge" ? $t("pay.rechargeSuccess") : $t("pay.paySuccess") }}
              </span>
            </div>
            <div v-if="route.query.path === 'package-list'" class="paySuccessText">
              {{ $t("pay.paySuccessTip2") }}
            </div>
            <div v-else-if="route.query.path === 'recharge'" class="paySuccessText">
              <!-- {{ $t("pay.paySuccessTip") }} -->
            </div>

            <div v-else class="paySuccessText">{{ $t("pay.paySuccessTip") }}</div>

            <div class="paySuccessBtnBox">
              <a-button
                v-if="route.query.path === 'recharge' || route.query.path === 'repayment'"
                type="primary"
                class="chaKan"
                @click="goPage('/mine/property')"
                >{{ $t("pay.goback_assets") }}</a-button
              >
              <a-button
                v-else
                type="primary"
                class="chaKan"
                @click="goPage('/mine/' + (route.query.path ?? 'order-list'))"
                >{{ $t("pay.viewOrder") }}</a-button
              >
            </div>
          </template>
          <template v-else>
            <img src="@/assets/images/icon/fail.png" class="paySuccessImg" />
            <div class="paySuccessTitle">{{ $t("pay.payFail") }}</div>
          </template>
        </div>
        <div v-else class="paySuccessBox"></div>
      </a-spin>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const status = ref(true);
const loading = ref(true);

const goPage = (path) => {
  router.replace(path);
};

onMounted(async () => {
  // PayPal，Stripe确认支付，用于立刻更新订单，业务的支付状态
  if (route.query.token || route.query.redirect_status === "succeeded") {
    loading.value = true;
    loading.value = false;
  } else if (route.query.path === "package-list") {
    loading.value = false;
  } else {
    loading.value = false;
  }
});
</script>

<style lang="less" scoped>
.orderPayBox {
  width: 1200px;
  margin: 0 auto;
  padding: 24px 0 0 0;
  background-color: #f3f3f3;
  .orderPayText {
    font-size: 20px;
    margin-bottom: 24px;
  }
  .paySuccessBox {
    padding: 100px 230px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
    .paySuccessImg {
      width: 36px;
      height: 36px;
    }
    .paySuccessTitle {
      font-size: 28px;
      font-weight: 500;
      margin: 12px 0 24px 0;
    }
    .paySuccessText {
      font-size: 14px;
      text-align: center;
      line-height: 24px;
      margin-bottom: 24px;
    }
    .paySuccessBtnBox {
      :deep(.ant-btn) {
        padding: 0 30px;
        height: 40px;
        font-size: 18px;
        margin: 0 10px;
        font-weight: 500;
      }
      .jiXu {
        border: 1px solid #cccccc;
      }
      .chaKan {
      }
    }
  }
}
</style>
