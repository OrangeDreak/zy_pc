<template>
  <div class="border-bottom">
    <div class="common-header">
      <div class="header-left">
        <div class="logo" @click="$router.push('/')"><img src="@/assets/images/common/logo.jpg" height="60px"> </img>
        </div>
      </div>

      <div class="header-right">
        <div class="nav-items">
          <div class="nav-item text-cursor" @click="handleEstimate">{{ $t('header.nav.freightEstimate') }}</div>
          <div class="nav-item text-cursor" @click="handleTransfer">{{ $t('header.nav.transfer') }}</div>
          <!-- <div class="nav-item">{{ $t('header.nav.help') }}</div> -->
        </div>
        <el-dropdown v-if="authStore.token" @command="handleCommand">
          <span class="user-info">
            <img class="user-img" height="32px" width="32px" src="@/assets/images/common/user-default.png" />
            <span class="username">{{ authStore.userInfo.username }}</span>
            <el-icon>
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">{{ $t('header.user.profile') }}</el-dropdown-item>
              <el-dropdown-item command="customers">{{ $t('header.user.customers') }}</el-dropdown-item>
              <el-dropdown-item command="orders">{{ $t('header.user.orders') }}</el-dropdown-item>
              <el-dropdown-item command="wallet">{{ $t('header.user.wallet') }}</el-dropdown-item>
              <el-dropdown-item command="ticket">{{ $t('header.user.ticket') }}</el-dropdown-item>
              <el-dropdown-item command="logout">{{ $t('header.user.logout')
                }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div v-else>
          <el-button  @click="$router.push('/login')" class="login-btn" type="primary">
            {{ $t('header.login') }}
          </el-button>
          <el-button  @click="$router.push('/register')" class="login-btn" >
            {{ $t('header.register') }}
          </el-button>
        </div>

        <el-popover
          placement="bottom"
          :width="200"
          trigger="click"
        >
          <template #reference>
            <span class="lang-switch">
              {{ currentLang === 'zh' ? '中文' : 'English' }} / {{ currentCurrency === 'CNY' ? 'CNY' : 'USD' }}
              <el-icon>
                <ArrowDown />
              </el-icon>
            </span>
          </template>
          <div class="popover-title">语言</div>
          <div class="popover-content">
            <div class="popover-item" :class="{ active: currentLang === 'zh' }" @click="handleLangChange('zh')">中文</div>
            <div class="popover-item" :class="{ active: currentLang === 'en' }" @click="handleLangChange('en')">English</div>
          </div>
          <div class="popover-title">币种</div>
          <div class="popover-content">
            <div class="popover-item" :class="{ active: currentCurrency === 'CNY' }" @click="handleCurrencyChange('CNY')">CNY</div>
            <div class="popover-item" :class="{ active: currentCurrency === 'USD' }" @click="handleCurrencyChange('USD')">USD</div>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="intercom-kf">
      <img @click="toDiscord" class="intercom-icon" src="@/assets/images/common/common_discord.png" alt="" />
      <el-popconfirm
        confirm-button-text="Copy"
        cancel-button-text=" "
        :icon="Message"
        icon-color="#c803be"
        title="service@qcelf.com"
        @confirm="confirmCopy"
        width="200"
      >
        <template #reference>
          <img class="intercom-icon" src="@/assets/images/common/common_email.png" alt="" />
        </template>
      </el-popconfirm>

      <img @click="toFk" class="intercom-icon" src="@/assets/images/common/common_fk.png" alt="" />
    </div>
    <!-- 对话框 -->
    <el-dialog v-model="dialogVisible" title="联系我们" width="30%" :before-close="handleClose">
      <div class="contact-info">
        <p>联系邮箱: example@example.com</p>
        <img src="@/assets/images/common/qrcode.jpg" alt="QR Code" class="qrcode" />
        <p>扫码添加客服微信</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useLangStore } from "@/stores/lang";
import { useCurrencyStore } from "@/stores/currency";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { Search, ArrowDown, Message } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus"

