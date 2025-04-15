<template>
  <div class="content">
    <div class="top">
      <div class="item">
        <div class="title">{{ $t('bottom.customerService') }}</div>
        <ul>
          <li><a href="#">{{ $t('bottom.customerServiceList.helpCenter') }}</a></li>
          <li><a href="/article-detail?articleId=73">{{ $t('bottom.customerServiceList.contactUs') }}</a></li>
          <li><a href="/article-detail?articleId=96">{{ $t('bottom.customerServiceList.aboutUs') }}</a></li>
        </ul>
      </div>
      <!-- <div class="item help">
        <div class="title">订单相关</div>
        <ul>
          <li><a href="#">免费退换</a></li>
          <li><a href="#">代购声明</a></li>
        </ul>
      </div> -->
      <div class="item agreement">
        <div class="title">{{ $t('bottom.warehouseCorrelation') }}</div>
        <ul>
          <li><a href="/article-detail?articleId=78">{{ $t('bottom.warehouseCorrelationList.freeQualityInspection') }}</a></li>
          <li><a href="/article-detail?articleId=77">{{ $t('bottom.warehouseCorrelationList.freeStorage') }}</a></li>
        </ul>
      </div>
      <div class="item link">
        <div class="title">{{ $t('bottom.logisticsCorrelation') }}</div>
        <ul>
          <li><a href="/article-detail?articleId=76">{{ $t('bottom.logisticsCorrelationList.insuranceService') }}</a></li>
          <li><a href="/article-detail?articleId=66">{{ $t('bottom.logisticsCorrelationList.mailingRestriction') }}</a></li>
          <li><a href="/article-detail?articleId=95">{{ $t('bottom.logisticsCorrelationList.mailingPolicy') }}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>


const goArticle = (url) => {
  window.open(url, '_blank');
};
</script>
<style lang="less" scoped>
@import "@/styles/variables.less";

.content {
  padding: 20px 0;
  border: 1px solid #efefef;
  background: #fff;
}

.top {
  width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.item {
  flex: 1;
  min-width: 150px;
  padding-left: 100px;
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 12px;
      opacity: 0.9;

      a {
        color: #333;
        text-decoration: none;

        &:hover {
          color: @primary-color; // 使用 variables.less 中定义的变量
        }
      }
    }
  }
}
</style>