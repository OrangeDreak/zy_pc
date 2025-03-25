<template>
  <div class="waybill">
    <a-spin :spinning="loading">
      <div class="nav">{{ $t("submit.subMitYunOrder") }}</div>
      <section class="address">
        <div class="item-title">
          {{ $t("submit.address") }}
        </div>
        <div class="info">
          <div v-if="addressInfo.id" class="con">
            <div class="top">
              <span class="name">{{ addressInfo.userName }}</span>
              <span class="phone">{{ addressInfo.phone }}</span>
              <span class="code">{{ addressInfo.code }}</span>
            </div>
            <div class="bottom">
              <span v-if="addressInfo.default" class="tag">{{ $t("submit.default") }}</span>
              <span class="area">{{ addressInfo.address }}</span>
            </div>
          </div>
        </div>
      </section>
      <section class="goods">
        <div class="item-title">{{ $t("submit.commodity_list") }}</div>
        <div class="data-table">
          <div class="header">
            <div class="left-info">
              <div
                      v-for="(child, index) in leftColumns"
                      :key="child.dataIndex"
                      :class="['column', index !== 0 ? 'center' : 'pdlt']"
                      :style="{
                  width: child.width,
                }"
              >
                {{ child.title }}
              </div>
            </div>
            <div class="right-info">
              <div
                      v-for="child in rightColumns"
                      :key="child.dataIndex"
                      class="column center"
                      :style="{
                  width: child.width,
                }"
              >
                {{ child.title }}
              </div>
            </div>
          </div>
          <template v-if="dataSource.list.length">
            <div class="content">
              <div v-for="(item, i) in dataSource.list" :key="item.id" class="list">
                <div class="goods-list">
                  <div class="left-info">
                    <template v-for="goods in item.skuDetailList" :key="goods.productId">
                      <div class="item-list">
                        <div class="detail cell" :style="{ width: leftColumns[0].width }">
                          <div class="checkbox"></div>
                          <div class="poster">
                            <a-image :width="80" height="auto" :src="goods.headPic" />
                          </div>
                          <div class="product-info">
                            <div class="info">
                              <div class="product">
                                <div v-if="goods.logisticsNumber" class="title">
                                  {{ $t("submit.orderNo") }}：{{ goods.logisticsNumber }}
                                </div>
                                <div class="title" :title="$formatTitle(goods, 'productName')">
                                  {{ $formatTitle(goods, "productName") }}
                                </div>
                                <div class="size">
                                  <template v-if="goods.attrs">
                                    <span v-for="(sku, index) in goods.attrs" :key="index">
                                      <span
                                      >{{ $formatTitle(sku, "attrName") }}:{{
                                          $formatTitle(sku, "attrValue")
                                        }}&nbsp;</span
                                      >
                                    </span>
                                  </template>
                                </div>
                                <div class="order-no">{{ goods.subOrderNo }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="cell center" :style="{ width: leftColumns[1].width }">
                          ×{{ goods.skuNum }}
                        </div>
                        <div class="cell center type" :style="{ width: leftColumns[2].width }">
                          <template v-if="goods.packageTypeList">
                            <span
                                    v-for="tag in $t('langProp')
                                ? goods.packageTypeListTrans
                                : goods.packageTypeList"
                                    :key="tag"
                                    class="tag"
                            >{{ tag }}</span
                            >
                          </template>
                          <template v-else>
                            <span
                                    v-for="tag in $t('langProp')
                                ? item.packageTypeListTrans
                                : item.packageTypeList"
                                    :key="tag"
                                    class="tag"
                            >{{ tag }}</span
                            >
                          </template>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="right-info">
                    <div class="cell center time" :style="{ width: rightColumns[0].width }">
                      <span class="createTime">{{ item.warehousingTime || "--" }}</span>
                      <div v-if="item.daysLeft" class="down-time">
                        <img src="@/assets/images/icon/watch.png" alt="" />&nbsp;{{ item.daysLeft
                        }}{{ $t("submit.day") }}&nbsp;<a-tooltip placement="top">
                        <template #title>
                          <span>{{ $t("submit.warehouseSaveTip") }}</span>
                        </template>
                        <img src="@/assets/images/mine/what.png" alt="" />
                      </a-tooltip>
                      </div>
                    </div>

                    <div class="cell center" :style="{ width: rightColumns[1].width }">
                      {{ item.weight }}
                    </div>
                    <div class="cell center" :style="{ width: rightColumns[2].width }">
                      <template v-if="!item.length || !item.width || !item.height"></template>
                      <template v-else
                      >{{ item.length }}*{{ item.width }}*{{ item.height }}</template
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" />
          </template>
        </div>
      </section>
      <section class="package">
        <div class="item-title">{{ $t("submit.packagingMethod") }}</div>
        <div class="package-type">
          <div class="top">
            <a-radio-group v-model:value="packageInfo.type" @change="packageTypeChange">
              <a-radio class="radio" value="1"
              ><div style="display: flex">
                {{ $t("submit.packagingMethod1") }}&nbsp;<a-tooltip placement="top">
                <template #title>
                  <span>{{ $t("submit.paidServicesTip") }}</span>
                </template>
                <div class="tag-box">
                  <img src="@/assets/images/icon/qa.png" alt="" />&nbsp;<span class="tag">{{
                        $t("submit.freeServices")
                      }}</span>
                </div></a-tooltip
              >
              </div></a-radio
              >
              <a-radio value="2"
              ><div style="display: flex">
                {{ $t("submit.packagingMethod2") }}&nbsp;<a-tooltip placement="top">
                <template #title>
                  <span>{{ $t("submit.freeServicesTip") }}</span>
                </template>
                <div class="tag-box">
                  <img src="@/assets/images/icon/qa.png" alt="" />&nbsp;<span class="tag">{{
                        $t("submit.freeServices")
                      }}</span>
                </div></a-tooltip
              >
              </div></a-radio
              >
            </a-radio-group>
          </div>
        </div>
        <div class="item-title">{{ $t("submit.addedService") }}</div>
        <div class="package-type add-service">
          <div class="top">
            <a-checkbox-group v-model:value="packageInfo.service" @change="addServiceChange">
              <a-checkbox
                      v-for="item in addServiceList"
                      :key="item.value"
                      class="checkbox"
                      :value="item.value"
              ><div :class="[$t('langProp') ? 'add-service-box-en' : 'add-service-box']">
                <div v-if="item.value === 13" class="tag-box">
                  <img
                          src="@/assets/images/activity/Christmas/gift2.png"
                          height="20"
                          alt=""
                  />&nbsp;
                </div>
                {{ item.label }}&nbsp;<a-tooltip placement="top">
                <template #title>
                  <pre class="ff-p4 add-service-desc">{{ item.tip }}</pre>
                </template>
                <div class="tag-box">
                  <img src="@/assets/images/icon/qa.png" alt="" /></div
                ></a-tooltip>
              </div></a-checkbox
              >
            </a-checkbox-group>
          </div>
        </div>
        <div class="item-title">{{ $t("submit.remark") }}</div>
        <div class="remark">
          <a-textarea
                  v-model:value="packageInfo.remark"
                  :bordered="false"
                  :rows="4"
                  :placeholder="$t('warehouse_submit_tip')"
                  :maxlength="remarkMaxlength"
          />
          <div class="show-count">{{ packageInfo.remark.length }}/{{ remarkMaxlength }}</div>
        </div>
      </section>
      <section class="line">
        <div class="item-title">
          {{ $t("submit.sendLine") }}<span class="sub-title">（{{ $t("submit.noInsuranceTip") }}）</span>
        </div>
        <div v-if="lineData.length" class="line-data">
          <template v-for="item in lineData" :key="item.logisticsLineCostId" :>
            <div
                    v-if="selectedLine === item.logisticsLineCostId || selectedLine === undefined"
                    :class="[
                'list',
                selectedLine === item.logisticsLineCostId ? 'active' : '',
                item.disabled ? 'disabled' : '',
              ]"
            >
              <div class="con">
                <div class="poster">
                  <div class="img">
                    <img class="icon" :src="item.logisticsLineIcon" alt="" />
                    <a-popover trigger="click" placement="right">
                      <template #content>
                        <pre class="ff-p4 qa-text insurance-desc">{{ item.insuranceDesc }}</pre>
                      </template>
