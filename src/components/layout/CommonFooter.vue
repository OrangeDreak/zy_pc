<template>
  <div class="content">
    <div class="top">
      <div class="item">
        <div class="title">客户服务</div>
        <ul>
          <li><a href="#">帮助中心</a></li>
          <li><a href="#">联系我们</a></li>
          <li><a href="#">关于我们</a></li>
        </ul>
      </div>
      <div class="item help">
        <div class="title">订单相关</div>
        <ul>
          <li><a href="#">免费退换</a></li>
          <li><a href="#">代购声明</a></li>
        </ul>
      </div>
      <div class="item agreement">
        <div class="title">仓库相关</div>
        <ul>
          <li><a href="#">免费质检</a></li>
          <li><a href="#">免费仓储</a></li>
        </ul>
      </div>
      <div class="item link">
        <div class="title">物流相关</div>
        <ul>
          <li><a href="#">免费保险</a></li>
          <li><a href="#">邮寄限制</a></li>
          <li><a href="#">邮寄政策</a></li>
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