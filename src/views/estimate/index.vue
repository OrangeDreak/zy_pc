<template>
  <div class="estima">
    <!-- 使用公共头部 -->
    <common-header />

    <div class="form">
      <div class="title">{{ $t("estimate.ShippingCostEstimate") }}</div>
      <div class="tips">{{ $t("estimate.estTip1") }}</div>
      <div class="con">
        <div class="left">
          <div class="popOut">
            <div class="form-item country-select-box">
              <span class="label required">{{ $t("estimate.WarehouseTo") }}</span>
              <SelectCountry ref="refSelectCountry" @countryChange="countryChange">
                <div class="value-con country-con">
                  <a-input
                    v-model:value="countryName"
                    :bordered="false"
                    :placeholder="$t('estimate.selectCountry')"
                    style="width: 100%; padding: 0 11px"
                    @click.stop="openCountryPopver"
                    @change="countryInput"
                  >
                    <template #suffix>
                      <span v-if="countryName" class="close-icon">
                        <CloseOutlined @click.stop="handleClear" />
                      </span>
                    </template>
                  </a-input>
                  <svg-icon class="arrow-icon" name="arrow-down" @click.stop></svg-icon>
                </div>
              </SelectCountry>
            </div>
          </div>
          <div class="form-item w420">
            <span class="label required">{{ $t("estimate.weight") }}</span>
            <div class="value-con">
              <a-input
                v-model:value="estimaForm.weight"
                :bordered="false"
                :placeholder="$t('estimate.pleaseInputWeight')"
                style="width: 100%"
                @change="weightInput"
                @pressEnter="searchBtn"
              ></a-input>
            </div>
          </div>

          <div class="popOut">
            <div class="productTypeSelect">
              <a-cascader
                ref="refProductType"
                v-model:value="estimaForm.productType"
                :options="productTypeList.data"
                multiple
                show-search
                expand-trigger="hover"
                :max-tag-count="1"
                :style="{
                  height: '36px',
                  width: '484px',
                  'line-height': '36px',
                  'margin-right': '16px',
                  background: '#fff',
                  'border-radius': '4px',
                }"
                :field-names="{
                  label: i18n.locale.value == 'zh' ? 'labelName' : 'labelNameEn',
                  value: 'labelId',
                }"
                :display-render="displayRender"
                :placeholder="$t('estimate.selectPlaceholder')"
              >
              </a-cascader>
              <svg-icon class="arrow-icon" name="arrow-down"></svg-icon>
              <div class="selectAb">
                <span>{{ $t("estimate.ProductTypes") }}</span>
              </div>
            </div>
          </div>
          <div class="form-item w420">
            <div class="flex-1">
              <span class="label">{{ $t("estimate.long") }}</span>
              <div class="value-con">
                <a-input
                  v-model:value="estimaForm.length"
                  :bordered="false"
                  placeholder="cm"
                  style="width: 100%"
                  @change="lengthInput"
                  @pressEnter="searchBtn"
                ></a-input>
              </div>
            </div>
            <div class="flex-1">
              <span class="label">{{ $t("estimate.width") }}</span>
              <div class="value-con">
                <a-input
                  v-model:value="estimaForm.width"
                  :bordered="false"
                  placeholder="cm"
                  style="width: 100%"
                  @change="widthInput"
                  @pressEnter="searchBtn"
                ></a-input>
              </div>
            </div>
            <div class="flex-1">
              <span class="label">{{ $t("estimate.height") }}</span>
              <div class="value-con">
                <a-input
                  v-model:value="estimaForm.height"
                  :bordered="false"
                  placeholder="cm"
                  style="width: 100%"
                  @change="heightInput"
                  @pressEnter="searchBtn"
                ></a-input>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <el-button class="search-btn" type="primary" :loading="loading" @click="searchBtn">{{
            $t("estimate.Inquire")
          }}</el-button>
        </div>
      </div>
    </div>
    <div v-if="!pageLoading">
      <div v-if="lineData.length" class="table-data">
        <div class="tips">
          {{ $t("estimate.estTip2") }}
          <!-- <span class="btn">物流服务说明</span> -->
        </div>
        <div class="line-data">
          <a-spin :spinning="loading">
            <template v-for="(item, i) in lineData" :key="i">
              <div :class="['list', item.checkFlag === 0 ? 'disabled' : '']">
                <div :class="{ box: true, boxActive: selectedLine === i }">
                  <div class="con">
                    <div class="poster">
                      <div class="img">
                        <img class="icon" :src="item.logisticsLineIcon" alt="" />
                        <a-popover trigger="click" placement="right">
                          <template #content>
                            <pre class="ff-p4 qa-text insurance-desc">{{ item.insuranceDesc }}</pre>
                          </template>
                          <img
                            v-if="item.configureInsurance"
                            class="insurance"
                            src="@/assets/images/icon/insurance.png"
                            alt=""
                          />
                        </a-popover>
                      </div>

                      <div class="name">
                        {{ formatTitle(item, "logisticsLineName", "en") }}
                      </div>
                      <div v-if="item.includeTaxes" class="tax">
                        {{ $t("estimate.taxExemption") }}
                      </div>
                    </div>
                    <div class="amount">
                      <div class="col999 qa">
                        {{ $t("estimate.TransportationCosts") }}
                        <a-popover>
                          <template #content>
                            <pre class="ff-p4 qa-text">{{ item.volumeWeightDesc }}</pre>
                          </template>
                          <img src="@/assets/images/icon/qa.png" alt="" />
                        </a-popover>
                      </div>
                      <div class="num">{{ formatPrice(item, "totalFreightPrice") }}</div>
                    </div>
                    <div class="time">
                      <span class="col999">{{ $t("estimate.ShippingTime") }}</span>
                      <div>
                        {{ item.logisticsTimeMin }}-{{ item.logisticsTimeMax }}&nbsp;<span
                          class="day"
                          >{{ $t("estimate.dayText") }}</span
                        >
                      </div>
                    </div>
                    <div class="desc col999">
                      <pre v-if="selectedLine === i" class="block-word desc-text"
                        >{{ item.logisticsLineDesc }}
                      </pre>
                      <div v-else class="desc-text">
                        {{ item.logisticsLineDesc }}
                      </div>
                    </div>
                    <div class="action">
                      <!-- :class="['btn', item.checkFlag === 0 ? 'disabled' : '']"
                      :disabled="item.checkFlag === 0" -->
                      <div class="btn-box">
                        <a-button
                          v-if="selectedLine !== i"
                          color="#FF1E05"
                          class="btn"
                          @click="onSelect(i)"
                          >{{ $t("estimate.lookDetail") }}</a-button
                        >
                      </div>
                      <div class="edit-btn-box">
                        <a-button
                          v-show="selectedLine === i"
                          color="#666"
                          plain
                          class="edit-btn"
                          @click="selectedLine = undefined"
                          >{{ $t("estimate.pack_up") }}</a-button
                        >
                      </div>
                    </div>
                  </div>

                  <div v-if="item.notice" class="notice">{{ item.notice }}</div>
                </div>
                <div
                  v-if="item.uncheckDesc?.length > 0"
                  :class="{ tipBottomBox: true, tipBottomBoxActive: selectedLine === i }"
                >
                  <div class="tipBottomBoxInner">
                    {{ $t("estimate.UnavailableReason") }}：
                    <template v-for="(child, j) in item.uncheckDesc" :key="j"
                      >{{ child }}；</template
                    >
                  </div>
                </div>
                <LineDetail
                  v-if="selectedLine === i"
                  :id="i"
                  :selected-line="selectedLine"
                  :father-data="item"
                  :country-name="countryName"
                ></LineDetail>
              </div>
            </template>
          </a-spin>
        </div>
      </div>
      <div v-else-if="!lineData.length && !searched" class="no-data">
        <span class="tips">{{ $t("estimate.estTip4") }}</span>
      </div>
      <div v-else>
        <a-empty class="no-data no-data-empty" />
      </div>
    </div>
    <div v-if="pageLoading" class="no-data no-data-empty no-data-loading">
      <a-spin></a-spin>
    </div>
  </div>
  <common-footer />
