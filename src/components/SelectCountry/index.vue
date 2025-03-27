<template>
  <a-popover
    v-model:visible="showCountryPopover"
    :get-popup-container="(triggerNode) => triggerNode"
    :mouse-enter-delay="0"
    class="country-select-popver"
    trigger="click"
    placement="bottom"
  >
    <template #content>
      <div v-if="tabShow" class="country-box" @click.stop>
        <div class="desc"></div>
        <div class="tab-bar">
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane v-for="item in tabList" :key="item.value">
              <template #tab>
                <span>
                  <template v-if="['HOT'].includes(item.value)">{{ $t("estimate." + item.label) }}</template>
                  <template v-else>{{ item.label }}</template>
                </span>
              </template>
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="tab-con">
          <div v-if="activeKey === 'HOT'" class="country">
            <div class="left"></div>
            <ul>
              <li v-for="child in hotCountryList" :key="child.id">
                <span :class="{ active: child.id === countryVal }" @click="selectCountry(child)"
                  >{{ child.areaEnName }}&nbsp;{{ child.areaName }}</span
                >
              </li>
            </ul>
          </div>
          <template v-else>
            <template v-for="(item, key) in letterCountryList" :key="key">
              <div v-if="activeKey.indexOf(key) > -1 && item.length" class="country">
                <div class="left">
                  {{ key }}
                </div>
                <ul>
                  <li v-for="(child, index) in item" :key="index">
                    <span :class="{ active: child.id === countryVal }" @click="selectCountry(child)"
                      >{{ child.areaEnName }}&nbsp;{{ child.areaName }}</span
                    >
                  </li>
                </ul>
              </div>
            </template>
          </template>
        </div>
      </div>
      <div v-else class="count-list" @click.stop>
        <template v-if="searchCountryList.length">
          <div
            v-for="item in searchCountryList"
            :key="item.id"
            :class="['selectOptions', item.id === countryVal ? 'active' : '']"
            @click="selectCountry(item)"
          >
            <!-- <img class="countryFlag" :src="newImgUrl(item.areaShort)" alt="" /> -->
            <text>{{ item.areaEnName }}&nbsp;{{ item.areaName }}</text>
            <div class="icon-svg">
              <svg-icon class="icon" name="country-active"></svg-icon>
            </div>
          </div>
        </template>
        <div v-else>
          <a-empty class="no-data no-data-empty">
            <!-- <template #description>
              <span>
                Customize
              </span>
            </template> -->
          </a-empty>
        </div>
      </div>
    </template>
    <slot></slot>
  </a-popover>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { getArea } from "@/api/common";

const showCountryPopover = ref(false);
const activeKey = ref("HOT");
const tabList = [
  {
    label: "countryHot",
    value: "HOT",
  },
  {
    label: "ABC",
    value: "ABC",
  },
  {
    label: "DEF",
    value: "DEF",
  },
  {
    label: "GHI",
    value: "GHI",
  },
  {
    label: "JKL",
    value: "JKL",
  },
  {
    label: "MNO",
    value: "MNO",
  },
  {
    label: "PQR",
    value: "PQR",
  },
  {
    label: "STU",
    value: "STU",
  },
  {
    label: "VWX",
    value: "VWX",
  },
  {
    label: "YZ",
    value: "YZ",
  },
  // {
  //   label: "countryMLXY",
  //   value: 11,
  // },
  // {
  //   label: "countryZG",
  //   value: 12,
  // },
];

const tabShow = ref(true);

const countryVal = ref(undefined);
const countryList = ref([]);
const searchCountryList = ref([]);

const getContainer = (triggerNode) => {
  console.log(triggerNode);
  return triggerNode;
};

const countryName = ref("");

const emits = defineEmits(["countryChange", "selectThis"]);

// 拿地图数据
const getAreaCode = async (countryId) => {
  const areaLocalKey = "_pdp_area";
  const localDataStr = window.localStorage.getItem(areaLocalKey);
  if (localDataStr && localDataStr.indexOf("[") === 0) {
    countryList.value = JSON.parse(localDataStr);
    searchCountryList.value = [...countryList.value];
    init(countryId);
    initLetter();
    return;
  }

  const { data, success } = await getArea({ areaLevel: 1 });
  if (success && data && data.length) {
    countryList.value = data;
    searchCountryList.value = [...countryList.value];
    window.localStorage.setItem(areaLocalKey, JSON.stringify(data));
  }
  init(countryId);
  initLetter();
};