const router = useRouter();
const authStore = useAuthStore();
const langStore = useLangStore();
const currencyStore = useCurrencyStore();
const { currentLang } = storeToRefs(langStore);
const { currentCurrency } = storeToRefs(currencyStore);
const { locale } = useI18n();

const searchKeyword = ref("");
const userAvatar = ref("./assets/images/common/user-default.png");
const dialogVisible = ref(false); // 对话框显示状态
// 处理用户下拉菜单
const handleCommand = (command) => {
  if (command === "logout") {
    authStore.logout();
    router.push("/login");
  } else if (command === "profile") {
    router.push("/profile");
  } else if (command === "customers") {
    router.push("/customers");
  } else if (command === "orders") {
    router.push("/orders");
  } else if (command === "wallet") {
    router.push("/my-assets");
  } else if (command === "ticket") {
    router.push("/ticket");
  }
};
const showKf = () => {
  dialogVisible.value = true; // 显示对话框
};
const confirmCopy = () => {
  const mailText = "service@qcelf.com";
  navigator.clipboard
    .writeText(mailText)
    .then(() => {
      console.log("内容已成功复制到剪切板");
    })
    .catch((err) => {
      console.error("无法复制内容到剪切板:", err);
    });
  ElMessage.success(`复制成功`);
  
}
const handleClose = (done) => {
  dialogVisible.value = false; // 隐藏对话框
  done();
};
const toDiscord = () => {
  window.open("https://discord.gg/pMvUUf2zMJ", "_blank");
};
const toFk = () => {
  router.push("/ticket");
};
const handleEstimate = async () => {
  router.push("/estimate");
};
const handleTransfer = async () => {
  router.push("/add-transfer");
};
// 处理语言切换
const handleLangChange = (lang) => {
  langStore.setLang(lang);
  locale.value = lang; // 直接设置i18n的locale
  location.reload();
};
// 处理币种切换
const handleCurrencyChange = (currency) => {
  currencyStore.setCurrency(currency);
  location.reload();
};
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";

.border-bottom {
  height: 60px;
  border-bottom: 1px solid @border-color;
  height: 60px;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
}

.common-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;

  .header-left {
    display: flex;
    align-items: center;
    gap: 40px;
    overflow: hidden;

    .logo {
      font-size: 24px;
      font-weight: bold;
      color: @primary-color;
      overflow: hidden;
      cursor: pointer;
      padding-top: 2px;
      img {
        height: 56px;
      }
    }

    .search-wrapper {
      .search-input {
        width: 400px;

        :deep(.el-input__wrapper) {
          background-color: #f5f7fa;
        }

        :deep(.el-input__prefix) {
          margin-right: 8px;
        }

        :deep(.search-icon) {
          font-size: 16px;
          color: @text-regular;
        }

        :deep(.el-input-group__append) {
          padding: 0;
        }
      }

      .search-btn {
        width: 120px;
        border: none;
        padding: 0 15px;
        cursor: pointer;
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 40px;

    .nav-items {
      display: flex;
      gap: 30px;

      .nav-item {
        font-size: 14px;
        color: @text-regular;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;

      .user-img {
        border-radius: 32px;
      }

      .username {
        font-size: 14px;
        color: @text-regular;
      }
    }

    .lang-switch {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      color: @text-regular;
      font-size: 14px;

      &:hover {
        color: @primary-color;
      }
    }
  }
}

.intercom-kf {
  width: 50px;
  display: flex;
  flex-direction: column;
  height: 200px;
  cursor: pointer;
  position: fixed;
  right: 60px;
  bottom: 200px;
  z-index: 2147483006;
  transition: 0.2s all;
  cursor: pointer;
  .intercom-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 16px;
  }
}
.contact-info {
  text-align: center;
  .qrcode {
    width: 200px;
    height: 260px;
    margin-top: 20px;
    text-align: center;
    margin: 0 auto;
  }
}
.popover-content {
  padding: 10px 0;
  display: flex;
  gap: 10px;
  .popover-item {
    padding: 4px 12px;
    border-radius: 8px;
    border: 1px solid #e4e7ed;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      background-color: #f5f7fa;
    }
  }
  .active {
    border: 1px solid #c803be;
    color: #c803be;
  }
}
</style>