</template>

<script setup>
import { reactive, ref, computed, getCurrentInstance, onMounted, onBeforeMount } from "vue";
import { message } from "ant-design-vue";
import LineDetail from "./line-detail.vue";
import SelectCountry from "@/components/SelectCountry/index.vue";
import { useRoute } from "vue-router";
import { estimateCalculate, productTypeLabelListAll } from "@/api/order";
import { CloseOutlined } from '@ant-design/icons-vue';
import 'ant-design-vue/dist/reset.css';
import { formatTitle, formatPrice } from "@/utils/tools";
import { useI18n } from 'vue-i18n'
const i18n = useI18n();
import CommonHeader from '@/components/layout/CommonHeader.vue'
import CommonFooter from '@/components/layout/CommonFooter.vue'



const route = useRoute();

const loading = ref(false);
const searched = ref(false); // 是否请求过接口
const { proxy } = getCurrentInstance();
const pageLoading = ref(false);

const countryName = ref(null);

const productTypeList = reactive({ data: [] });

// 测算表单
const estimaForm = reactive({
  country: null,
  weight: null,
  productType: [],
  length: "",
  width: "",
  height: "",
});

const visibleSelect = ref(false);

const refSelectCountry = ref();
const openCountryPopver = () => {
  refSelectCountry.value.openPopver();
};
const handleClear = () => {
  countryName.value = "";
  estimaForm.country = null;
  refSelectCountry.value.countrySearch(countryName.value);
};

