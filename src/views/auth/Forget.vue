<template>
  <div class="register-container">
    <common-header />

    <div class="register-content">
      <!-- 左侧 Logo 和标语 -->
      <div class="register-left">
        <div class="slogan">
          <div class="slogan-text">中国购物，递送全球</div>
          <div class="features">
            <div class="feature-item">
              <div class="feature-title">免费保险</div>
              <div class="feature-desc">保证您的资金安全</div>
            </div>
            <div class="feature-item">
              <div class="feature-title">7*12客服</div>
              <div class="feature-desc">全球覆盖</div>
            </div>
            <div class="feature-item">
              <div class="feature-title">100+航运公司</div>
              <div class="feature-desc">可靠的售后服务</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧注册表单 -->
      <div class="register-right">
        <el-card class="register-card">
          <h2 class="register-title">找回密码</h2>

          <el-form ref="formRef" :model="registerForm" :rules="rules">
            <el-form-item prop="firstName">
              <el-input
                v-model="registerForm.firstName"
                placeholder="请填写姓氏"
                prefix-icon="Message"
              />
            </el-form-item>
            <el-form-item prop="lastName">
              <el-input
                v-model="registerForm.lastName"
                placeholder="请填写名字"
                prefix-icon="Message"
              />
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                v-model="registerForm.email"
                placeholder="输入您绑定的邮箱"
                prefix-icon="Message"
              />
            </el-form-item>
            <el-form-item prop="emailCaptcha">
              <el-input
                v-model="registerForm.emailCaptcha"
                placeholder="请输入邮箱验证码"
                prefix-icon="Promotion"
              >
                <template #suffix>
                  <el-button
                    class="code-btn"
                    type="primary"
                    :disabled="isCaptchaDisabled"
                    @click="handleGetCaptcha"
                  >
                    获取验证码
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="registerForm.password"
                type="password"
                placeholder="请输入重置密码"
                prefix-icon="Lock"
                show-password
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="确认密码"
                prefix-icon="Lock"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="register-button"
                :loading="loading"
                @click="handleRegister"
              >
                确定
              </el-button>
            </el-form-item>

            <div class="login-link">
              已有账号？<el-link type="primary" @click="$router.push('/login')"
                >去登录</el-link
              >
            </div>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { auth } from "@/api/auth";
import CommonHeader from "@/components/layout/CommonHeader.vue";
import { ArrowDown, Message, Lock, Promotion } from "@element-plus/icons-vue";

const router = useRouter();
const formRef = ref(null);
const loading = ref(false);
const currentTime = ref("");

const registerForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
  inviteCode: "",
  agreement: false,
});

const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== registerForm.value.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

const rules = {
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度不能小于6位", trigger: "blur" },
  ],
  agreement: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error("请阅读并同意用户协议和隐私声明"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
};

// 更新时间
const updateTime = () => {
  const now = new Date();
  currentTime.value = now
    .toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(/\//g, "-");
};

let timer = null;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});

const showAgreement = (type) => {
  // TODO: 显示用户协议或隐私声明
  ElMessage.info(`查看${type === "user" ? "用户协议" : "隐私声明"}`);
};

const handleGetCaptcha = async() => {
  // TODO: 获取验证码
  try {
    const response = await auth.sendEmailCode({
      email: registerForm.value.email,
      emailScene: 0,
    });
    ElMessage.info("发送验证码成功，请查看邮箱");
  } catch (error) {
    ElMessage.error("获取验证码失败");
  }
};
const handleRegister = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        await auth.register({
          firstName: registerForm.value.firstName,
          lastName: registerForm.value.lastName,
          email: registerForm.value.email,
          password: registerForm.value.password,
          emailCaptcha: registerForm.value.emailCaptcha,
        });
        ElMessage.success("注册成功");
        router.push("/login");
      } catch (error) {
        console.error("注册失败:", error);
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>

<style lang="less" scoped>
@import "@/styles/variables.less";

.register-container {
  min-height: 100vh;
  background: linear-gradient(135deg, @primary-bg 0%, @primary-lighter 100%);
  display: flex;
  flex-direction: column;

  .register-content {
    min-width: 1280px;
    margin: 0 auto;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 40px;
    gap: 100px;

    .register-left {
      flex: 1;
      color: #fff;
      padding-left: 10%;

      .logo {
        font-size: 48px;
        font-weight: bold;
        margin-bottom: 40px;
        background: linear-gradient(
          to right,
          @primary-color,
          darken(@primary-color, 10%)
        );
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

    .register-right {
      width: 400px;
      margin-right: 10%;

      .register-card {
        background: #fff;
        border-radius: 8px;
        padding: 20px;

        .register-title {
          font-size: 24px;
          text-align: left;
          margin: 0 0 30px 0;
          color: #333;
        }

        .agreement {
          margin-bottom: 20px;

          :deep(.el-checkbox__label) {
            color: @text-regular;
          }
        }

        .register-button {
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

        .login-link {
          text-align: center;
          margin-top: 15px;
          color: @text-regular;
        }

        :deep(.el-input__wrapper) {
          background-color: #f5f7fa;
        }
      }
    }
  }
}
.code-btn{
  margin-right: -11px;
}
</style> 