<template>
  <span role="img" class="anticon">
    <svg
      class="svg-icon"
      focusable="false"
      :width="props.size"
      :height="props.size"
      :fill="props.color"
    >
      <use :xlink:href="symbolId"></use>
    </svg>
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "currentColor",
  },
  size: {
    type: String,
    default: "1em",
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style lang="less" scoped>
svg path {
  stroke: inherit;
  stroke-width: inherit;
  fill: inherit;
}
// svg:hover {
//   stroke: red;
//   fill: red;
// }
</style>