const countryInput = () => {
  if (countryName.value === "") {
    estimaForm.country = null;
  }
  refSelectCountry.value.countrySearch(countryName.value);
};

const countryChange = (item) => {
  estimaForm.country = item.id;
  countryName.value = `${item.areaEnName} ${item.areaName}`;
};

const selectThis = (item) => {
  estimaForm.country = item.id;
  const afterName = i18n.locale.value === "zh" ? `-${item.areaName}` : "";
  countryName.value = item.areaEnName + afterName;
  console.log(afterName, countryName.value, "name");
  visibleSelect.value = false;
};

// 线路
const selectedLine = ref();
const lineData = ref([]);
const onSelect = (i) => {
  console.log(i, "i");
  selectedLine.value = i;
};

const productTypeLabelListAllFun = async () => {
  const res = await productTypeLabelListAll();

  productTypeList.data = (res?.data || []).map((item) => {
    item.labelNameEn = item.labelNameEn.replace("&amp;", "&");
    return item;
  });
};

const searchBtn = async () => {
  if (!estimaForm.country && estimaForm.country !== 0) {
    message.warning(proxy.$t("estimate.please_select_country"));
    return;
  }
  if (!estimaForm.weight) {
    message.warning(proxy.$t("estimate.pleaseInputWeight"));
    return;
  }
  loading.value = true;
  pageLoading.value = true;
  console.log(estimaForm.productType);
  const productTypes = [];
  const productTypeLevel1 = productTypeList.data.map((item) => item.labelId);

  estimaForm.productType.forEach((item) => {
    if (item.length === 1 && productTypeLevel1.indexOf(item[0]) > -1) {
      const index = productTypeLevel1.indexOf(item[0]);
      const level2 = productTypeList.data[index].children.map((child) => child.labelId);
      productTypes.push(...level2);
    } else {
      productTypes.push(...item);
    }
  });
  const data = {
    areaLibraryId: estimaForm.country,
    weight: Number(estimaForm.weight),
    labelId: productTypes,
    length: Number(estimaForm.length),
    width: Number(estimaForm.width),
    height: Number(estimaForm.height),
  };
  try {
    const res = await estimateCalculate(data);
    // console.log('123', '33');
    searched.value = true;
    lineData.value = res?.data;
    loading.value = false;
    pageLoading.value = false;
  } catch {
    loading.value = false;
    pageLoading.value = false;
  }
};

const displayRender = ({ labels, selectedOptions }) => {
  //console.log(labels);

  // console.log(selectedOptions);
  // return labels.join("/");
  if (labels.length > 1) {
    return labels.join("/");
  } else if (labels.length === 1) {
    let str = "";
    selectedOptions[0].children.forEach((item) => {
      str += `${formatTitle(selectedOptions[0], "labelName", "En")}/${formatTitle(
        item,
        "labelName",
        "En",
      )};`;
    });
    return str;
  }
};

const weightInput = (e) => {
  // console.log(e, 'we');
  let value = e.target.value.replace(/[^0-9.]/g, "");
  // 1. 必须为数字，只保留数字和小数点
  // value = value.replace(/[^0-9.]/g, '');
  // 2. 只能有一个小数点
  value = value.replace(/(\..*?)\./g, "$1");
  // 3. 小数点后保留两位小数
  value = value.replace(/(\.\d{2})./g, "$1");
  // 4. 第一位输入小数点的时候自动补全，补为 0.
  if (value.startsWith(".")) {
    value = `0${value}`;
  }
  // 5. 除非是小数，否则数字不能以0开头
  value = value.replace(/^(0+)(\d)/, "$2");
  console.log(value, "value");
  estimaForm.weight = value;
};

