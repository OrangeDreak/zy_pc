<!-- <template>
    <div class="account">
      <el-tabs>
        <el-tab-pane key="1" >
          <div  class="content">
            <div class="sessionBox">
              <div v-if="!informationLoading" class="informationBox">
                <div class="left">
                  <el-avatar v-if="!formData.avatar" style="flex-shrink: 0" :size="100">
                    <template #icon><UserOutlined /></template>
                  </el-avatar>
                  <el-avatar
                    v-if="formData.avatar"
                    style="flex-shrink: 0"
                    :size="100"
                    :src="formData.avatar"
                  />
                  <div class="userID">
                    <span style="margin-right: 5px">ID:{{ formData.id }} </span>
                    <CopyOutlined @click="copyId(formData.id)" />
                  </div>
                </div>

                <div class="right">
                <div class="top">
                  <div class="leftOne">
                    <div class="leftOneTop">
                      <span class="userName">{{ formData.nickname }}</span>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <div class="bottomCol">
                    <div class="itemBottom">
                      昵称 : {{ formData.nickname }}
                    </div>
                    <div class="itemBottom">
                      <div>邮箱 : {{ formData.email || "--" }}</div>
                      <template v-if="formData.status === 2">
                        <img class="warn" src="@/assets/images/icon/warn.png" alt="" />
                        <div class="flag" @click="goActivate">
                          <div class="tip">
                            {{ $t("emailActivateBtn2") }}
                            <img src="@/assets/images/icon/arrow-right2.png" alt="" />
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
            
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </template>
   -->
  <template>
  <div class="bg-gray-50 min-h-[1024px]">
    <div class="min-h-[1024px]">
      <div
        class=" bg-white rounded-lg shadow-lg p-8"
        style="--el-color-primary: #c803be"
      >
        <div class="flex items-start space-x-8">
          <div class="relative">
            <div
              class="w-[120px] h-[120px] rounded-full bg-gray-200 overflow-hidden shadow-md flex items-center justify-center"
            >
              <el-avatar
                :size="120"
                :src="formData.avatar || '/src/assets/images/common/user-default.png'"
                class="w-full h-full object-cover"
              />
            </div>
            <el-button
              class="absolute bottom-0 right-0 w-8 h-8 !p-0 !rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-all"
              type="primary"
            >
              <el-icon><Camera /></el-icon>
            </el-button>
          </div>
          <div class="flex-1 space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-semibold text-[#c803be] mb-1">
                  {{ formData.nickname }}
                </h2>
                <p class="text-gray-500 text-sm">ID: {{ formData.id }}</p>
              </div>
              <el-button
                type="primary"
                class="whitespace-nowrap !rounded-button"
              >
                <template #icon>
                  <el-icon><Edit /></el-icon>
                </template>
                编辑资料
              </el-button>
            </div>
            <div class="space-y-4">
              <div
                class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <el-icon
                  class="email-icon w-5 h-5 text-[#c803be] flex items-center justify-center"
                >
                  <component is="Message" />
                </el-icon>
                <div>
                  <p class="text-sm text-gray-500">邮箱地址</p>
                  <p class="text-[#c803be]">{{ formData.email || "--" }}</p>
                </div>
              </div>

              <div
                class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <el-icon
                  class="chat-icon w-5 h-5 text-[#c803be] flex items-center justify-center"
                >
                  <component is="ChatLineSquare" />
                </el-icon>
                <div>
                  <p class="text-sm text-gray-500">昵称</p>
                  <p class="text-[#c803be]"> {{ formData.nickname }} </p>
                </div>
              </div>

              <div
                class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <el-icon
                  class="phone-icon w-5 h-5 text-[#c803be] flex items-center justify-center"
                >
                  <component is="Phone" />
                </el-icon>
                <div>
                  <p class="text-sm text-gray-500">手机号码</p>
                  <p class="text-[#c803be]">--</p>
                </div>
              </div>

            </div>

            <!-- <div class="pt-6 border-t border-gray-100">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <el-icon class="text-[#c803be]"><Lock /></el-icon>
                  <span class="text-sm text-gray-600">账号安全</span>
                </div>
                <el-button
                  link
                  type="primary"
                  class="!text-sm flex items-center"
                >
                  查看详情
                  <el-icon class="ml-1"><ArrowRight /></el-icon>
                </el-button>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { Edit, Camera, Phone, ChatLineSquare, Message, Lock, ArrowRight } from '@element-plus/icons-vue';
