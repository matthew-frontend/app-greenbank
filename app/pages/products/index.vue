<template>
  <VContainer max-width="1240" class="products-page">
    <BreadCrumbs :items="breadcrumbs" />

    <div class="page-header">
      <h1 class="page-title">สินค้าทั้งหมด</h1>
      <p class="page-description">เลือกดูสินค้าคุณภาพจากทุกหมวดหมู่</p>
    </div>

    <!-- Category Filter -->
    <div class="category-filter">
      <VBtn
        v-for="cat in categoriesWithAll"
        :key="cat.value"
        :variant="selectedCategory === cat.value ? 'elevated' : 'outlined'"
        :color="selectedCategory === cat.value ? 'primary' : 'default'"
        class="category-btn"
        @click="selectedCategory = cat.value"
      >
        {{ cat.label }}
      </VBtn>
    </div>

    <!-- Products Grid -->
    <div class="gridProduct">
      <CardProduct
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Empty State -->
    <div v-if="filteredProducts.length === 0" class="empty-state">
      <VIcon icon="mdi-package-variant" size="80" color="grey" />
      <p>ไม่พบสินค้าในหมวดหมู่นี้</p>
    </div>
  </VContainer>
</template>

<script setup>
import { ref, computed } from "vue";
import { products, categories } from "~/data/products.js";

const selectedCategory = ref("all");

// Add "All" option to categories
const categoriesWithAll = computed(() => [
  { label: "ทั้งหมด", value: "all" },
  ...categories,
]);

// Filter products by selected category
const filteredProducts = computed(() => {
  if (selectedCategory.value === "all") {
    return products;
  }
  return products.filter((p) => p.category === selectedCategory.value);
});

// Breadcrumbs
const breadcrumbs = [
  { title: "หน้าหลัก", disabled: false, href: "/" },
  { title: "สินค้าทั้งหมด", disabled: true },
];

// SEO
useHead({
  title: "สินค้าทั้งหมด - ค้นหาสินค้าคุณภาพ",
  meta: [
    {
      name: "description",
      content:
        "เลือกซื้อสินค้าคุณภาพจากทุกหมวดหมู่ ราคาพิเศษ มีให้เลือกหลากหลาย",
    },
  ],
});
</script>

<style lang="scss" scoped>
.products-page {
  padding: 40px 20px 80px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;

  .page-title {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #000;

    @media (max-width: 768px) {
      font-size: 28px;
    }
  }

  .page-description {
    font-size: 18px;
    color: #666;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 40px;

  .category-btn {
    text-transform: none;
    font-size: 14px;
    font-weight: 500;
    border-radius: 24px;
    padding: 0 24px;

    @media (max-width: 768px) {
      font-size: 13px;
      padding: 0 16px;
    }
  }
}

.gridProduct {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  .boxProduct {
    flex-basis: calc(20% - 20px);
    @media (max-width: 991px) {
      flex-basis: calc(33.333333% - 20px);
    }
    @media (max-width: 767px) {
      flex-basis: calc(50% - 20px);
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;

  p {
    margin-top: 20px;
    font-size: 18px;
    color: #666;
  }
}
</style>
