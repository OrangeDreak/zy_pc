<template>
  <!-- 使用公共头部 -->
  <common-header />
  <div class="content">
  <div class="orderPayBox">
    <div class="orderPayText">{{ $t("pay.mine_cart_orderPay_nav") }}</div>

    <a-spin :spinning="loading">
      <div class="payTypeBox">
        <div class="payTypeTitle">{{ $t("pay.payMode") }}</div>
        <a-radio-group v-model:value="payMode" @change="payModeChange">
          <div class="typeBox">
            <div v-if="route.query.source !== 'recharge'" class="typeRow">
              <div class="typeRowTop">
                <a-radio :value="0" :disabled="amountInfo.balance <= 0"
                  ><img src="@/assets/images/order/yue2.png" class="typeImg" />
                  <span class="moneyText"
                    >{{ $t("pay.Balance") }} {{ formatPrice(amountInfo, "balance") }}</span
                  >
                </a-radio>
                <!-- v-if="amountInfo.balance < realAmount.totalAmount" -->
                <div v-if="amountInfo.balance < amountInfo.actualAmount" class="typeRowRight">
                  <div class="rightTip">{{ $t("pay.balanceOverTip") }}</div>
                  <a-button @click="$router.push('/my-assets')">{{ $t("pay.globalRecharge") }}</a-button>
                </div>
              </div>
            </div>
            <div v-if="payMethodList.includes(1)" class="typeRow">
              <div class="typeRowTop">
                <a-radio :value="1">
                  <img src="@/assets/images/order/alipay.png" class="typeImg" />
                  <span class="moneyText">{{ $t("pay.Alipay") }}</span>
                </a-radio>
                <div class="typeRowRight">
                  <div class="rightText">
                    {{ $t("pay.alipayTip") }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="payMethodList.includes(2)" class="typeRow">
              <div class="typeRowTop">
                <a-radio :value="2">
                  <img src="@/assets/images/order/paypal.png" class="typeImg" />
                  <span class="moneyText">PayPal</span>
                </a-radio>
                <div class="typeRowRight">
                  <div class="rightText">
                    {{ $t("pay.paypalTip") }}
                  </div>
                </div>
              </div>
<!--              <div class="typeRowBottom">-->
<!--                <div class="warning">{{ $t("paypalTip2") }}</div>-->
<!--              </div>-->
            </div>
          </div>
        </a-radio-group>
      </div>
      <div class="confirmPay">
        <div class="confirmPayLeft">
          <div class="confirmPayTop">
            <span>{{ $t("pay.payAmount") }}：</span>
            <div class="money-con">
              <span class="HuoBi">{{ currencySymbol() }}</span
              ><span class="money">{{ formatPrice(amountInfo, "actualAmount", false) }}</span>
            </div>
          </div>
          <div class="confirmPayBottom">
            <span
              >{{
                route.query.source === "recharge"
                  ? $t("pay.property_recharge_money")
                  : $t("pay.orderAmount")
              }}{{ formatPrice(payInfo, "amount") }}</span
            ><span class="sxf"
              >{{ $t("pay.handCharge") }}{{ formatPrice(amountInfo, "handCharge") }}</span
            >
          </div>
        </div>
        <a-button class="back" @click="router.back()">{{
          route.query.source === "recharge" ? $t("pay.cancelRecharge") : $t("pay.cancel_pay")
        }}</a-button>
        <a-button
          type="primary"
          :disabled="subDisabled"
          :loading="subLoading"
          @click="handlePay"
          >{{
            route.query.source === "recharge" ? $t("pay.property_recharge_title") : $t("pay.confirmPay")
          }}</a-button
        >
      </div>
    </a-spin>
  </div>
  </div>

</template>

<script setup>
import { Modal } from 'ant-design-vue';
import { computed, getCurrentInstance, ref, onBeforeMount, reactive, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatTitle, formatNum2, formatPrice, currencySymbol, formatAmount, getCurrencyStr } from "@/utils/tools";
import {
  getBalance,
  getPoundage,
  userPay,
  getPayInfo,
  dictListConfigByCode,
} from "@/api/pay";
import CommonHeader from '@/components/layout/CommonHeader.vue'

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const loading = ref(false);

const amountInfo = reactive({
  balance: 0,
  balanceTrans: 0,
  handCharge: 0,
  handChargeTrans: 0,
  actualAmount: 0,
  actualAmountTrans: 0,
});

const payInfo = ref({});

const payMode = ref(undefined); // 所选支付方式
const payMethodList = ref([]); // 支持的支付渠道
const subLoading = ref(false);
const subDisabled = ref(true);

const getSuccessUrl = (defaultUrl) => {
  const successUrl =
    `${defaultUrl}?path=${route.query.source || ""}&payChannel=${payMode.value}`;
  return successUrl;
};

const payModeChange = async () => {
  loading.value = true;
  await getPoundage({
    amount: payInfo.value.amount.toFixed(0),
    payChannel: payMode.value,
  })
    .then((res) => {
      amountInfo.handCharge = res.data.poundage;
      amountInfo.handChargeTrans = res.data.poundageTrans;
      amountInfo.actualAmount = res.data.actualAmount;
      amountInfo.actualAmountTrans = res.data.actualAmountTrans;
      subDisabled.value = false;
    })
    .catch(() => {
      subDisabled.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
};

let failUrl = location.href;

// 确认支付
// 支付参数
const getPayParams = () => {
  const params = {
    _failCode: 1,
  };
  // 支付类型 0.订单 3.包裹
  params.payType = +route.query?.payType || 0;
  params.userPayId = +route.query?.userPayId || undefined;
  params.payChannel = payMode.value;
  params.payScene = 0;
  const successUrl = getSuccessUrl("https://qcelf.com/pay-success");
  params.callbackAddress = encodeURIComponent(successUrl);
  if (params.payChannel === 2) {
    params.cancelCallbackAddress = encodeURIComponent(failUrl);
  }
  return params;
};

const handlePay = async () => {
 console.log(0);
  try {
    console.log(1);
    if (payMode.value === null) {
       console.log(2);
      proxy.$message.info(proxy.$t("pay.common_please_select_channel"));

      return;
    }
    if (payMode.value === 0 || payMode.value === 1 || payMode.value === 2) {
      if (payMode.value === 2 && getCurrencyStr() === "CNY") {
        proxy.$message.warning(proxy.$t("pay.notApplyPayTip"));
        return;
      }
      // 余额,支付宝,paypal
      const params = getPayParams();
      let data;
      let success;
      subLoading.value = true;
      const res = await userPay(params);
      data = res.data;
      success = res.success;
      subLoading.value = false;
      if (payMode.value === 2 && data.outPayUrl) {
         window.open(data.outPayUrl, "_blank");
         confirm();
      } else {
         handlePaySuccess();
      }
    }
  } catch (e) {
    console.log("-pay-err");
    console.log(e);
    subLoading.value = false;
  }
};


const handlePaySuccess = () => {
  router.replace(getSuccessUrl("/pay-success"));
};
const handlePayFail = () => {
  subLoading.value = false;
};

onBeforeMount(async () => {
  // 支持的支付方式
  const payMethodData = await dictListConfigByCode({ code: "pay_method_config" });
  payMethodData.data.forEach((item) => {
    if (item.dictKey) {
      payMethodList.value.push(Number(item.dictValue));
    }
  });

  loading.value = true;
  const params = getPayParams();
  const { data } = await getPayInfo({
    payType: params.payType,
    userPayId: params.userPayId,
  });
  if (data) {
    payInfo.value.amount = data.payAmount;
    payInfo.value.amountTrans = data.payAmountTrans;
  }

  getBalance().then((res) => {
    amountInfo.balance = res.data.availableBalance;
    amountInfo.balanceTrans = res.data.availableBalanceTrans;
    if (amountInfo.balance < payInfo.value.amount || route.query.source === "recharge") {
       payMode.value = payMethodList.value[0];
       console.log(payMode.value);
    } else {
       payMode.value = 0;
    }
    payModeChange();
  });
});

const confirm = () => {
  Modal.confirm({
    title: proxy.$t("pay.payResult"),
    okText: proxy.$t("pay.paySuccess"),
    cancelText: proxy.$t("pay.payFail"),
    onOk() {
       router.replace(getSuccessUrl("/pay-success"));
    },
  });
};

</script>

<style>
.payIframe {
  width: 100%;
  height: 500px;
}
</style>
<style lang="less" scoped>
.countryFlag {
  display: inline-block;
  width: 20px;
  height: 14px;
}
:deep(.ant-radio) {
  padding: 0;
  margin: 0;
  top: 0;
}
:deep(.ant-radio-wrapper, .ant-radio-wrapper-checked) {
  display: flex;
  align-items: center;
}
:deep(.ant-radio-group, .ant-radio-group-outline) {
  width: 100%;
  .ant-radio-wrapper,
  .ant-radio-wrapper-checked {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .ant-radio-input {
    vertical-align: center;
  }
}
.typeImg {
  // width: 32px;
  height: 32px;
  margin-left: 24px;
  margin-right: 16px;
}
.whatImg {
  width: 14px;
  height: 14px;
}
.top-con {
  width: 710px;
}
.content {
    margin: 60px auto 0;
    max-width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #f3f3f3;
    animation: fadeIn 0.3s ease-in-out;
    .orderPayBox {
      width: 1200px;
      margin: 0 auto 30px;
      padding: 24px 0 0 0;
      background-color: #f3f3f3;
      .orderPayText {
        font-size: 20px;
        margin-bottom: 24px;
      }
      .successBox {
        padding: 20px 24px;
        background-color: #fff;
        .successText {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 16px;
        }
        .pleaseText {
          font-size: 14px;
          .pleaseTime {
            font-size: 22px;
            font-weight: 500;
          }
        }
        .countryBox {
          font-size: 14px;
          margin-top: 24px;
          :deep(.ant-select) {
            width: 290px;
            height: 36px;
            margin: 0 8px;
            &:not(.ant-select-customize-input) .ant-select-selector {
              border-radius: 4px;
            }
            .ant-select-selector {
              height: 36px;
              line-height: 36px;
              //   background-color: #f5f5f5;
              padding-left: 12px;
              //   border: none;
            }
            // 文字垂直居中
            .ant-select-selection-item {
              height: 36px;
              line-height: 36px;
              // background-color: #f5f5f5;
            }
            .ant-select-selection-search-input {
              height: 36px;
              line-height: 36px;
            }
          }
        }
      }
      .payTypeBox {
        margin-top: 16px;
        padding: 26px 24px 20px;
        padding-bottom: 75px;
        background-color: #fff;
        .payTypeTitle {
          font-size: 18px;
          font-weight: 500;
          padding-bottom: 26px;
        }
        .transfer {
          width: 1128px;
          height: 58px;
          padding: 0 16px;
          background: rgba(11, 213, 210, 0.11);
          border-radius: 8px;
          color: #111111;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          .en {
            font-family: FZCCHJW--GB1, FZCCHJW--GB1;
            color: #06bab8;
            font-weight: 500;
            margin-right: 40px;
          }
          // .zh {
          //   margin: 0 40px 0 16px;
          // }
          .btn {
            padding: 6px 28px;
            height: auto;
            border: 1px solid #ff1e05;
            border-radius: 4px;
            font-size: 18px;
            color: #ff1e05;
            font-weight: 500;
          }
        }
        .typeBox {
          width: 100%;
          border-top: 1px solid #e0e0e0;
          // border: 1px solid #e0e0e0;
          // border-bottom: none;
          .typeRow {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // align-items: center;
            padding: 24px;
            // border-bottom: 1px solid #e0e0e0;
            .typeRowTop {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .cardPicBox {
                display: flex;
                align-items: center;
                margin-left: 24px;
                img {
                  height: 24px;
                  margin-right: 4px;
                }
              }
              .stripe {
                img {
                  height: 20px;
                  margin-right: 16px;
                }
                .stripe-icon {
                  height: 32px;
                }
                .line {
                  width: 1px;
                  height: 24px;
                  background-color: #eee;
                  margin-right: 16px;
                }
                // .wechatpay,
                // .alipay {
                //   height: 34px;
                // }
              }
            }
            .typeRowBottom {
              // background-color: #fff7e6;
              margin-top: 22px;
              margin-bottom: 13px;
              // padding: 0 px;
              // height: 24px;
              // line-height: 24px;
              font-size: 12px;
              color: #a65921;
              margin-left: 48px;
              // overflow: hidden;
              // display: -webkit-box;
              // -webkit-box-orient: vertical;
              // -webkit-line-clamp: 1;
              // word-break: break-all;
              // text-overflow: ellipsis;
              .warning {
                background: #fff7e6;
                border-radius: 4px;
                padding: 4px 8px;
              }
              .bill-address {
                font-size: 14px;
                margin-top: 10px;
                .label {
                  color: #111;
                  margin-bottom: 5px;
                }
                .value {
                  color: #080808;
                  font-size: 12px;
                }
                .address-right {
                  color: var(--primary-color);
                  .add-bill-address {
                    cursor: pointer;
                  }
                }
              }
            }
            .moneyText {
              margin-right: 4px;
              line-height: 32px;
              font-weight: 500;
            }
            .typeRowRight {
              display: flex;
              // justify-content: flex-end;
              align-items: center;
              font-size: 12px;
              width: 800px;
              .rightTip {
                background-color: #fff7e6;
                color: #a65921;
                padding: 0 8px;
                height: 24px;
                font-size: 12px;
                line-height: 24px;
                border-radius: 4px;
              }
              :deep(.ant-btn) {
                height: 32px;
                border-radius: 16px;
                padding: 0 32px;
                margin-left: 16px;
              }
              .rightText {
                color: #666666;
                // font-size: 12px;
              }
            }
          }
        }
        .paypal {
          padding: 24px;
          display: flex;
          align-items: center;
          padding-left: 40px;

          .moneyText {
            margin-right: 4px;
            line-height: 32px;
            font-weight: 500;
            margin-right: 20px;
          }
          .moneyText2 {
            cursor: pointer;
            color: #1890ff;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }

      .confirmPay {
        width: 100%;
        height: 90px;
        padding: 0 24px;
        background-color: #fff;
        box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);
        display: flex;
        justify-content: flex-end;
        align-items: center;
        :deep(.ant-btn) {
          border: none;
          padding: 0 30px;
          font-size: 18px;
          height: 56px;
          line-height: 56px;
          margin-left: 20px;
          font-weight: 500;
        }
        .back {
          color: #333;
          font-size: 16px;
          border: 1px solid #cccccc;
          border-radius: 4px;
        }
        .confirmPayLeft {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          .confirmPayTop {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .money-con {
              display: flex;
              align-items: baseline;
            }
            .HuoBi {
              font-size: 14px;
              color: var(--amount-color);
              margin-left: 12px;
            }
            .money {
              font-size: 24px;
              color: var(--amount-color);
              font-weight: 500;
            }
          }
          .confirmPayBottom {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .sxf {
              margin-left: 10px;
            }
          }
        }
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
            border: none;
            padding: 0 30px;
            height: 40px;
            font-size: 18px;
            margin: 0 10px;
            font-weight: 500;
          }
          .jiXu {
            border: 1px solid #cccccc;
          }
        }
      }
    }
}
</style>