const lengthInput = (e) => {
  let value = e.target.value.replace(/[^0-9.]/g, "");
  // 1. 必须为数字，只保留数字和小数点
  // value = value.replace(/[^0-9.]/g, '');
  // 2. 只能有一个小数点
  value = value.replace(/(\..*?)\./g, "$1");
  // 3. 小数点后保留1位小数
  value = value.replace(/(\.\d{1})./g, "$1");
  // 4. 第一位输入小数点的时候自动补全，补为 0.
  if (value.startsWith(".")) {
    value = `0${value}`;
  }
  // 5. 除非是小数，否则数字不能以0开头
  value = value.replace(/^(0+)(\d)/, "$2");
  console.log(value, "value");
  if (value > 10000) {
    value = "10000";
  }
  estimaForm.length = value;
};

const widthInput = (e) => {
  let value = e.target.value.replace(/[^0-9.]/g, "");
  // 1. 必须为数字，只保留数字和小数点
  // value = value.replace(/[^0-9.]/g, '');
  // 2. 只能有一个小数点
  value = value.replace(/(\..*?)\./g, "$1");
  // 3. 小数点后保留1位小数
  value = value.replace(/(\.\d{1})./g, "$1");
  // 4. 第一位输入小数点的时候自动补全，补为 0.
  if (value.startsWith(".")) {
    value = `0${value}`;
  }
  // 5. 除非是小数，否则数字不能以0开头
  value = value.replace(/^(0+)(\d)/, "$2");
  console.log(value, "value");
  if (value > 10000) {
    value = "10000";
  }
  estimaForm.width = value;
};

const heightInput = (e) => {
  let value = e.target.value.replace(/[^0-9.]/g, "");
  // 1. 必须为数字，只保留数字和小数点
  // value = value.replace(/[^0-9.]/g, '');
  // 2. 只能有一个小数点
  value = value.replace(/(\..*?)\./g, "$1");
  // 3. 小数点后保留1位小数
  value = value.replace(/(\.\d{1})./g, "$1");
  // 4. 第一位输入小数点的时候自动补全，补为 0.
  if (value.startsWith(".")) {
    value = `0${value}`;
  }
  // 5. 除非是小数，否则数字不能以0开头
  value = value.replace(/^(0+)(\d)/, "$2");
  console.log(value, "value");
  if (value > 10000) {
    value = "10000";
  }
  estimaForm.height = value;
};


onBeforeMount(() => {
  productTypeLabelListAllFun();

  if (route.query.productWeight) {
    estimaForm.weight = route?.query?.productWeight;
  }
});
onMounted(() => {
  //refSelectCountry.value.getAreaCode(route.query.country ? Number(route.query.country) : "");
});
</script>