<!--                      <img-->
<!--                              v-if="item.configureInsurance && userInfo.userIdentity !== 1"-->
<!--                              class="insurance"-->
<!--                              src="@/assets/images/icon/insurance.png"-->
<!--                              alt=""-->
<!--                      />-->
                    </a-popover>
                  </div>
                  <div class="name">
                    {{ $formatTitle(item, "logisticsLineName", "en") }}
                  </div>
                  <div v-if="item.includeTaxes" class="tax">
                    {{ $t("submit.taxExemption") }}
                  </div>
                </div>
                <div class="time">
                  <span class="col999">{{ $t("submit.ShippingTime") }}</span>
                  <div>
                    {{ item.logisticsTimeMin }}-{{ item.logisticsTimeMax }}&nbsp;<span
                          class="day"
                  >{{ $t("submit.day") }}</span
                  >
                  </div>
                </div>
                <div class="desc col999">
                  <pre v-if="selectedLine === item.logisticsLineCostId" class="block-word desc-text"
                  >{{ item.logisticsLineDesc }}
                      </pre
                      >
                  <div v-else class="desc-text">
                    {{ item.logisticsLineDesc }}
                  </div>
                </div>
                <div class="action">
                  <a-button
                          v-if="selectedLine !== item.logisticsLineCostId"
                          type="primary"
                          :class="['btn', !item.checkFlag ? 'disabled' : '']"
                          :disabled="!item.checkFlag"
                          @click="onSelect(item)"
                  >{{ $t("submit.select") }}</a-button
                  >
                  <a-button v-else type="primary" ghost class="edit-btn" @click="onChangeLine">{{
                    $t("submit.changeLine")
                    }}</a-button>
                </div>
              </div>
              <ul v-if="!item.checkFlag && item.uncheckDesc" class="notice">
                <li v-for="(desc, j) in item.uncheckDesc" :key="j">{{ desc }}</li>
              </ul>
              <!-- 费用 -->
              <div v-if="selectedLine" class="cost">
                <div class="title">{{ $t("submit.estTip15") }}：</div>
                <a-table :data-source="costData" bordered :columns="columns" :pagination="false">
                  <template #bodyCell="{ column, record, text }">
                    <template v-if="column.dataIndex === 'firstWeightPrice'">
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
          </template>
          <div v-if="selectedLine !== undefined" class="other">
            <div class="item">
              <div class="title">{{ $t("submit.taxPaymentMethod") }}</div>
              <a-radio-group v-model:value="otherInfo.payTaxesType">
                <a-radio v-if="otherInfo.payTaxesType === 0" class="radio" :value="0">{{
                  $t("submit.recipientPays1")
                  }}</a-radio>
                <a-radio v-if="otherInfo.payTaxesType === 1" class="radio" :value="1">{{
                  $t("submit.recipientPays2")
                  }}</a-radio>
              </a-radio-group>
              <div class="desc">
                {{ $t("submit.recipientPaysTip") }}
              </div>
            </div>
            <div class="item">
              <div class="title">{{ $t("submit.declarationMethod") }}</div>
              <a-radio-group v-model:value="otherInfo.payType" @change="payTypeChange">
                <a-radio class="radio" value="1">
                  {{ $t("submit.declarationMethod1") }}&nbsp;<a-tooltip
                        v-if="otherInfo.payTaxesType === 0"
                        placement="top"
                >
                  <template #title>
                      <span>{{
                        $tr("declarationMethod1Tip", selectedLineItem.cargoValueRatio + "%")
                      }}</span>
                  </template>
                  <img src="@/assets/images/icon/qa.png" alt=""
                  /></a-tooltip>
                </a-radio>
                <a-radio value="2">{{ $t("submit.declarationMethod2") }}</a-radio>
              </a-radio-group>
            </div>
            <div class="item">
              <div class="title">{{ $t("submit.declarationCurrency") }}</div>
              <a-radio-group v-model:value="otherInfo.currency">
                <a-radio class="radio" value="USD">USD</a-radio>
              </a-radio-group>
            </div>
            <div class="item">
              <div class="title">{{ $t("submit.declarationValue") }}(USD)</div>
              <div class="start-pay">
                <a-input
                        v-model:value="otherInfo.declarationValue"
                        class="tax-input"
                        :placeholder="declarationValueplaceholder"
                        :disabled="otherInfo.payType === '1'"
                        @change="declarationValueChange"
                        @focus="declarationValueFocus"
                        @blur="declarationValueBlur"
                />
                <span class="estimate-tax"
                >{{ $t("submit.estimatTaxesFee") }}(USD)<span class="value">{{
                    formatNum2(amountInfo.taxReportingFeeUsd, false)
                  }}</span></span
                >
              </div>
            </div>
