<template>
  <VContainer max-width="1240" class="py-0">
    <BreadCrumbs :items="breadcrumbs" />
    <h1 class="headline">{{ categoryTitle }}</h1>
    <div class="gridProduct">
      <CardProduct
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </VContainer>
</template>

<script setup>
import { computed } from "vue";
import { getProductsByCategory, categories } from "~/data/products.js";

const route = useRoute();
const category = route.params.category;

// Get category label from categories data
const categoryData = categories.find((cat) => cat.value === category);
const categoryTitle = categoryData
  ? categoryData.label
  : category.charAt(0).toUpperCase() + category.slice(1);

// Get products for this category from centralized data
const products = computed(() => getProductsByCategory(category));

// Breadcrumbs
const breadcrumbs = computed(() => [
  { title: "Home", to: "/" },
  { title: "Products", to: "/products" },
  { title: categoryTitle, disabled: true },
]);
</script>

<!-- scoped ใช้สำหรับหน้านี้หน้าเดียว  -->
<style scoped>
.headline {
  text-align: center;
  margin-bottom: 20px;
}
.gridProduct {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  @media (max-width: 991px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
