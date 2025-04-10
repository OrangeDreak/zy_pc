methods: {
  async loadOrders() {
    try {
      const params = {
        pageNo: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
      };
      if (this.$route.query?.code) {
        const res = await allOrderList.decodeSharingCode({
          code: this.$route.query?.code,
        });

        // 确保 res.data.userNo 存在
        if (res.data && res.data.userNo) {
          params.userNo = res.data.userNo;
          const val = await allOrderList.sharingListForBusiness(params);

          this.orders = val.data;
          this.total = val.total;
        } else {
          throw new Error("UserNo is missing in the response");
        }
      } else {
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