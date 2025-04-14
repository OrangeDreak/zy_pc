<template>
  <el-container class="layout-container">
    <!-- 使用公共头部 -->
    <common-header />
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="aside">
        <!-- 用户信息 -->
        <div class="user-panel">
          <div class="account">{{ $t('menu.myAccount') }}</div>
        </div>

        <!-- 导航菜单 -->
        <el-menu
          :default-active="route.path"
          router
          :collapse="false"
        >
        <el-menu-item index="/profile">
            <el-icon><Star /></el-icon>
            <span>{{ $t('menu.profile') }}</span>
          </el-menu-item>
        <el-menu-item index="/customers">
            <el-icon><User /></el-icon>
            <span>{{ $t('menu.customers') }}</span>
          </el-menu-item>
          <el-menu-item index="/orders">
            <el-icon><Van /></el-icon>
            <span>{{ $t('menu.transferOrder') }}</span>
          </el-menu-item>

          <!-- <el-menu-item index="/warehouse">
            <el-icon><Box /></el-icon>
            <span>{{ $t('menu.warehouse') }}</span>
          </el-menu-item> -->

          <!-- <el-menu-item index="/package">
            <el-icon><Goods /></el-icon>
            <span>{{ $t('menu.package') }}</span>
          </el-menu-item> -->

          <el-menu-item index="/my-assets">
            <el-icon><Wallet /></el-icon>
            <span>{{ $t('menu.assets') }}</span>
          </el-menu-item>

          <el-menu-item index="/add-transfer">
            <el-icon><Plus /></el-icon>
            <span>{{ $t('menu.addTransfer') }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 内容区 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLangStore } from '@/stores/lang'
import { storeToRefs } from 'pinia'
import CommonHeader from '@/components/layout/CommonHeader.vue'

import { 
  Search,
  Camera,
  Bell,
  Van,
  Box,
  Goods,
  ShoppingCart,
  Wallet,
  Medal,
  Share,
  ArrowDown,
  Plus,
  User,
  Star,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const langStore = useLangStore()
const { currentLang } = storeToRefs(langStore)

const searchKeyword = ref('')
const userAvatar = ref('https://placeholder.com/32')

// 处理用户下拉菜单
const handleCommand = (command) => {
  if (command === 'logout') {
    authStore.logout()
    router.push('/login')
  } else if (command === 'profile') {
    router.push('/profile')
  }
}

// 处理语言切换
const handleLangChange = (lang) => {
  langStore.setLang(lang)
}

const handleEstimate = async () => {
    router.push("/estimate");
};
const handleTransfer = async () => {
    router.push("/add-transfer");
};
</script>

<style lang="less" scoped>
@import '@/styles/variables.less';

.layout-container {
  min-height: 100vh;

  .aside {
    background-color: #fff;
    border-right: 1px solid @border-color;
    padding-top: 60px;
    
    .user-panel {
      padding: 20px;
      border-bottom: 1px solid @border-color;

      .account {
        font-size: 16px;
        font-weight: bold;
        color: @text-primary;
      }
    }

    :deep(.el-menu) {
      border-right: none;

      .el-menu-item {
        display: flex;
        align-items: center;
        height: 50px;
        padding: 0 20px;
        
        &.is-active {
          background-color: mix(@primary-color, #fff, 5%);
          color: @primary-color;
          font-weight: bold;
        }

        &:hover {
          background-color: mix(@primary-color, #fff, 3%);
        }

        .el-icon {
          font-size: 18px;
          margin-right: 10px;
        }
      }
    }
  }

  .el-main {
    background-color: #f5f7fa;
    padding:60px 20px 20px;
  }
}
</style> 