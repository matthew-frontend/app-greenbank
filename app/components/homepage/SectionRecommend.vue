<template>
  <section class="section-recommend">
    <VContainer max-width="1240">
      <h2>Our Recommend</h2>
      <div class="gridRecommend">
        <div class="left">
          <v-tabs
            v-model="tab"
            class="category-tabs"
            color="primary"
            hide-slider
            direction="vertical"
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
        </div>
        <div class="right">
          <div class="imageReccommend">
            <img
              src="https://gg.lnwfile.com/_webp_max_images/2048/2048/v7/i9/a5.webp"
              alt=""
            />
          </div>
        </div>
      </div>
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
import { categories, getProductsByCategory } from "~/data/products.js";
const tabs = categories;
const tab = ref(tabs[0].value);

const productsByCategory = computed(() => {
  const grouped = {};
  categories.forEach((cat) => {
    grouped[cat.value] = getProductsByCategory(cat.value);
  });
  return grouped;
});
</script>

<style scoped lang="scss">
.section-recommend {
  padding: 80px 0 100px;
  h2 {
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 28px;
  }
  .gridRecommend {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    @media (max-width: 767px) {
      flex-direction: column;
      gap: 30px;
      margin-bottom: 30px;
    }
    .left {
      flex-basis: 25%;
      @media (max-width: 767px) {
        order: 2;
      }
    }
    .right {
      flex-basis: 75%;
      .imageReccommend {
        width: 100%;
        height: 100%;
        line-height: 0;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .category-tabs {
    .category-tab {
      font-size: 16px;
      background-color: #f4f4f4;
      letter-spacing: 0;
      margin-bottom: 10px;
      font-weight: 500;
      height: 62px;
      &:last-child {
        margin-bottom: 0;
      }
      @media (max-width: 991px) {
        height: 50px;
        font-size: 14px;
      }
      @media (max-width: 767px) {
        background-color: transparent;
        padding: 0;
        min-width: inherit;
        font-size: 13px;
        height: auto;
        margin-bottom: 0;
      }
    }
    :deep(.v-slide-group__content) {
      .v-tab-item--selected {
        background-color: $primary;
        @media (max-width: 767px) {
          background-color: transparent;
        }
        span.v-btn__content {
          font-weight: 600;
          color: #fff;
          @media (max-width: 767px) {
            color: $primary;
          }
        }
      }
      .v-btn__overlay {
        background-color: transparent !important;
      }
    }
    :deep(.v-slide-group__content) {
      @media (max-width: 767px) {
        flex-direction: row;
        gap: 14px;
        overflow-x: auto;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */

        &::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
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
      flex-basis: 25%;
      @media (max-width: 750px) {
        flex: 1 0 120px;
      }
    }
  }
}
</style>
