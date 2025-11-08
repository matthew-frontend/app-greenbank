<template>
  <v-breadcrumbs :items="items" class="breadcrumbs">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right" size="small"></v-icon>
    </template>
    <template v-slot:title="{ item }">
      <span
        :class="{
          'text-black': item.disabled,
          'text-primary': !item.disabled,
        }"
      >
        {{ item.title }}
      </span>
    </template>
  </v-breadcrumbs>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style scoped lang="scss">
.breadcrumbs {
  padding: 16px 0;
  margin-bottom: 30px;
  flex-wrap: wrap;
  row-gap: 10px;
  :deep(.v-breadcrumbs-item) {
    font-size: 16px;
    font-weight: 500;
  }

  :deep(.v-breadcrumbs-item--disabled) {
    opacity: 0.6;
    font-weight: 600;
    color: #000;
  }

  :deep(.v-breadcrumbs-divider) {
    padding: 0 8px;
    opacity: 0.5;
  }
}
</style>