import { ElMessage } from "element-plus";
import { userInfo } from "@/api/profile.js";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UserInfo",
  setup() {
    // 分页状态
    const router = useRouter();
    const formData = ref({});
    // 加载订单列表
    const loadUserinfo = async () => {
      try {
        const result = await userInfo.getUserInfo();
        formData.value = result.data;
      } catch (err) {
        error.value = err.message || "获取客户失败";
        ElMessage.error("获取客户列表失败");
      } finally {
        loading.value = false;
      }
    };

    // 组件挂载时加载数据
    loadUserinfo();

    return {
      formData,
      loadUserinfo,
    };
  },
});
</script>
  
  <style>
.qel-text {
  color: #666;
  font-size: 12px;
  max-width: 350px;
  white-space: pre-wrap;
}
.myPrerogative-desc {
  max-width: 300px;
}
</style>
  <style lang="less" scoped>
:deep(.ant-upload-list, .ant-upload-list-text) {
  display: none;
}

:deep(.ant-avatar) {
  border-radius: 50%;
  img {
    border-radius: 50%;
  }
}
:deep(.ant-table-cell::before) {
  width: 0 !important;
  // border-right: none;
}
.moRenIcon {
  height: 7px;
  background: rgba(6, 217, 214, 0.08);
  margin-right: 2px;
  border-radius: 2px;
  padding: 0 4px;
  font-size: 12px;
  transform: scale(0.83);
}
:deep(.ant-space) {
  justify-content: space-between;
}
:deep(.ant-form, .ant-form-horizontal) {
  width: 100%;
}
:deep(.ant-select-selector) {
  height: 36px !important;
  // line-height: 36px !important;
  .ant-select-selection-search {
    height: 36px !important;
    // line-height: 36px !important;
  }
  .ant-select-selection-item {
    height: 36px !important;
    line-height: 36px !important;
  }
}
:deep(.ant-tabs-nav) {
  padding: 12px 0 0px 24px;
  background-color: #fff;
  font-weight: 500;
  margin-bottom: 0;
  font-size: 14px;
}
:deep(.ant-tabs-tab) {
  padding-bottom: 17px;
}

:deep(.ant-modal) {
  width: 800px !important;
  height: 480px !important;
  :deep(.ant-modal-body) {
    padding: 24px;
  }
}
// .tipsBox {
.tipsText {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
}
// }
.deleteFooter {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  :deep(.ant-btn) {
    border: none;
    color: #fff;
    background-color: var(--primary-color);
    border-radius: 4px;
  }
  .cancelBtn {
    background-color: #fff;
    color: #000;
    border: 1px solid #ddd;
    margin-right: 10px;
  }
}

// 国家下拉框
.countryFlag {
  display: inline-block;
  width: 14px;
  height: 14px;

  //   top: 13px;
}
// .model {
//   padding: 24px;
//   .shdzTitle {
//     font-size: 16px;
//   }
// }
// .shdzForm {
//   width: 100%;
//   margin-top: 24px;
//   display: flex;
//   justify-content: center;
//   padding: 0 32px;
// }