const filterFun = (str, arr) => {
  if (str) {
    const o = [];
    arr.forEach((item) => {
      if (
        item.areaName.indexOf(str) > -1 ||
        item.areaEnName.toLowerCase().indexOf(str.toLowerCase()) > -1
      ) {
        o.push(item);
      }
    });
    return o;
  } else {
    return arr;
  }
};

const openPopver = () => {
  tabShow.value = true;
  showCountryPopover.value = true;
};

const countrySearch = (val) => {
  if (val === "") {
    tabShow.value = true;
    countryVal.value = undefined;
    return;
  }
  tabShow.value = false;
  searchCountryList.value = filterFun(val, countryList.value);
};

const selectCountry = (item) => {
  countryVal.value = item.id;
  showCountryPopover.value = false;
  countryName.value = `${item.areaEnName} ${item.areaName}`;
  emits("countryChange", item);
};

const hotCountry = [
  {
    label: "USA 美国",
    value: 243,
  },
  {
    label: "Canada 加拿大",
    value: 42,
  },
  {
    label: "Australia 澳大利亚",
    value: 15,
  },
  {
    label: "United Kingdom 英国",
    value: 241,
  },
  {
    label: "New Zealand 新西兰",
    value: 158,
  },
  {
    label: "Japan 日本",
    value: 111,
  },
  {
    label: "France 法国",
    value: 78,
  },
  {
    label: "Singapore 新加坡",
    value: 200,
  },
  {
    label: "Italy 意大利",
    value: 109,
  },
  {
    label: "Germany 德国",
    value: 85,
  },
  {
    label: "Spain 西班牙",
    value: 210,
  },
  {
    label: "South Korea 韩国",
    value: 208,
  },
  {
    label: "Sweden 瑞典",
    value: 217,
  },
  {
    label: "Netherlands 荷兰",
    value: 155,
  },
  {
    label: "Switzerland 瑞士",
    value: 218,
  },
  {
    label: "Ireland 爱尔兰",
    value: 107,
  },
  {
    label: "Denmark 丹麦",
    value: 64,
  },
  {
    label: "Norway 挪威",
    value: 166,
  },
];
const hotCountryList = ref([]);
const letterCountryList = reactive({});
const letterList = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const initLetter = () => {
  hotCountryList.value = hotCountry.map((item) => {
    return {
      id: item.value,
      areaEnName: item.label.split(" ")[0],
      areaName: item.label.split(" ")[1],
    };
  });

  letterList.forEach((item) => {
    letterCountryList[item] = [];
  });

  // const hotCountryIds = hotCountry.map((item) => item.value);
  countryList.value.forEach((countryItem) => {
    // if (hotCountryIds.includes(countryItem.id)) {
    //   hotCountryList.value.push(countryItem);
    // }
    Object.keys(letterCountryList).some((key) => {
      if (key.indexOf(countryItem.areaEnName.charAt(0)) > -1) {
        letterCountryList[key].push(countryItem);
        return true;
      }
    });
  });
};

const init = (countryId) => {
  if (countryId) {
    countryList.value.some((countryItem) => {
      if (countryId === countryItem.id) {
        selectCountry(countryItem);
        return true;
      }
    });
  }
};
onBeforeMount(() => {
  // getAreaCode();
});

defineExpose({
  openPopver,
  countrySearch,
  getAreaCode,
});
</script>

<style>
.country-select-popver .ant-popover-placement-bottom {
  top: 40px !important;
}
</style>

<style lang="less" scoped>
.country-box {
  padding: 3px 5px;
  width: 1080px;
  min-height: 268px;
  .tab-con {
    .country {
      display: flex;
      font-size: 12px;
    }
    .left {
      width: 38px;
      color: #666;
    }
    ul {
      flex: 1;
      padding: 0;
      margin: 0;
      overflow: hidden;
      li {
        width: 25%;
        height: 40px;
        padding-right: 10px;
        float: left;
        list-style-type: none;
        span:hover {
          cursor: pointer;
          color: var(--primary-color);
        }
        .active {
          color: var(--primary-color);
        }
      }
    }
  }
}
.count-list {
  width: 250px;
  color: #333;
  max-height: 380px;
  overflow-y: auto;
  font-size: 12px;
  .selectOptions {
    padding: 12px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
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
  .icon-svg {
    font-size: 20px;
    color: #ff4d18;
    width: 20px;
    .icon {
      display: none;
    }
  }
  .active {
    background-color: #f8f8f8;
    .icon-svg .icon {
      display: inline-block;
    }
  }
}
</style>