<style lang="less" scoped>
.qa-text {
  color: #666;
  font-size: 12px;
  max-width: 350px;
  white-space: pre-wrap;
}
.insurance-desc {
  max-width: 450px;
}
.btn-box {
  :deep(.ant-btn) {
    // background-color: rgba(0, 0, 0, 0.2);
    background-color: #c803be;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    // border-color: rgba(0, 0, 0, 0.2);
    border: none;
    .ant-btn:hover,
    .ant-btn:focus {
      color: none;
      // border-color: none;
      // border-color: rgba(0, 0, 0, 0.2);
      border: none;
    }
  }
  :deep(.ant-btn):hover,
  :deep(.ant-btn):focus,
  :deep(.ant-btn):active {
    color: #fff;
    // color: #333;
    // border-color: transparent;
    // border-color: rgba(0, 0, 0, 0.2);
    border: none;
  }
}
.edit-btn-box {
  :deep(.ant-btn) {
    // background-color: rgba(0, 0, 0, 0.2);
    background-color: #fff;
    color: #c803be;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    border-color: #c803be;
    padding: 0 26px;
    // border: none;
    .ant-btn:hover,
    .ant-btn:focus {
      // color: #333;
      // border-color: none;
      // border-color: #e2e8f0;
      // border: none;
    }
  }
  // :deep(.ant-btn):hover,
  // :deep(.ant-btn):focus,
  // :deep(.ant-btn):active {
  //   // color: #fff;
  //   color: #333;
  //   // border-color: transparent;
  //   border-color: #e2e8f0;
  //   // border: none;
  // }
}
.countryFlag {
  display: inline-block;
  width: 24px;
  height: 18px;

  // top: 10px;
}
.popOut {
  display: flex;
  align-items: flex-start;
  width: 484px;
  margin-right: 20px;
}
.popContent {
  width: 440px;
  padding: 20px 0 24px;
  :deep(.ant-input-affix-wrapper) {
    height: 36px;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .head {
    padding: 0 20px;
  }
  .count-list {
    color: #333;
    max-height: 396px;
    overflow-y: auto;
    .selectOptions {
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      &:hover {
        background-color: #f8f8f8;
      }
      img {
        width: 24px;
        height: 18px;
      }
      text {
        display: inline-block;
        width: 320px;
      }
    }
    .svg {
      font-size: 24px;
      color: #ff4d18;
      span {
        display: none;
      }
    }
    .active {
      background-color: #f8f8f8;
      .svg span {
        display: inline-block;
      }
    }
  }
}
.estima {
  width: 1200px;
  margin: 20px auto 38px;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  .form {
    margin-top: 80px;
    height: 350px;
    padding: 45px 40px 0;
    line-height: normal;
    // background-color: #ccc;
    background-image: url("@/assets/images/common/esBg.png");
    background-position: center;
    background-size: cover;
    .title {
      font-size: 40px;
      font-weight: 500;
      color: #fff;
      text-align: center;
      // margin-bottom: 40px;
    }
    .tips {
      font-size: 20px;
      font-weight: 500;
      color: #fff;
      text-align: center;
      margin: 15px 0 38px;
    }

    .con {
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        flex-grow: 1;
        flex-wrap: wrap;
      }
      .right {
        .search-btn {
          background-color: #c803be;
          width: 128px;
          height: 92px;
          font-size: 18px;
        }
      }
    }
    .form-item {
      display: flex;
      align-items: center;
      width: 484px;
      height: 36px;
      padding: 0 16px;
      background-color: #fff;
      border-radius: 4px;
      &:first-child,
      &:nth-child(2) {
        margin-bottom: 18px;
      }
      .label {
        padding-right: 10px;
      }

      .value-con {
        flex-grow: 1;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        padding-right: 5px;
        .close-icon {
          display: inline-flex;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #00000040;
          color: #fff;
          font-size: 6px;
          justify-content: center;
          align-items: center;
          opacity: 0.9;
          cursor: pointer;
        }
        .arrow-icon {
          position: absolute;
          right: -5px;
          top: 11px;
          color: #666;
        }
      }
      .country-con {
        height: 36px;
        :deep(.ant-input) {
          height: 36px;
        }
      }

      .required {
        &::before {
          display: inline-block;
          margin-right: 4px;
          color: #ff4d4f;
          font-size: 14px;
          line-height: 1;
          content: "*";
        }
      }
      .flex-1 {
        flex: 1;
        display: flex;
        align-items: center;
        .label {
          padding-right: 0px;
          flex-shrink: 0;
        }
      }
    }
    .w420 {
      width: 420px;
    }
  }
}
.backBox {
  color: var(--primary-color);
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
}
.table-data {
  .tips {
    font-size: 14px;
    color: #666;
    margin: 20px 0;
    .btn {
      color: #155bd4;
      cursor: pointer;
    }
  }
}
.line-data {
  border: 1px solid #eeeeee;
  .list {
    font-size: 12px;
    border-bottom: 1px solid #eeeeee;
    .box {
      padding: 24px;
    }
    .boxActive {
      background-color: #f8f8f8;
    }
    .tipBottomBox {
      // width: 552px;
      width: 100%;
      padding: 0px 24px 0px 24px;
      margin-bottom: 24px;
      // height: 32px;

      .tipBottomBoxInner {
        background: #fff7e5;
        border-radius: 4px;
        // height: 32px;
        display: flex;
        padding: 5px 12px;
        align-items: center;
        color: #bf734d;
        margin-bottom: 4px;
        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
    .tipBottomBoxActive {
      background-color: #f8f8f8;
      padding-bottom: 24px;
      .tipBottomBoxInner {
        background: #fff7e5;
        border-radius: 4px;
        height: 32px;
        display: flex;
        align-items: center;
        padding-left: 12px;
        color: #bf734d;
      }
    }
    &:last-child {
      border-bottom: none;
    }
    &.active {
      background-color: #eeeeee;
    }
    &.disabled {
      .poster {
        opacity: 0.6;
      }
      .amount {
        opacity: 0.6;
      }
      .time {
        opacity: 0.6;
      }
      .desc {
        opacity: 0.6;
      }
      // opacity: 0.6;
      // .name {
      color: #999999;
      // }
      // .action {
      //   opacity: 1;
      // }
    }
    .col999 {
      color: #999999;
    }
    .col333 {
      color: #333333;
    }
    .con {
      display: flex;
      justify-content: space-between;
    }
    .poster {
      width: 10%;
      text-align: center;
      .img {
        height: 60px;
        width: 60px;
        margin: 0 auto;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(0, 0, 0, 0.08);
        .icon {
          width: 60px;
        }
        .insurance {
          width: 15px;
          position: absolute;
          right: 0;
          bottom: 0;
          cursor: pointer;
        }
      }
      .name {
        font-weight: 500;
        font-size: 12px;
        margin-top: 5px;
      }
      .tax {
        display: inline-block;
        font-size: 12px;
        color: #2abd6c;
        font-weight: 500;
        line-height: normal;
        background: #e3f5e8;
        border-radius: 4px;
      }
    }
    .amount {
      width: 12%;
      padding-left: 10px;
      .num {
        font-weight: 500;
        font-size: 22px;
        line-height: 24px;
        margin: 2px 0;
      }
      .rule {
        display: flex;
        align-items: center;
      }
      .col999 {
        line-height: 16px;
      }
      .col333 {
        font-size: 12px;
        line-height: 16px;
      }
    }
    .qa {
      // display: flex;
      // align-items: center;
    }

    .time {
      width: 13%;
      font-size: 12px;
      // text-align: center;
      div {
        font-weight: 500;
        font-size: 22px;
        line-height: 24px;
      }
      .day {
        font-size: 12px;
        color: #999;
      }
    }
    .desc {
      width: 35%;
      .desc-text {
        font-family: PingFang SC, PingFangSC-Regular;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        word-break: break-word;
        text-overflow: ellipsis;
      }
      .block-word {
        display: block;
        white-space: pre-wrap;
      }
    }
    .action {
      // width: 15%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .notice {
      background: #fff7e6;
      border-radius: 4px;
      color: #bf734d;
      margin-top: 10px;
      padding: 5px 16px;
    }
  }
  // .btn {
  //   // width: 80px;
  //   height: 32px;
  //   padding: 0 12px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   font-weight: normal;
  //   font-size: 14px;
  //   line-height: 16px;
  //   font-weight: 400;
  //   &.disabled {
  //     background-color: #cccccc !important;
  //     border-color: #ccc !important;
  //   }
  // }
  // .edit-btn {
  //   // width: 80px;
  //   height: 32px;
  //   padding: 0 12px;
  //   font-size: 14px;
  //   line-height: 16px;
  //   font-weight: 400;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   font-weight: normal;
  // }
}
.no-data {
  height: 720px;
  padding-top: 100px;
  display: flex;
  // justify-content: center;
  flex-direction: column;
  align-items: center;
  .tips {
    color: #666666;
    font-size: 18px;
  }
}
.no-data-empty {
  justify-content: center;
}
.no-data-loading {
  justify-content: flex-start;
}
:deep(.ant-select) {
  height: 36px;

  .ant-select-selector {
    height: 36px;
    line-height: 36px;
    // background-color: #f5f5f5;
    padding-left: 146px;
    // border: none;
  }

  // 文字垂直居中
  .ant-select-selection-item {
    height: 36px;
    line-height: 36px;
    // background-color: #f5f5f5;
  }
  .ant-select-selection-search {
    height: 36px;
    line-height: 36px;
    .ant-select-selection-search-input {
      height: 36px;
      line-height: 36px;
    }
  }
  .ant-select-selection-placeholder {
    height: 36px;
    line-height: 36px;
  }
}
.countrySelect {
  position: relative;
  height: 36px;
  .selectAb {
    position: absolute;
    top: 9px;
    left: 16px;
    .redRequire {
      color: red;
    }
  }
  .arrow-icon {
    font-size: 14px;
  }
}
.productTypeSelect {
  position: relative;
  height: 36px;
  .selectAb {
    position: absolute;
    top: 9px;
    left: 16px;
    .redRequire {
      color: red;
    }
  }
  .arrow-icon {
    position: absolute;
    top: 10px;
    right: 27px;
    font-size: 14px;
    color: #666;
  }
  :deep(.ant-select-selection-placeholder) {
    left: 146px;
  }
  :deep(.ant-select .ant-select-selector) {
    line-height: 32px;
    padding-top: 0;
  }
  :deep(.ant-select-selection-item) {
    height: 32px;
    line-height: 32px;
    margin-top: 0;
    margin-bottom: 2px;
  }
  :deep(.ant-select-multiple .ant-select-selection-item-content) {
    max-width: 220px;
  }
}
.countrySelectTran {
  :deep(.ant-select-selector) {
    padding-left: 190px;
  }
}
</style>
