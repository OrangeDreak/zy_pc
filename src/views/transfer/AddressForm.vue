<template>
  <el-dialog
    v-model="dialogVisible"
    title="新增/修改用户地址"
    width="800px"
    :close-on-click-modal="false"
  >
    <!-- 智能解析区域 -->
    <!-- <div class="parse-area">
      <el-input
        v-model="fullAddress"
        type="textarea"
        :rows="3"
        placeholder="请输入完整地址，系统将自动解析"
      />
      <div class="parse-tip">
        地址智能解析
        <el-tooltip content="支持粘贴完整地址进行智能解析" placement="top">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </div>
    </div> -->

    <!-- 表单区域 -->
    <el-form
      ref="formRef"
      :model="addressForm"
      :rules="rules"
      label-width="80px"
      class="address-form"
    >
      <el-row :gutter="20">
        <!-- 左列 -->
        <el-col :span="12">
          <el-form-item label="用户编码" prop="subCode">
            <el-input 
              :disabled="!!props.subCode"
              v-model="addressForm.subCode"
              placeholder="请输入用户编码"
            >
            <template v-if="!props.subCode" #append>
              <el-button class="primary-btn" type="primary" @click="showCustomCodeHelp">获取随机编码</el-button>
            </template>
            </el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input 
              v-model="addressForm.name"
              placeholder="请输入姓名"
            />
          </el-form-item>
          
          <el-form-item label="地址" prop="address">
            <el-input 
              v-model="addressForm.address"
              placeholder="请输入详细地址"
            />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input 
              v-model="addressForm.email"
              placeholder="请输入邮箱"
            />
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input 
              v-model="addressForm.mobile"
              placeholder="请输入联系电话"
            />
          </el-form-item>
        </el-col>

        <!-- 右列 -->
        <el-col :span="12">
          <el-form-item label="国家" prop="countryId">
            <el-select 
              v-model="addressForm.countryId"
              placeholder="请选择国家"
              filterable
            >
              <el-option
                v-for="item in countries"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="省份" prop="provinceId">
            <el-select 
              v-model="addressForm.provinceId"
              placeholder="请选择省份"
              filterable
            >
              <el-option
                v-for="item in provinces"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="cityName">
            <el-input 
              v-model="addressForm.cityName"
              placeholder="请输入城市"
            />
          </el-form-item>
          <el-form-item label="邮编" prop="postcode">
            <el-input 
              v-model="addressForm.postcode"
              placeholder="请输入邮政编码"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 底部按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="loading">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { QuestionFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { transfer } from '@/api/transfer'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  subCode: {
    type: String,
    default: ''
  },
  formData: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])
// 表单数据
const formRef = ref(null)
const loading = ref(false)
const fullAddress = ref('')
const addressForm = ref({
  name: '',
  address: '',
  mobile: '',
  countryId: '',
  provinceId: '',
  cityName: '',
  postcode: '',
  subCode: '',
})
// 对话框显示状态
const dialogVisible = ref(false)
watch(() => props.modelValue, val => {
  dialogVisible.value = val;
  addressForm.value = {};
  if (props.subCode) {
    addressForm.value.subCode = props.subCode;
  }
  if (props.formData.userAddressInfo) {
    addressForm.value = {...props.formData.userAddressInfo};
    addressForm.value.name = props.formData.userAddressInfo.firstName;
    addressForm.value.subCode = props.subCode;
  }
})
watch(() => dialogVisible.value, val => {
  emit('update:modelValue', val)
})


// 下拉选项
const countries = ref([])
const provinces = ref([])

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '请输入地址', trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '请输入电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  countryId: [
    { required: true, message: '请选择国家', trigger: 'blur' }
  ],
  provinceId: [
    { required: true, message: '请选择省份', trigger: 'blur' }
  ],
  postcode: [
    { required: true, message: '请输入邮编', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '请输入正确的邮政编码', trigger: 'blur' }
  ]
}

// 获取国家列表
const fetchCountries = async () => {
  try {
    // TODO: 调用获取国家列表API
    const response = await transfer.country({
      areaLevel: 1,
    })
    countries.value = response.data.map(item => ({ value: item.id, label: item.areaName }))
  } catch (error) {
    console.error('获取国家列表失败:', error)
    ElMessage.error('获取国家列表失败')
  }
}

// 获取省份列表
const fetchProvinces = async (countryId) => {
  try {
    // TODO: 调用获取省份列表API
    const response = await transfer.province({
      parentId: countryId
    })
    provinces.value = response.data.map(item => ({ value: item.id, label: item.areaName }))
  } catch (error) {
    console.error('获取省份列表失败:', error)
    ElMessage.error('获取省份列表失败')
  }
}
const showCustomCodeHelp = async() =>{
  try {
    const response = await transfer.getCustomCode();
    addressForm.value.subCode = response.data;
  } catch (error) {
    ElMessage.error('获取自定义编码失败');
  }
};

// 监听完整地址变化，进行智能解析
watch(fullAddress, async (val) => {
  if (!val) return
  try {
    // TODO: 调用地址解析API
    // const result = await parseAddress(val)
    // addressForm.value = {
    //   ...addressForm.value,
    //   ...result
    // }
    
    // 模拟解析
    setTimeout(() => {
      const parsed = {
        name: '张三',
        address: '北京市朝阳区xxx街道xxx号',
        mobile: '13800138000',
        country: 'CN',
        province: 'BJ',
        cityName: '北京',
        postcode: '100000'
      }
      addressForm.value = parsed
      ElMessage.success('地址解析成功')
    }, 500)
  } catch (error) {
    console.error('地址解析失败:', error)
    ElMessage.error('地址解析失败')
  }
})

// 监听国家变化，更新省份列表
watch(() => addressForm.value.countryId, async (val) => {
  if (val) {
    await fetchProvinces(val)
  }
})
// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // TODO: 调用保存地址API
        console.log(addressForm.value);
        const params = addressForm.value;
        params.firstName = params.name;
        params.lastName = params.name;
        params.subCode = params.subCode !== '' ? params.subCode : props.subCode;
        if (props.formData.id) {
          params.id = props.formData.id;
          await transfer.updateUserAddress(params);
        } else {
          await transfer.addUserAddress(params);
        }
        emit('submit', addressForm.value)
        ElMessage.success('保存成功')
        dialogVisible.value = false
      } catch (error) {
        console.error('保存失败:', error)
        ElMessage.error('保存失败')
      } finally {
        loading.value = false
      }
    }
  })
}

// 初始化获取国家列表
onMounted(() => {
  fetchCountries();
})
</script>

<style lang="less" scoped>
@import '@/styles/variables.less';
.primary-btn{
  color: #fff !important;
  background-color: @primary-color !important;
}

.parse-area {
  background-color: @primary-light;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  position: relative;

  .parse-tip {
    position: absolute;
    top: 10px;
    right: 15px;
    color: #909399;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

.address-form {
  :deep(.el-input__wrapper) {
    background-color: #f5f7fa;
  }

  :deep(.el-input-group__append) {
    cursor: pointer;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>