.account {
  // padding-top: 20px;
  background-color: #f3f3f3;
  margin-bottom: 20px;
  .content {
    background-color: #f3f3f3;
    // padding-bottom: 20px;
  }
  .sessionBox {
    // margin-top: 24px;
    width: 100%;
    height: 220px;
    background: #c803be;
    padding: 24px;
    border-radius: 4px;
  }
  .informationBox {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    padding: 24px;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid #ffffff;
    display: flex;
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 40px;
      .userID {
        margin-top: 8px;
        color: #999999;
      }
    }
    .right {
      display: flex;
      flex: 1;
      flex-direction: column;
      .top {
        display: flex;
        justify-content: space-between;
        .leftOne {
          .leftOneTop {
            // display: inline-block;
          }
          .userName {
            font-size: 18px;
            font-weight: 600;
          }
          .vip {
            display: inline-box;
            height: 20px;
            margin-left: 6px;
            font-size: 16px;
            color: #fff;
            padding: 2px 7px;
            background-image: linear-gradient(to right, #ffbc8c, #d88a61);
            border-radius: 10px;
          }
          .grow {
            display: inline-flex;
            align-items: center;
            margin-top: 8px;
            padding: 4px 8px;
            margin-bottom: 8px;
            background-color: #f5f5f5;
            border-radius: 12px;
            cursor: pointer;
            .rightArrow {
              display: inline-block;
              width: 14px;
              height: 14px;
              background-image: url("../../../assets/images/mine/rightArrow.png");
            }
          }
        }
        .rightOne {
          :deep(.ant-btn) {
            border-radius: 16px;
          }
        }
      }
      .bottom {
        display: flex;
        margin-top: 2px;
        // justify-content: space-between;
        justify-content: flex-start;
        .bottomCol {
          width: 50%;
        }
        .itemBottom {
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          .warn {
            width: 17px;
            margin: 0 10px 0 4px;
            animation: warnRotate 1s infinite;
          }
          .flag {
            position: relative;
            background: #f25643;
            height: 21px;
            padding: 0 6px;
            font-size: 12px;
            color: #fff;
            display: flex;
            align-items: center;
            border-radius: 6px;
            cursor: pointer;
            img {
              height: 9px;
              margin-left: 6px;
            }
            &::after {
              content: "";
              position: absolute;
              left: -11px;
              top: 6px; /* 三角形的一半的高度 */
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 6px solid #f25643;
              border-top: 5px solid transparent; /* 与背景色相同 */
              border-bottom: 5px solid transparent; /* 与背景色相同 */
            }
          }
        }
      }
    }
  }
  .myPrerogative {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    padding: 24px;
    background-color: #ffffff;
    margin-top: 16px;
    padding: 20px;
    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      .desc {
        white-space: pre-wrap;
        width: 200px;
        font-size: 12px;
        color: #fff;
      }
    }

    .vipBox {
      width: 100%;
      // border: 1px solid #e0e0e0;
      // border-radius: 8px;
      .vipBoxTop {
        background-color: #f5f5f5;
        display: flex;
        padding: 10px;
        padding-right: 24px;
        border-bottom: 0px;
        border: none;
        border-radius: 8px 8px 0 0;

        // justify-content: space-between;
        .djtq {
          margin-right: 116px;
          margin-left: 10px;
          line-height: 52px;
          font-size: 16px;
        }
        .djtqVN {
          margin-right: 80px;
          display: flex;
          align-items: center;
        }
        .vipdjBox {
          flex: 1;
          display: flex;
          justify-content: space-between;
          .topBox {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            position: relative;
            // background-color: #F5F5F5;
            .bfbp {
              position: absolute;
              bottom: -105%;
            }
            .bfbpVN {
              bottom: -80%;
            }
            .yfjmCurrent {
              color: var(--primary-color);
            }
          }
          .topBoxVN {
            align-items: center;
          }
          .vipdj {
            // width: 80px;
            // height: 52px;
            padding: 6px;
            padding-left: 16px;
            padding-right: 16px;
            border-radius: 8px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
          }
          .vipdjVN {
            padding-left: 4px;
            padding-right: 4px;
          }
          .vipdjCurrent {
            color: #fff;
            background-color: var(--primary-color);
          }
          .growText {
            font-size: 12px;
          }
          .growTextVN {
            text-align: center;
          }
        }
      }
      .vipBoxBottom {
        background-color: #fff;
        display: flex;
        padding: 10px;
        padding-right: 24px;
        border: 1px solid #e0e0e0;
        border-top: 0px;
        border-radius: 0 0 8px 8px;
        .yfjm {
          margin-right: 84px;
          margin-left: 10px;
          line-height: 52px;
          font-size: 16px;
        }
        .yfjmCurrent {
          color: var(--primary-color);
        }
        .bfbBox {
          flex: 1;
          display: flex;
          justify-content: space-between;
          border-radius: 0 0 8px 8px;
          .bfb {
            font-size: 16px;
            // padding: 6px 8px 6px 8px;
            padding-left: 22px;
            padding-right: 22px;
            border-radius: 8px;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .bfbCurrent {
            color: #ff1e05;
          }
        }
      }
    }

    // flex-direction: space-around;
  }
  .xgxxContent {
    padding: 17px;
    background-color: #fff;
    .xgxxFormBox {
      width: 600px;
      margin: 0 auto;
      margin-bottom: 48px;

      :deep(.ant-select) {
        height: 36px;

        .ant-select-selector {
          height: 36px;
          line-height: 36px;
          // background-color: #f5f5f5;
          padding-left: 12px;
          // border: none;
        }
        // 文字垂直居中
        .ant-select-selection-item {
          height: 36px;
          line-height: 36px;
          // background-color: #f5f5f5;
        }
        .ant-select-selection-search-input {
          height: 36px;
          // line-height: 40px;
        }
      }
      .xgxxAvatarBox {
        margin-top: 48px;
        :deep(.ant-btn) {
          margin-left: 20px;
          border-radius: 16px;
          color: #666666;
          background-color: #fcfcfc;
        }
        .xgxxFormCol {
          display: flex;

          // :deep(.ant-row, .ant-form-item) {
          //   width: 290px !important;
          //   // display: inline-block;
          // }
        }
      }
    }
  }
  .xgxxFooter {
    width: 100%;
    height: 72px;
    background: #fff;
    box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: center;
    align-items: center;
    :deep(.ant-btn, .ant-btn-primary) {
      height: 40px;
      font-size: 18px;
      padding: 0px 30px;
      font-weight: 600;
      border: none;
    }
  }
  .shdzBox {
    background-color: #fff;
    padding: 24px;
    .shdzTop {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .shdzTopLeft {
        font-size: 14px;
      }
      .shdzTopRight {
        :deep(.ant-btn) {
          color: #fff;
          background-color: var(--primary-color);
          border: none;
        }
        // .newshdz {
        // }
      }
    }
    .shdzBottom {
      margin-top: 24px;
      // overflow: hidden;
      // border: 1px solid #e0e0e0;
      .shdzBottomA {
        color: #000;
        display: inline-block;
        margin-bottom: 4px;
      }
      .shdzBottomA:hover {
        color: var(--primary-color);
      }
    }
  }
  .zhaqContent {
    padding: 17px 24px 24px 24px;
    background-color: #fff;
    .vertical-line {
      display: inline-block;
      position: relative;
      width: 2px;
      height: 14px; /* 设置竖线的高度 */
      background-color: var(--primary-color); /* 设置竖线的颜色 */
      margin-right: 8px;
    }
    .vertical-line::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      background-color: var(--primary-color);
    }
    .zhaqTitle {
      width: 100%;
      height: 40px;
      background-color: #f8f8f8;
      padding-left: 12px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
    }
    .jcxxBox {
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      .jcxxBoxLeft {
        .col {
          margin-bottom: 16px;
        }
        .xgz {
          margin-right: 16px;
        }
        a:hover {
          color: #fe2717;
        }
      }
      .jcxxBoxRight {
        :deep(.ant-btn) {
          border-radius: 16px;
          color: #666666;
          padding: 0 15px;
          border: 1px solid #e0e0e0;
          background-color: #fcfcfc;
        }
        :deep(.ant-btn):hover {
          color: var(--primary-color);
          border: 1px solid var(--primary-color);
        }
      }
    }
    .aqfwTitle {
      width: 100%;
      height: 40px;
      background-color: #f8f8f8;
      padding-left: 12px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      margin-top: 24px;
    }
    .aqfwBox {
      .aqfwCol {
        padding: 24px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        :deep(.ant-btn) {
          // color: #ff1e05;
          color: #fff;
          background-color: var(--primary-color);
          padding: 0 16px;
          border-radius: 6px;
          border: none;
        }
        .aqfwColLeft {
          margin-right: 20px;
          display: flex;
          align-items: center;
          img {
            width: 36px;
            margin-right: 10px;
          }
          .aqfwColTitle {
            margin-bottom: 12px;
            color: #111111;
            font-size: 14px;
            font-weight: 600;
          }
        }
      }
      .aqfwColBorder {
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
      }
    }
  }
  .xxkContent {
    padding: 17px 24px 24px 24px;
    background-color: #fff;
    .xxkKongBox {
      width: 100%;
      // height: 126px;
      padding: 32px 0;
      background-color: #f8f8f8;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .xxkKongText {
        color: #333333;
        font-size: 16px;
        line-height: 20px;
        // font-weight: 500;
      }
      :deep(.ant-btn) {
        // height: 40px;
        // background-color: #fff;
        font-size: 14px;
        padding: 0px 30px;
        font-weight: 600;
        border: none;
        background-color: var(--primary-color);
        color: #fff;
        border-radius: 15px;
        margin-top: 12px;
      }
    }
    .xxkAddressBox {
      width: 100%;
      display: flex;
      justify-content: space-between;
      // align-items: center;
      padding-top: 10px;

      .xxkAddressLeft {
        .nameRow {
          .firstName {
            font-size: 22px;
            font-weight: 600;
          }
          .lastName {
            font-size: 22px;
            font-weight: 600;
            margin: 0 10px;
          }
          // .telText {
          // }
        }
        .cityRow {
          margin: 10px 0;
          .area {
            margin: 0 5px;
          }
        }
        // .addressRow {
        //   .addressText{}
        // }
      }
      // .xxkAddressRight {

      // }
    }
  }
  .xxkBottomBox {
    margin-bottom: 30px;
    padding: 0px 24px 30px;
    background-color: #fff;
    :deep(.ant-btn) {
      border: none;
      // border-radius: 16px;
      font-weight: 500;
    }
    .deleteB {
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
    }
    .editB {
      background-color: var(--primary-color);
      color: #fff;
      margin-left: 14px;
    }
  }
  .xxkBorder {
    height: 154px;
    // height: 100%;
    // background: url("../../../assets/images/mine/xxkBorder.png") 0/100% 100% no-repeat;
    background-color: #fff;
    padding-bottom: 30px;
    padding-top: 30px;
  }
}

@keyframes warnRotate {
  0% {
    transform: rotate(-25deg);
  }
  50% {
    transform: rotate(25deg);
  }
  100% {
    transform: rotate(-25deg);
  }
}
</style>
  