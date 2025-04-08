<template>
  <!-- 充值弹窗 -->
  <a-modal
    ref="rechargeFormRef"
    v-model:visible="val"
    :footer="null"
    :mask-closable="false"
    :title="$t('assets.balance.rechargeMoney') + '(CNY)'"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      ref="rechargeFormRef"
      :model="formState"
      name="basic"
      :label-col="{ span: 0 }"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :rules="rules"
    >
      <a-form-item label="" name="money">
        <div class="rechargeInput"></div>
        <a-input
          v-model:value="formState.money"
          :precision="16"
          type="number"
          style="width: 100%"
          :controls="false"
          :placeholder="t('assets.balance.inputPlaceholder')"
        />
        <div>
          <p class="trans">{{ rechargeTrans }}</p>
        </div>
      </a-form-item>
    </a-form>
    <div class="rechargeFooter">
      <a-button class="cancelBtn" @click="handleCancel()">{{ t("submit.global_cancel") }}</a-button>
      <a-button type="primary" @click="handleOk()">{{ t("submit.gloabl_confirm") }}</a-button>
    </div>
  </a-modal>
</template>

<script setup>
import { reactive, ref, computed, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { charge } from "@/api/balance";
import { formatTitle, formatNum2, formatPrice, currencySymbol, getCurrencyStr, formatAmount } from "@/utils/tools";
const { t } = useI18n();
const router = useRouter();
const { proxy } = getCurrentInstance();
const props = defineProps({
  exchange: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["finish"]);

const val = ref(false);
const rechargeFormRef = ref(null);

const validateMoney = async (_rule, value) => {
  if (!value) {
    return Promise.resolve();
  }
  const val = value.replace(/[^\d.]/g, "");
  formState.money = val;
  return Promise.resolve();
};

const formState = reactive({ money: null });

const opRechargeModal = () => {
  val.value = true;
};

const rechargeTrans = computed(() => {
  const ex = props.exchange;
  const num = formState.money;
  const symbol = getCurrencyStr();
  if (ex > 0 && num) {
    return `≈ ${symbol} ${(num / ex).toFixed(2)}`;
  } else {
    return `≈ ${symbol} `;
  }
});

const handleOk = async () => {
  try {
    const values = await rechargeFormRef.value.validateFields();

    const res = await charge({ amount: Math.ceil(formState.money * 100) });
    if (res?.success) {
      val.value = false;
      formState.money = null;
      emit("finish", {
        amount: Math.ceil(formState.money * 100),
        source: "recharge",
        userPayId: res?.data?.userPayId,
      });
    }
  } catch (error) {
    console.log(error, "error");
  }
};
const handleCancel = async () => {
  formState.money = null;
  val.value = false;
  rechargeFormRef.value.resetFields?.();
};

const rules = {
  money: [
    {
      required: true,
      message: t("assets.balance.rechargeIptTip"),
      trigger: "change",
    },
  ],
};

defineExpose({
  opRechargeModal,
});
</script>

<style lang="less" scoped>
.trans {
  line-height: normal;
  color: #999;
  font-size: 16px;
  margin-top: 5px;
}
.rechargeFooter {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  :deep(.ant-btn) {
    border: none;
    color: #fff;
    border-radius: 2px;
  }
  .cancelBtn {
    color: #000;
    border: 1px solid #ddd;
    margin-right: 10px;
  }
}
.moneyType {
  margin-left: 5px;
}
</style>