<!--            <div-->
<!--                    v-if="selectedLineItem.configureInsurance && userInfo.userIdentity !== 1"-->
<!--                    class="item"-->
<!--            >-->
<!--              <div class="title">{{ $t("submit.insurancePaymentMethod") }}</div>-->
<!--              <a-radio-group v-model:value="otherInfo.insurance">-->
<!--                <a-radio v-if="otherInfo.insurance === 0" class="radio" :value="0">{{-->
<!--                  $t("submit.insurancePaymentMethod1")-->
<!--                  }}</a-radio>-->
<!--              </a-radio-group>-->
<!--              <div class="desc">-->
<!--                {{ $t("submit.insurancePaymentMethodTip1") }}-->
<!--              </div>-->
<!--            </div>-->
            <div class="tips">
              <div class="title">{{ $t("submit.disclaimerReminder") }}</div>
              <div class="text">
                <pre>{{ $t("submit.waybill_logistics_tips") }}</pre>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-line-data">
          <img src="@/assets/images/mine/no-data.png" alt="" />
          <div class="text">{{ $t("submit.noLineData") }}</div>
        </div>
      </section>
      <a-affix :offset-bottom="0">
        <div class="mine-affix">
          <div class="submit">
            <div class="weight">
              {{ $t("submit.pre_package_weight") }}&nbsp;
              <a-popover
                      v-if="weightCountMethod && packageInfo.type === '1'"
                      :get-popup-container="(triggerNode) => triggerNode.parentElement"
                      placement="top"
                      overlay-class-name="estimate-package-weight-wrapper"
                      trigger="hover"
              >
                <template #content>
                  <div class="estimate-package-weight">
                    <p
                            :class="[
                        'package-weight',
                        weightInfo.estimatePackageWeightSum < weightInfo.estimatePackageVolumeWeight
                          ? 'line-through'
                          : '',
                      ]"
                    >
                      {{ $t("submit.package_weight") }}：<text
                    >{{ weightInfo.estimatePackageWeightSum }}g</text
                    >
                    </p>
                    <p
                            :class="[
                        'package-volume-weight',
                        weightInfo.estimatePackageWeightSum >=
                        weightInfo.estimatePackageVolumeWeight
                          ? 'line-through'
                          : '',
                      ]"
                    >
                      {{ $t("submit.package_weight3") }}
                      ：<text>{{ weightInfo.estimatePackageVolumeWeight }}g</text>
                    </p>
                    <p class="weight-tip">
                      {{ $t("submit.package_weight3Tip") }}
                    </p>
                  </div>
                </template>
                <img src="@/assets/images/icon/qa.png" alt="" /></a-popover
              >&nbsp;
              <span>{{ weightInfo.estimatePackageWeight }}g</span>
            </div>
            <div class="right">
              <div class="amount">
                <span class="sign">{{ $cs() }}</span
                ><span class="num"> {{ realTotalFreight }} </span>&nbsp;
              </div>
              <a-popover
                      :get-popup-container="(triggerNode) => triggerNode.parentElement"
                      placement="top"
              >
                <template #content>
                  <p>
                    {{ $t("submit.estimateFreight") }}：{{
                    $formatPrice(amountInfo, "estimatedCostPrice")
                    }}
                  </p>
                  <p>
                    {{ $t("submit.addedServiceCharge") }}：{{
                    $formatPrice(amountInfo, "addedServicesFeePrice")
                    }}
                  </p>
                  <p>
                    {{ $t("submit.carrierProcessingFee") }}：{{
                    $formatPrice(amountInfo, "logisticsProviderProcessingFee")
                    }}
                  </p>
                  <p>{{ $t("submit.operationFee") }}：{{ $formatPrice(amountInfo, "operationFee") }}</p>
                  <p>{{ $t("submit.fuelCharge") }}：{{ $formatPrice(amountInfo, "fuelCost") }}</p>
                  <p>{{ $t("submit.service_charge") }}：{{ $formatPrice(amountInfo, "servicePrice") }}</p>
                  <p v-if="amountInfo.discountReducePrice">
                    {{ $t("submit.memberDiscount")
                    }}<a-tooltip>
                    <template #title>{{ $t("submit.memberDiscountAmountTip") }}</template
                    ><img src="@/assets/images/icon/qa.png" alt="" /></a-tooltip
                  >：-{{ $formatPrice(amountInfo, "discountReducePrice") }}
                  </p>
                  <p v-if="amountInfo.transportReducePrice">
                    {{ $t("submit.exclusiveDiscount")
                    }}<a-tooltip>
                    <template #title>{{ $t("submit.exclusiveDiscountAmountTip") }}</template
                    ><img src="@/assets/images/icon/qa.png" alt="" /></a-tooltip
                  >：-{{ $formatPrice(amountInfo, "transportReducePrice") }}
                  </p>
                  <p v-if="amountInfo.taxReportingFee">
                    {{ $t("submit.estimatTaxesFee")
                    }}<a-tooltip>
                    <template #title>{{ $t("submit.estimatTaxesFeeAmountTip") }}</template
                    ><img src="@/assets/images/icon/qa.png" alt="" /></a-tooltip
                  >：{{ $formatPrice(amountInfo, "taxReportingFee") }}
                  </p>
                </template>
                <img src="@/assets/images/icon/qa.png" alt="" />
              </a-popover>
              <a-button
                      class="btn"
                      type="primary"
                      :disabled="subLoading2"
                      :loading="subLoading"
                      @click="onSubmit"
              >{{ $t("submit.submit_package") }}</a-button
              >
            </div>
          </div>
        </div>
      </a-affix>
    </a-spin>
    <a-modal
            v-model:visible="visible"
            width="60%"
            :destroy-on-close="true"
            :footer="null"
            :mask-closable="true"
            centered
            title=""
    >
      <div class="protocol-text">
        <component :is="currComponent" v-if="currComponent"></component>
        <a-spin v-else :spinning="articleLoading">
          <div ref="artBoxRef" class="artBox"></div>
        </a-spin>
      </div>
      <div v-if="!currComponent" class="modal-footer">
        <a-button key="back" @click="visible = false">{{ $t("submit.global.cancel") }}</a-button>
        <a-button key="submit" type="primary" @click="handleConfirm">{{
          $t("submit.gloabl.confirm")
          }}</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import {
  reactive,
  ref,
  computed,
  shallowRef,
  getCurrentInstance,
  onMounted,
  defineAsyncComponent,
  nextTick,
} from "vue";
import { Empty } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import { formatTitle, formatNum2, formatPrice } from "@/utils/tools";
import { useDebounceFn } from "@vueuse/core";
import {
  createPackageOrder,
  packageCalculate,
  estimatePackageCalculate,
  logisticsLineDetail,
  getSubmitOrderInfo,
} from "@/api/order";

