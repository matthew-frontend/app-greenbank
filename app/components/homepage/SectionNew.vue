<template>
  <section class="section-new">
    <VContainer max-width="1240">
      <h2>New Arrival</h2>

      <v-tabs
        v-model="tab"
        class="category-tabs"
        color="primary"
        align-tabs="center"
        hide-slider
      >
        <v-tab
          v-for="item in tabs"
          :key="item.value"
          :value="item.value"
          class="category-tab"
        >
          {{ item.label }}
        </v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item
          v-for="item in tabs"
          :key="item.value"
          :value="item.value"
        >
          <div class="productList">
            <CardProduct
              v-for="product in productsByCategory[item.value] || []"
              :key="product.id"
              :product="product"
            />
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </VContainer>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import CardProduct from "~/components/CardProduct.vue";
import { categories, getProductsByCategory } from "~/data/products.js";

const tabs = categories;

// Group products by category
const productsByCategory = computed(() => {
  const grouped = {};
  categories.forEach((cat) => {
    grouped[cat.value] = getProductsByCategory(cat.value);
  });
  return grouped;
});

const tab = ref(tabs[0].value);
</script>

<style scoped lang="scss">
.section-new {
  background-color: #fefbf8;
  padding: 60px 0 80px;
  h2 {
    font-size: 34px;
    margin: 0;
    text-align: center;
  }

  .category-tabs {
    margin-bottom: 24px;
    .category-tab {
      font-size: 16px;
      text-transform: none;
      letter-spacing: 0;
    }
    :deep(.v-slide-group__content) {
      .v-tab-item--selected {
        span.v-btn__content {
          font-weight: 600;
          color: #d49f4d;
        }
      }
      .v-btn__overlay {
        background-color: transparent !important;
      }
    }
  }

  .productList {
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
    overflow-x: auto;
    @media (max-width: 750px) {
      gap: 10px;
    }
    .boxProduct {
      flex: 1 1 calc(25% - 15px);
      @media (max-width: 750px) {
        flex: 1 0 120px;
      }
    }
  }
}
</style>
