<template>
  <div class="login-container">
    <common-header />

    <div class="login-content">
      <!-- 左侧 Logo 和标语 -->
      <div class="login-left">
        <div class="slogan">
          <div class="slogan-text">{{ $t('login.tip1') }}</div>
          <div class="features">
            <div class="feature-item">
              <div class="feature-title">{{ $t('login.tip2') }}</div>
              <div class="feature-desc">{{ $t('login.tip3') }}</div>
            </div>
            <div class="feature-item">
              <div class="feature-title">{{ $t('login.tip4') }}</div>
              <div class="feature-desc">{{ $t('login.tip5') }}</div>
            </div>
            <div class="feature-item">
              <div class="feature-title">{{ $t('login.tip6') }}</div>
              <div class="feature-desc">{{ $t('login.tip7') }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧登录表单 -->
      <div class="login-right">
        <el-card class="login-card">
          <h2 class="login-title">{{ $t('login.login') }}</h2>
          
          <el-form ref="formRef" :model="loginForm" :rules="rules">
            <el-form-item prop="loginName">
              <el-input 
                v-model="loginForm.loginName"
                :placeholder="$t('login.email')"
                prefix-icon="Message"
              />
            </el-form-item>
            
            <el-form-item prop="password">
              <el-input 
                v-model="loginForm.password"
                type="password"
                :placeholder="$t('login.password')"
                prefix-icon="Lock"
                show-password
              />
            </el-form-item>

            <div class="form-options">
              <span class="forgot-password" @click="$router.push('/forget')">{{ $t('login.forgotPassword') }}</span>
              <el-link type="primary" @click="$router.push('/register')">{{ $t('login.register') }}</el-link>
            </div>

            <el-form-item>
              <el-button 
                type="primary" 
                class="login-button"
                :loading="loading"
                @click="handleLogin"
              >
                {{ $t('login.login') }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { auth } from '@/api/auth'
import { useAuthStore } from '@/stores/auth'
import { ArrowDown, Message, Lock } from '@element-plus/icons-vue'
import CommonHeader from "@/components/layout/CommonHeader.vue";

const router = useRouter()
const authStore = useAuthStore()
const formRef = ref(null)
const loading = ref(false)
const currentTime = ref('')

const loginForm = ref({
  loginName: '',
  password: ''
})

const rules = {
  loginName: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

// 更新时间
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '-')
}

let timer = null

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const handleLogin = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const res = await auth.login(loginForm.value)
        console.log('登录成功:', res)
        authStore.setToken(res.data.token)
        // authStore.setUserInfo(res.userInfo)
        ElMessage.success('登陆成功')
        router.push('/')
      } catch (error) {
        console.error('登陆失败:', error)
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style lang="less" scoped>
@import '@/styles/variables.less';

.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, @primary-bg 0%, @primary-lighter 100%);
  display: flex;
  flex-direction: column;

  .login-content {
    min-width: 1280px;
    margin: 0 auto;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 40px;
    gap: 100px;

    .login-left {
      flex: 1;
      color: #fff;
      padding-left: 10%;

      .logo {
        font-size: 48px;
        font-weight: bold;
        margin-bottom: 40px;
        background: linear-gradient(to right, @primary-color, darken(@primary-color, 10%));
        -webkit-background-clip: text;
        color: transparent;
      }

      .slogan {
        .slogan-text {
          font-size: 36px;
          margin-bottom: 60px;
          color: @primary-color;
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 30px;

          .feature-item {
            .feature-title {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 5px;
              color: @primary-color;
            }

            .feature-desc {
              font-size: 16px;
              opacity: 0.8;
              color: @text-regular;
            }
          }
        }
      }
    }

    .login-right {
      width: 500px;
      margin-right: 10%;

      .login-card {
        background: #fff;
        border-radius: 8px;
        padding: 20px;

        .login-title {
          font-size: 24px;
          text-align: left;
          margin: 0 0 30px 0;
          color: #333;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          
          .forgot-password {
            color: @text-regular;
            cursor: pointer;
            
            &:hover {
              color: @primary-color;
            }
          }
        }

        .login-button {
          width: 100%;
          height: 40px;
          font-size: 16px;
          background-color: @primary-color;
          border-color: @primary-color;

          &:hover {
            background-color: darken(@primary-color, 10%);
            border-color: darken(@primary-color, 10%);
          }
        }

        :deep(.el-input__wrapper) {
          background-color: #f5f7fa;
        }
      }
    }
  }
}
</style> 