const loading = ref(false);

const { proxy } = getCurrentInstance();

const route = useRoute();
const router = useRouter();

<!--const lang = computed(() => {-->
<!--  return store.getters.lang;-->
<!--});-->

// 列表数据
const leftColumns = ref([
  {
    title: proxy.$t("submit.order_table_detail"),
    width: "50%",
  },
  {
    title: proxy.$t("submit.order_table_num"),
    width: "15%",
  },
  {
    title: proxy.$t("submit.product_type"),
    width: "35%",
    align: "center",
  },
]);
const rightColumns = ref([
  {
    title: proxy.$t("submit.warehouse_createTime"),
    width: "40%",
    align: "center",
  },
  {
    title: proxy.$t("submit.weight"),
    width: "30%",
    align: "center",
  },
  {
    title: proxy.$t("submit.size"),
    width: "30%",
    align: "center",
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
    title: proxy.$t("submit.firstWeightPrice"),
    dataIndex: "firstWeightPrice",
    align: "center",
    width: "16.6%",
    customCell,
    customHeaderCell,
  },
  {
    title: proxy.$t("submit.additionalWeightPrice"),
    dataIndex: "additionalWeightPrice",
    align: "center",
    width: "16.6%",
    customCell,
    customHeaderCell,
  },
  {
    title: proxy.$t("submit.carrierProcessingFee"),
    dataIndex: "logisticsProviderProcessingFee",
    align: "center",
    width: "16.6%",
    key: "price",
    customCell,
    customHeaderCell,
  },
  {
    title: proxy.$t("submit.fuelCharge"),
    dataIndex: "fuelCost",
    align: "center",
    width: "16.6%",
    key: "price",
    customCell,
    customHeaderCell,
  },
  {
    title: proxy.$t("submit.operationFee"),
    dataIndex: "operationFee",
    align: "center",
    width: "16.6%",
    key: "price",
    customCell,
    customHeaderCell,
  },
  {
    title: proxy.$t("submit.servicePrice"),
    dataIndex: "servicePrice",
    align: "center",
    key: "price",
    width: "16.6%",
    customCell,
    customHeaderCell,
  },
];

const dataSource = reactive({
  list: [],
});

const packageInfo = reactive({
  type: "1",
  service: [],
  remark: "",
});

const addServiceList = [
  // {
  //   label: proxy.$t("submit.addService13"),
  //   tip: proxy.$t("submit.addServiceTip13"),
  //   value: 13,
  // },
  {
    label: proxy.$t("submit.addService1"),
    tip: proxy.$t("submit.addServiceTip1"),
    value: 1,
  },
  {
    label: proxy.$t("submit.addService2"),
    tip: proxy.$t("submit.addServiceTip2"),
    value: 2,
  },
  {
    label: proxy.$t("submit.addService3"),
    tip: proxy.$t("submit.addServiceTip3"),
    value: 3,
  },
  {
    label: proxy.$t("submit.addService4"),
    tip: proxy.$t("submit.addServiceTip4"),
    value: 4,
  },
  {
    label: proxy.$t("submit.addService5"),
    tip: proxy.$t("submit.addServiceTip5"),
    value: 5,
  },
  {
    label: proxy.$t("submit.addService6"),
    tip: proxy.$t("submit.addServiceTip6"),
    value: 6,
  },
  {
    label: proxy.$t("submit.addService7"),
    tip: proxy.$t("submit.addServiceTip7"),
    value: 7,
  },
  {
    label: proxy.$t("submit.addService8"),
    tip: proxy.$t("submit.addServiceTip8"),
    value: 8,
  },
  {
    label: proxy.$t("submit.addService9"),
    tip: proxy.$t("submit.addServiceTip9"),
    value: 9,
  },
  {
    label: proxy.$t("submit.addService10"),
    tip: proxy.$t("submit.addServiceTip10"),
    value: 10,
  },
  {
    label: proxy.$t("submit.addService11"),
    tip: proxy.$t("submit.addServiceTip11"),
    value: 11,
  },
  {
    label: proxy.$t("submit.addService12"),
    tip: proxy.$t("submit.addServiceTip12"),
    value: 12,
  },
];

const remarkMaxlength = ref(200);

const addressInfo = reactive({
  id: "",
  userName: "",
  phone: "",
  code: "",
  default: false,
  address: "",
  countryId: "",
});

const countDownEnd = (item) => {};

// 协议
const visibleRemember = ref(false);
const checked = ref(false);
const componentObj = {
  article1: defineAsyncComponent(() => import("@/components/Protocol/InitiationTax.vue")),
  article2: defineAsyncComponent(() => import("@/components/Protocol/TaxNotice.vue")),
  article3: defineAsyncComponent(() => import("@/components/Protocol/Shipping.vue")),
  // holidayNotice: holidayNotice
};

const visible = ref(false);
const articleLoading = ref(false);
const artBoxRef = ref();
const currComponent = shallowRef();
const lookProtocol = async (name) => {
  visible.value = true;
  if (name === "holidayNotice") {
    articleLoading.value = true;
    const { data } = await articleDetail({ articleId: 99 });
    nextTick(() => {
      artBoxRef.value.innerHTML = decodeURIComponent(data.content).replace(/\\/g, "");
      articleLoading.value = false;
    });
  } else {
    currComponent.value = componentObj[name];
  }
};
const handleConfirm = () => {
  checked.value = true;
  visible.value = false;
};

// 包装方式修改
const packageTypeChange = () => {
  renderOrder();
};
// 增值服务修改
const addServiceChange = () => {
  renderOrder();
};

// 线路
const lineData = ref([]);
const costData = ref([
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

const selectedLine = ref(undefined);
const selectedLineItem = ref({});
const onSelect = (item) => {
  if (!addressInfo.id) {
    proxy.$message.warning(proxy.$t("submit.submitOrderTip1"));
    return;
  }
  selectedLine.value = item.logisticsLineCostId;
  selectedLineItem.value = item;
  otherInfo.payType = "1";
  otherInfo.payTaxesType = item.includeTaxes;
  otherInfo.declarationValueMin = item.declarationAmountMinLimit
    ? item.declarationAmountMinLimit / 100
    : undefined;
  otherInfo.declarationValueMax = item.declarationAmountMaxLimit
    ? item.declarationAmountMaxLimit / 100
    : undefined;
  otherInfo.declarationValue = undefined;

  logisticsLineDetail({
    logisticsLineId: item.logisticsLineId,
    logisticsLineCostId: item.logisticsLineCostId,
  }).then((res) => {
    costData.value[0].firstWeightPrice = res?.data.firstWeightPrice;
    costData.value[0].firstWeight = res?.data.firstWeight;
    costData.value[0].additionalWeightPrice = res?.data.additionalWeightPrice;
    costData.value[0].additionalWeight = res?.data.additionalWeight;
    costData.value[0].servicePrice = res?.data.servicePrice;
    costData.value[0].additionalWeight = res?.data.additionalWeight;
    costData.value[0].fuelCost = res?.data.fuelCost;
    costData.value[0].logisticsProviderProcessingFee = res?.data.logisticsProviderProcessingFee;
    costData.value[0].operationFee = res?.data.operationFee;
  });
  renderOrder();
};
const onChangeLine = () => {
  selectedLine.value = undefined;
  selectedLineItem.value = {};
  otherInfo.declarationValue = undefined;
  costData.value = [
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
  ];
  Object.keys(amountInfo).forEach((key) => {
    amountInfo[key] = 0;
  });
  Object.keys(weightInfo).forEach((key) => {
    weightInfo[key] = 0;
  });
};

const getLogisticsLine = () => {
  onChangeLine();
  const ids = dataSource.list.map((item) => item.id);
  packageCalculate({
    userAddressId: addressInfo.id,
    innerDeliveryIdList: ids,
  })
    .then((res) => {
      lineData.value = res.data || [];
    })
    .catch(() => {
      lineData.value = [];
    })
    .finally(() => {
      loading.value = false;
    });
};

const payTypeChange = (e) => {
  if (e.target.value === "1") {
    renderOrder();
  } else {
    otherInfo.declarationValue = undefined;
    amountInfo.taxReportingFeeUsd = 0;
  }
};
const declarationValueplaceholder = computed(() => {
  if (otherInfo.payType === "2" && otherInfo.declarationValueMin && otherInfo.declarationValueMax) {
    return `${otherInfo.declarationValueMin}-${otherInfo.declarationValueMax}`;
  } else {
    return "";
  }
});

const declarationValueFocus = () => {
  declarationFocus.value = true;
};
const declarationValueBlur = () => {
  if (otherInfo.declarationValue)
    otherInfo.declarationValue = Number(otherInfo.declarationValue).toFixed(2);
  declarationFocus.value = false;
};
const declarationValueChange = (e) => {
  console.log(e);
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
  otherInfo.declarationValue = value;
  if (otherInfo.payType === "2" && otherInfo.declarationValue) {
    countFun();
  }
};

const countFun = useDebounceFn(() => {
  if (Number(otherInfo.declarationValue) < (otherInfo.declarationValueMin || 0)) {
    otherInfo.declarationValue = String(otherInfo.declarationValueMin || 0);
  }
  if (
    otherInfo.declarationValueMax &&
    Number(otherInfo.declarationValue) > otherInfo.declarationValueMax
  ) {
    otherInfo.declarationValue = String(otherInfo.declarationValueMax);
  }
  renderOrder(true);
}, 500);

const exchangeForm = reactive({

});
const exchangeLoading = ref(false);

const refExchangeForm = ref();

const visibleChange = (val) => {
  if (!val) {
    refExchangeForm.value.resetFields();
  }
};

const freightPrice = computed(() => {
  const amount = amountInfo.estimatedCostPrice;
  // const amount = Number(proxy.$formatAmount(amountInfo, "estimatedCostPrice"));
  return amount;
});

const realTotalFreight = computed(() => {
  const amount = Number(proxy.$formatAmount(amountInfo, "freightDeposit"));
  return (amount <= 0 ? 0 : amount / 100).toFixed(2);
});

const weightInfo = reactive({
  estimatePackWeight: 0,
  estimatePackageWeight: 0,
  estimatePackageVolumeWeight: 0,
  estimatePackageWeightSum: 0,
});
const amountInfo = reactive({
  estimatedCostPrice: 0,
  freightDeposit: 0,
  addedServicesFeePrice: 0,
  logisticsProviderProcessingFee: 0,
  fuelCost: 0,
  operationFee: 0,
  servicePrice: 0,
  discountReducePrice: 0,
  transportReducePrice: 0,
  estimatedCostPriceTrans: 0,
  freightDepositTrans: 0,
  addedServicesFeePriceTrans: 0,
  logisticsProviderProcessingFeeTrans: 0,
  fuelCostTrans: 0,
  operationFeeTrans: 0,
  servicePriceTrans: 0,
  discountReducePriceTrans: 0,
  transportReducePriceTrans: 0,
  taxReportingFee: 0,
  taxReportingFeeTrans: 0,
  taxReportingFeeUsd: 0,
});

const itemActive = ref();

const otherInfo = reactive({
  payTaxesType: 0,
  payType: "1",
  currency: "USD",
  declarationValueMin: undefined,
  declarationValue: undefined,
  insurance: 0,
});

// 预下单
const renderOrder = (showTip = false) => {
  if (!addressInfo.id) {
    if (showTip) proxy.$message.warning(proxy.$t("submit.submitOrderTip1"));
    return;
  }
  if (!packageInfo.type) {
    if (showTip) proxy.$message.warning(proxy.$t("submit.packagingMethodTip"));
    return;
  }
  if (!selectedLine.value) {
    if (showTip) proxy.$message.warning(proxy.$t("submit.lineSelectTip"));
    return;
  }
  if (otherInfo.payType === 2 && !otherInfo.declarationValue) {
    if (showTip) proxy.$message.warning(proxy.$t("submit.declarationValueTip"));
    return;
  }
  const ids = dataSource.list.map((item) => item.id);
  loading.value = true;
  estimatePackageCalculate({
    innerDeliveryIdList: ids,
    userAddressId: addressInfo.id,
    taxReportingMethod: otherInfo.payType,
    taxReportingPrice:
      otherInfo.payType === "2" ? (otherInfo.declarationValue * 100).toFixed(0) : undefined,
    packingMethod: packageInfo.type,
    valueAddedServicesIdList: packageInfo.service,
    logisticsLineCostId: selectedLine.value,
  })
    .then((res) => {
      const { data } = res;
      Object.keys(amountInfo).forEach((key) => {
        // if (key === "estimatedCostPrice") {
        //   amountInfo[key] = (data[key] || 0) - (data.servicePrice || 0);
        // } else if (key === "estimatedCostPriceTrans") {
        //   amountInfo[key] = (data[key] || 0) - (data.servicePriceTrans || 0);
        // } else {
        //   amountInfo[key] = data[key] || 0;
        // }
        amountInfo[key] = data[key] || 0;
      });
      Object.keys(weightInfo).forEach((key) => {
        weightInfo[key] = data[key] || 0;
      });
      otherInfo.declarationValue = formatNum2(data.taxReportingCargoValueUsd, false);
    })
    .finally(() => {
      loading.value = false;
    });
};

// 创建订单
const subLoading = ref(false);
const subLoading2 = ref(false);
const declarationFocus = ref(false);
const onSubmit = () => {
  if (!addressInfo.id) {
    proxy.$message.warning(proxy.$t("submit.submitOrderTip1"));
    return;
  }
  if (!packageInfo.type) {
    proxy.$message.warning(proxy.$t("submit.packagingMethodTip"));
    return;
  }
  if (!selectedLine.value) {
    proxy.$message.warning(proxy.$t("submit.lineSelectTip"));
    return;
  }
  if (!otherInfo.declarationValue) {
    proxy.$message.warning(proxy.$t("submit.declarationValueTip"));
    return;
  }
  subLoading.value = true;
  const ids = dataSource.list.map((item) => item.id);
  createPackageOrder({
    warehouseOrderIdList: ids,
    userAddressId: addressInfo.id,
    remark: packageInfo.remark,
    taxReportingMethod: otherInfo.payType,
    taxReportingPrice:
      otherInfo.payType === "2" ? (otherInfo.declarationValue * 100).toFixed(0) : undefined,
    packingMethod: packageInfo.type,
    valueAddedServicesIdList: packageInfo.service,
    logisticsLineCostId: selectedLine.value,
    packageDeclaredPrice: otherInfo.declarationValue,
    outUserAddressId: undefined,
  })
    .then(() => {
      localStorage.setItem("lastSubmitAddressId", addressInfo.id);
      proxy.$message.success(proxy.$t("submit.sumbitSuccess"));
      router.replace({
        path: "/mine/package-list",
      });
    })
    .finally(() => {
      subLoading.value = false;
    });
};

const weightCountMethod = ref(true); // 体积重开关，默认开启
onMounted(async () => {
  try {
    loading.value = true;
    const { data = {} } = await getSubmitOrderInfo(sessionStorage.getItem("SubOrderIds"));
      dataSource.list = data.subOrders.map((item, i) => {
      item.id = item.innerDeliveryId;
      item.skuDetailList = [
         {
              productId: i,
              headPic: item.imgUrl,
              productName: item.remark,
              productNameTrans: item.remark,
              skuNum: 1,
              logisticsNumber: item.logisticsNumber,
              packageTypeList: item.packageTypeList,
              packageTypeListTrans: item.packageTypeListTrans,
         },
      ];
      item.packageTypeList = item.logisticsNumber || ["普货"];
      item.packageTypeListTrans = item.packageTypeListTrans || ["Common Goods"];
      return item;
      });
      console.log(dataSource.list);
      let addressObj = data.userAddressInfo;
      addressInfo.id = addressObj.id;
      addressInfo.countryId = addressObj.countryId;
      addressInfo.code = addressObj.postcode;
      addressInfo.userName = `${addressObj.firstName} ${addressObj.lastName}`;
      addressInfo.phone = addressObj.mobile;
      addressInfo.default = Boolean(addressObj.isDefault);
      const countryName = addressObj.countryName ? `${addressObj.countryName}/` : "";
      const provinceName = addressObj.provinceName ? `${addressObj.provinceName}/` : "";
      const cityName = addressObj.cityName ? `${addressObj.cityName}/` : "";
      addressInfo.address = countryName + provinceName + cityName + addressObj.address;
    getLogisticsLine();
    loading.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
});
</script>

<style>
.estimate-package-weight-wrapper .estimate-package-weight .line-through text {
  text-decoration: line-through;
}
.estimate-package-weight-wrapper .weight-tip {
  font-size: 12px;
  color: #999;
  max-width: 350px;
}

.coupon-wrapper {
  padding-bottom: 0;
}
.coupon-wrapper .coupon-tabs {
  width: 270px;
}
.coupon-wrapper .coupon-tabs .ant-tabs-top > .ant-tabs-nav {
  margin: 0;
}
.coupon-wrapper .coupon-tip {
  font-size: 12px;
  color: #999;
  padding: 5px 20px;
  border-top: 1px solid #eee;
  span {
    color: #333;
    /* font-weight: 500; */
    /* color: #f56c6c; */
  }
}
/* .coupon-tabs .ant-tabs>.ant-tabs-nav .ant-tabs-nav-wrap,.coupon-tabs .ant-tabs>div>.ant-tabs-nav .ant-tabs-nav-wrap {
  justify-content: space-around;
} */
.coupon-wrapper .coupon-tabs-en {
  width: 300px;
}
.coupon-wrapper .coupon-wrapper-list {
  height: 350px;
  overflow-y: auto;
}
.coupon-wrapper .ant-popover-inner-content {
  padding: 0;
}
.coupon-wrapper .coupon-exchange {
  padding: 10px 20px;
  height: 350px;
}
.coupon-wrapper .coupon-exchange #coupon-exchange-btn {
  height: auto;
  line-height: normal;
  padding: 7px 20px;
}
.coupon-wrapper .select-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  font-weight: normal;
  cursor: pointer;
}
.coupon-wrapper .select-item:hover {
  background: #f8f8f8;
}
.coupon-wrapper .select-item .list {
  padding-right: 6px;
}
.coupon-wrapper .select-item .en-list {
  width: 240px;
}

.coupon-wrapper .cut {
  font-size: 14px;
  color: #333;
  width: 100%;
}
.coupon-wrapper .over-time {
  color: #ff8000;
  font-size: 12px;
  width: 100%;
}
.coupon-wrapper .reason {
  font-size: 12px;
}
.coupon-wrapper .active-icon {
  display: none;
  width: 24px;
}
.coupon-wrapper .active-item {
  background: #f8f8f8;
}
.coupon-wrapper .active-item .active-icon {
  display: block;
}
.coupon-wrapper .disabled-item {
  cursor: not-allowed;
  color: #999999;
  background: #fff !important;
}
.coupon-wrapper .disabled-item .cut,
.coupon-wrapper .disabled-item .over-time {
  color: #999999;
}
.coupon-wrapper .no-coupon-data {
  height: 350px;
  text-align: center;
  line-height: 350px;
  font-size: 14px;
  color: #999999;
}
</style>
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
.add-service-box {
  display: flex;
  width: 200px;
}
.add-service-box-en {
  display: flex;
  width: 320px;
}
.add-service-desc {
  white-space: pre-wrap;
  color: #fff;
  font-size: 12px;
  max-width: 500px;
}
.waybill {
  width: 1200px;
  margin: 0 auto 50px;
  color: #333;
  .nav {
    padding: 24px 0;
    font-size: 20px;
    font-weight: 500;
  }
  section {
    padding: 20px 24px;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 16px;
    .item-title {
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        color: #155bd4;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
  .address {
    .info {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 103px;
      background: #f8f8f8;
      border-radius: 4px;
      color: #333;
      font-size: 14px;
      .con {
        width: 100%;
        padding: 0 24px;
        .top {
          span {
            margin-right: 24px;
          }
          .name {
            font-size: 20px;
            font-weight: 500;
          }
        }
        .tag {
          background: rgba(6, 217, 214, 0.08);
          border: 0.5px solid var(--primary-color);
          border-radius: 2px;
          color: var(--primary-color);
          font-size: 10px;
          padding: 0px 2px;
          margin-right: 10px;
        }
      }
      .no-data {
        height: 40px;
        padding: 0 24px;
        line-height: 40px;
        background: var(--primary-color);
        border-radius: 4px;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
      }
    }
  }
  .goods {
    margin-bottom: 30px;
  }
  .data-table {
    padding-bottom: 42px;
    .center {
      text-align: center;
    }

    .header {
      display: flex;
      color: #333333;
      font-weight: 500;
      height: 48px;
      align-items: center;
      background: #f5f5f5;
      font-size: 12px;
      // margin-bottom: 16px;
      .left-info {
        width: 60%;
        flex-shrink: 0;
        display: flex;
      }
      .right-info {
        display: flex;
        width: 40%;
      }
      .column {
        flex-shrink: 0;
      }
      .pdlt {
        padding-left: 24px;
      }
    }
    .content {
      width: 100%;
      color: rgba(0, 0, 0, 0.85);
      // border-bottom: 1px solid #f0f0f0;

      .list {
        // margin-bottom: 16px;
        background-color: #fff;
        // border: 1px solid #eeeeee;
        // &:last-child {
        //   margin-bottom: 0px;
        // }
      }
      // .store {
      //   display: flex;
      //   align-items: center;
      //   justify-content: space-between;
      //   padding: 0 16px;
      //   height: 32px;
      //   background: #f5f5f5;
      //   color: #333;
      //   font-size: 12px;
      //   .left {
      //     display: flex;
      //     align-items: center;
      //   }
      //   img {
      //     margin-right: 4px;
      //     width: 14px;
      //   }
      //   .checkbox {
      //     width: 28px;
      //   }
      //   .item {
      //     margin-right: 20px;
      //     display: flex;
      //     align-items: center;
      //     height: 100%;
      //   }
      //   .btns {
      //     display: flex;
      //     justify-content: flex-end;
      //     align-items: center;
      //     .btn {
      //       cursor: pointer;
      //       color: #ff1e05;
      //     }
      //     .consult {
      //       margin-left: 12px;
      //     }
      //   }
      // }
      .goods-list {
        display: flex;
        font-size: 12px;
        color: #333;
        border: 1px solid #eee;
        border-top: none;
        .left-info {
          width: 60%;
          flex-shrink: 0;
          border-right: 1px solid #eee;
        }
        .right-info {
          display: flex;
          width: 40%;
          justify-content: center;
        }
        .cell {
          flex-shrink: 0;
          padding: 16px 0;
        }
        .item-list {
          display: flex;
          border-bottom: 1px solid #eee;
          &:last-child {
            border-bottom: none;
          }
          .detail {
            display: flex;
            align-items: flex-start;

            // border-bottom: 1px solid #eee;
            padding-right: 12px;
            .checkbox {
              width: 4px;
              flex-shrink: 0;
              margin-left: 16px;
            }
            .poster {
              width: 80px;
              height: 80px;
              border-radius: 4px;
              overflow: hidden;
              flex-shrink: 0;
              display: flex;
              // align-items: center;
              justify-content: center;
            }
            .product-info {
              flex-grow: 1;
              color: #999999;
              padding-left: 12px;
              .info {
                margin-bottom: 8px;
                display: flex;
                overflow: hidden;
                .product {
                  .title {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-bottom: 5px;
                    color: #333;
                  }
                  .order-no {
                    margin-top: 8px;
                  }
                }
              }
            }
          }
        }
        .time {
          .down-time {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 6px;
            span {
              margin: 0 2px;
              line-height: normal;
            }
          }
        }
        .status {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 10px;
          img {
            width: 12px;
            margin-left: 2px;
          }
        }
        .amount {
          font-size: 16px;
          font-weight: 500;
        }
        .count-down {
          line-height: normal;
        }
        .type {
          .tag {
            padding: 2px 4px;
            display: inline-block;
            background: rgba(11, 213, 210, 0.08);
            color: var(--primary-color);
            border-radius: 2px;
            margin-right: 4px;
            margin-bottom: 4px;
          }
        }
        .action {
          div {
            margin-bottom: 4px;
          }
          .btn-pay {
            font-size: 12px;
            display: inline-flex;
            align-items: center;
            line-height: normal;
            margin: 8px 0;
          }
        }
      }
      .picture {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        padding: 0 35px 0 44px;
        background-color: #f8f8f8;
        .imgs {
          img {
            // width: 40px;
            // height: 40px;
            // border-radius: 4px;
            // overflow: hidden;
            // margin-right: 8px;
          }
        }
        .btns {
          img {
            width: 20px;
            height: 20px;
            margin-left: 20px;
            cursor: pointer;
            &:last-child {
              margin-top: 2px;
            }
          }
        }
      }
    }
  }
  .package {
    margin: 0;
    padding-bottom: 0;
    .item-title {
      margin-bottom: 10px;
    }
    .package-type {
      padding-bottom: 20px;
      margin-bottom: 20px;
      .top {
        :deep(.radio) {
          margin-right: 30px;
        }
        :deep(.checkbox) {
          margin-right: 30px;
          margin-left: 0;
          margin-bottom: 10px;
        }
        .tag-box {
          display: inline-flex;
          align-items: center;
          padding-top: 1px;
        }
        .tag {
          font-size: 12px;
          display: inline-block;
          line-height: normal;
          align-items: center;
          color: #a65921;
          border: 0.5px solid rgba(166, 89, 33, 0.4);
          border-radius: 2px;
          padding: 0 2px;
          height: 18px;
        }
      }
    }
    .add-service {
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      :deep(.ant-checkbox) {
        top: 0;
      }
      :deep(.ant-checkbox-wrapper) {
        align-items: center;
      }
    }
    .remark {
      position: relative;
      padding-bottom: 26px;
      border-bottom: 1px solid #eee;
      :deep(.ant-input) {
        background-color: #f8f8f8;
        padding-bottom: 20px;
      }
      .show-count {
        position: absolute;
        right: 8px;
        bottom: 22px;
        z-index: 9;
        font-size: 12px;
      }
    }
  }
  .line {
    margin-bottom: 0;
    padding-bottom: 107px;
    .item-title {
      justify-content: flex-start;
    }
    .sub-title {
      color: #666;
      font-size: 12px;
    }
    .line-data {
      border: 1px solid #eeeeee;
      .list {
        font-size: 12px;
        padding: 20px 24px 20px 0px;
        border-bottom: 1px solid #eeeeee;
        &:last-child {
          border-bottom: none;
        }
        &.active {
          background-color: #f8f8f8;
        }
        &.disabled {
          opacity: 0.8;
        }
        .col999 {
          color: #999999;
        }
        .con {
          display: flex;
          justify-content: space-between;
        }
        .poster {
          width: 12%;
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
            font-size: 14px;
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
        .amount2 {
          width: 19%;
          padding-left: 10px;
          .num {
            font-weight: 500;
            font-size: 22px;
          }
        }
        .amount {
          width: 12%;
          padding-left: 10px;
          .num {
            font-weight: 500;
            font-size: 22px;
          }
        }
        .time {
          width: 20%;
          // text-align: center;
          div {
            font-weight: 500;
            font-size: 22px;
          }
          .day {
            font-size: 12px;
            color: #999;
          }
        }
        .desc {
          // width: 36%;
          width: 37%;
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
          // width: 8%;
          width: 12%;
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
          margin-left: 24px;
          width: calc(100% - 24px);
          li {
            list-style-type: none;
            margin-bottom: 4px;
            &:last-child {
              margin-bottom: 0px;
            }
          }
        }
        .cost {
          padding-left: 24px;
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
          :deep(.ant-table-thead > tr > th) {
            background-color: transparent !important;
          }
          :deep(.ant-table) {
            background-color: transparent;
          }
        }
      }
      .btn {
        width: 80px;
        height: 32px;
        padding: 0;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: normal;
        &.disabled {
          background-color: #ccc !important;
          border-color: #ccc !important;
        }
      }
      .edit-btn {
        width: 80px;
        height: 32px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: normal;
        background-color: #fff;
        // color: #333;
        // border-color: #333;
      }
      .other {
        // border: 1px solid #eeeeee;
        padding: 20px 24px;
        font-size: 16px;
        .title {
          padding-bottom: 10px;
          font-weight: 500;
        }
        .desc {
          color: #999999;
          margin-top: 8px;
          font-size: 14px;
        }
        .item {
          margin-bottom: 16px;
          .start-pay {
            :deep(.tax-input) {
              width: 150px;
              border-radius: 4px;
              .ant-input-number-input-wrap input {
                height: 34px;
              }
            }
            .estimate-tax {
              margin-left: 10px;
              // cursor: pointer;
              font-size: 14px;
              // text-decoration: underline;
              color: #999999;
              .value {
                margin-left: 8px;
                color: #333;
                font-size: 16px;
                font-weight: 500;
              }
            }
          }
        }
        .tips {
          background: #fff7e6;
          padding: 12px;
          color: #bf734d;
          border-radius: 4px;
          .title {
            padding-bottom: 2px;
          }
          .text {
            font-size: 12px;
            margin-top: 2px;
          }
          pre {
            white-space: pre-wrap;
          }
        }
      }
    }
    .no-line-data {
      padding: 160px 0 53px;
      color: #333;
      text-align: center;
      img {
        width: 160px;
        margin-bottom: 24px;
      }
      .text {
        width: 100%;
        font-size: 16px;
        margin-top: 22px;
      }
    }
  }
  .mine-affix {
    background: #ffffff;
    box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);
    padding: 16px 24px;
    .agreement {
      font-size: 14px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .article {
        color: #155bd4;
        margin-right: 8px;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
      }
      .img-icon {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 14px;
        height: 100%;
        .all-check-label {
          margin-left: 12px;
        }
      }
      .img-icon-item {
        user-select: none;
        cursor: pointer;
        transition: all 0.3s;
        width: 16px !important;
        height: 16px !important;
      }
      .img-icon-init {
        position: relative;
        display: block;
        direction: ltr;
        background-color: #fff;
        border: 1px solid #666;
        // border-radius: 4px;
        border-collapse: separate;
      }
    }
    .submit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;

      .weight {
        display: flex;
        align-items: center;
        span {
          font-size: 16px;
          font-weight: 500;
        }
      }
      .right {
        display: flex;
        align-items: center;
      }
      .amount {
        .sign {
          font-size: 14px;
          color: var(--amount-color);
        }
        .num {
          font-size: 24px;
          font-weight: 500;
          color: var(--amount-color);
        }
      }
      :deep(.ant-btn) {
        padding: 0 30px;
        height: 48px;
        line-height: 48px;
      }
      .btn {
        font-size: 18px;
        font-weight: 500;
        margin-left: 20px;
      }

      .prolusion {
        --ant-primary-color: #155bd4;
        --ant-primary-color-hover: #2b6dde; /* 可选，用于hover等状态 */
        --ant-primary-color-active: #4367a6; /* 可选，用于active等状态 */
      }

      .coupon {
        margin-left: 16px;
        .coupon-box {
          width: 190px;
          height: 48px;
          cursor: pointer;
          padding: 0 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #f5f5f5;
          border-radius: 4px;
          .cut {
            font-size: 14px;
            color: #333;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-break: break-all;
          }
          .no-list {
            color: #999999;
            font-weight: 400;
          }
          .over-time {
            color: #ff8000;
            font-size: 12px;
          }
        }
        .en-coupon-box {
          width: 220px;
        }
      }
    }
  }
}
.protocol-text {
  height: 80vh;
  overflow-y: auto;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  button {
    margin-left: 16px;
  }
}
</style>
