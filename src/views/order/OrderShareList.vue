<template>
  <div class="order-list">
    <!-- 订单列表 -->
    <div class="order-list-content">
      <el-table
        :data="orders"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <!-- 选择列 -->
        <el-table-column
          prop="userNo"
          :label="$t('package.table.customerCode')"
          width="100"
        />
        <el-table-column
          prop="userNo"
          :label="$t('package.table.addressInfo')"
          width="320"
        >
          <template #default="{ row }">
            <div class="user-info">
              <div v-if="row.status < 10">
                <div>
                  {{ $t("customers.info.name") }}：{{
                    row.userAddressInfo.firstName
                  }}
                </div>
                <div>
                  {{ $t("customers.info.postcode") }}：{{
                    row.userAddressInfo.postcode
                  }}
                </div>
                <div>
                  {{ $t("customers.info.phoneNumber") }}：{{
                    row.userAddressInfo.mobile
                  }}
                </div>
                <div>
                  {{ $t("customers.info.email") }}：{{
                    row.userAddressInfo.email
                  }}
                </div>
                <div>
                  {{ $t("customers.info.address") }}：{{
                    row.userAddressInfo.countryName
                  }}
                  {{ row.userAddressInfo.provinceName }}
                  {{ row.userAddressInfo.cityName }}
                  {{ row.userAddressInfo.address }}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="logisticsNumber"
          :label="$t('package.table.expressDelivery')"
        >
          <template #default="{ row }">
            <div v-if="row.status < 10">
              <div>{{ $t("trackingNumber") }}：{{ row.logisticsNumber }}</div>
              <el-popover :width="800">
                <template #reference>
                  <div v-if="row.trackingList && row.trackingList.length > 0">
                    {{ $t("logisticsTrack") }}：{{
                      row.trackingList && row.trackingList[0]?.logisticsDesc
                    }}
                  </div>
                </template>
                <template #default>
                  <div class="timeline">
                    <el-timeline>
                      <el-timeline-item
                        v-for="(item, index) in row.trackingList"
                        :key="index"
                        :timestamp="item.gmtTime"
                        placement="top"
                      >
                        <p>{{ item.logisticsDesc }}</p>
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                </template>
              </el-popover>
              <div class="image-list">
                <div
                  v-for="(url, index) in row.imgUrlList"
                  :key="url"
                  class="block"
                >
                  <el-image
                    class="image-list-item"
                    style="width: 60px; height: 60px"
                    close-on-press-escape
                    preview-teleported
                    :src="url"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="row.imgUrlList"
                    :initial-index="index"
                    z-index="8"
                    fit="cover"
                  />
                </div>
              </div>
            </div>
            <div v-else class="estimate-info">
              <div>
                <div>国际单号：{{ row.orderNo }}</div>
                <div>物流线路：{{ row.logisticsLine }}</div>
                <el-popover :width="800">
                  <template #reference>
                    <div v-if="row.trackingList && row.trackingList.length > 0">
                      {{ $t("logisticsTrack") }}：{{
                        row.trackingList && row.trackingList[0]?.logisticsDesc
                      }}
                    </div>
                  </template>
                  <template #default>
                    <div class="timeline">
                      <el-timeline>
                        <el-timeline-item
                          v-for="(item, index) in row.trackingList"
                          :key="index"
                          :timestamp="item.gmtTime"
                          placement="top"
                        >
                          <p>{{ item.logisticsDesc }}</p>
                        </el-timeline-item>
                      </el-timeline>
                    </div>
                  </template>
                </el-popover>
                <div>包裹运费：{{ row.estimateFreightPrice }}</div>
              </div>
              <div>
                <div>
                  长 {{ row.length }}，宽{{ row.width }}，高{{ row.height }}
                </div>
                <div>{{ row.realWeight }}kg；内含8件</div>
                <div>在途 7 天</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="gmtCreate"
          :label="$t('commont.createTime')"
          width="100"
        />
        <el-table-column
          prop="statusDesc"
          :label="$t('package.table.latestStatus')"
          width="100"
        >
          <template #default="{ row }">
            <el-tag>
              {{ row.statusDesc }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <div class="total">
        {{ $t("commont.total") }} {{ total }} {{ $t("commont.page") }}
      </div>
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50]"
        :total="total"
        layout="prev, pager, next, sizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { ElMessage } from "element-plus";
import { allOrderList } from "@/api/orderList";

export default {
  name: "OrderShareList",
  data() {
    return {
      orders: [],
      total: 0,
      loading: false,
      error: null,
      status: -1,
      pagination: {
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  mounted() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      // 添加路由对象验证
      await this.$nextTick()
      console.log(1122, this.$route.query?.code);
      try {
        const params = {
          pageNo: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
        };
        if (this.$route.query?.code) {
          const res = await allOrderList.decodeSharingCode({
            code: this.$route.query?.code,
          });

          params.userNo = res.data.userNo;
        const val = await allOrderList.sharingListForBusiness(params);

          this.orders = val.data;
          this.total = val.total;
        }
      } catch (err) {
        this.error = err.message || "获取订单失败";
        ElMessage.error("获取订单列表失败");
      } finally {
        this.loading = false;
      }
    },

    tableRowClassName({ row }) {
      return row.isMark ? "status-mark" : "";
    },

    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.loadOrders();
    },

    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.loadOrders();
    },
  },
};
</script>
<style lang="less" scoped>
.order-list {
  padding: 20px;
}
.estimate-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// :deep .el-table tr.status-mark {
//   background: #ffebfe;
// }
.timeline {
  height: 350px;
  overflow: scroll;
}
.image-list {
  display: flex;
  .image-list-item {
    width: 100px;
    margin-right: 8px;
    border-radius: 8px;
  }
}
.btn-box {
  padding-top: 20px;
  display: flex;
  align-content: center;
  justify-content: end;
}
.user-info {
  display: flex;
  align-items: center;
  min-width: 300px;
  word-break: break-all;
}
.order-flow {
  display: flex;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 8px;
}

.flow-item {
  display: flex;
  align-items: center;
  color: #666;
  padding: 20px;
  cursor: pointer;
}

.flow-item.active {
  color: #c803be;
  background: #fcf2fc;
}

.search-toolbar {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.search-input {
  width: 200px;
}

.order-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.tracking-no {
  font-size: 16px;
  font-weight: bold;
}

.order-info {
  margin-bottom: 16px;
}

.info-item {
  margin-bottom: 8px;
}

.info-item .label {
  color: #666;
}

.tracking-info {
  color: #409eff;
}

.order-footer {
  display: flex;
  align-items: center;
  gap: 12px;
}

.share-count {
  color: #666;
  font-size: 14px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  padding: 10px 20px;
}
</style>