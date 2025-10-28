<template>
  <VContainer max-width="1240" class="product-detail-page">
    <BreadCrumbs :items="breadcrumbs" />

    <v-row class="product-content">
      <!-- Left Column - Image Gallery -->
      <v-col cols="12" md="6" class="product-gallery">
        <div class="main-image">
          <img :src="selectedImage" :alt="product.name" />
        </div>
        <div class="thumbnail-gallery">
          <div
            v-for="(img, index) in productImages"
            :key="index"
            class="thumbnail"
            :class="{ active: selectedImage === img }"
            @click="selectedImage = img"
          >
            <img :src="img" :alt="`${product.name} ${index + 1}`" />
          </div>
        </div>
      </v-col>

      <!-- Right Column - Product Info -->
      <v-col cols="12" md="6" class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>

        <div class="product-meta">
          <span class="sku">SKU: {{ productSku }}</span>
          <span class="stock">คงเหลือ: {{ productStock }}</span>
        </div>

        <p class="product-description">{{ product.description }}</p>

        <!-- Tags -->
        <div class="product-tags">
          <h3 class="tags-title">หมวดหมู่:</h3>
          <div class="tags-list">
            <VBtn
              v-for="tag in productTags"
              :key="tag"
              size="small"
              class="tag-btn"
            >
              {{ tag }}
            </VBtn>
          </div>
        </div>

        <!-- Size/Variant Selection -->
        <div class="product-variants">
          <h3 class="variants-title">กรุณาเลือกขนาด:</h3>
          <div class="variant-options">
            <div
              v-for="variant in productVariants"
              :key="variant.size"
              class="variant-option"
              :class="{ active: selectedVariant?.size === variant.size }"
              @click="selectedVariant = variant"
            >
              <span class="variant-size">{{ variant.size }}</span>
              <span class="variant-price">฿{{ variant.price.toLocaleString() }}</span>
            </div>
          </div>
        </div>

        <!-- Add to Cart Button -->
        <VBtn
          color="success"
          size="x-large"
          block
          class="add-cart-btn"
          @click="handleAddToCart"
        >
          <VIcon icon="mdi-cart-outline" start />
          เพิ่มใส่ตะกร้า ฿{{ selectedVariant?.price.toLocaleString() || product.realPrice.toLocaleString() }}
        </VBtn>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <VBtn
            color="lime-darken-1"
            size="large"
            class="action-btn"
          >
            ซื้อไปแล้ว
          </VBtn>
          <VBtn
            color="orange"
            size="large"
            class="action-btn"
          >
            สั่งซอบ
          </VBtn>
        </div>
      </v-col>
    </v-row>

    <!-- Related Products Section -->
    <div class="related-products">
      <h2 class="section-title">สินค้าที่เกี่ยวข้อง</h2>
      <div class="related-grid">
        <CardProduct
          v-for="item in related"
          :key="item.id"
          :product="item"
        />
      </div>
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  getProductBySlug,
  getRelatedProducts,
  categories,
} from "~/data/products.js";

const route = useRoute();
const category = route.params.category as string;
const slug = route.params.slug as string;

// Get product data from centralized data
const productData = getProductBySlug(slug);

// If product not found, show error or redirect
if (!productData) {
  throw createError({
    statusCode: 404,
    statusMessage: "Product not found",
  });
}

const product = ref(productData);

// Product images (using main image + duplicates for demo, can be from product data)
const productImages = computed(() => {
  const images = product.value.images || [product.value.image];
  // If no multiple images, create array with main image repeated for gallery demo
  if (images.length === 1) {
    return [images[0], images[0], images[0], images[0], images[0]];
  }
  return images;
});

const selectedImage = ref(productImages.value[0]);

// Mock data for demo (should come from product data)
const productSku = computed(() => product.value.sku || "E14");
const productStock = computed(() => product.value.stock || 1000);
const productTags = computed(() =>
  product.value.tags || ["สีน้ำ", "ผลไม้", "เมล็ดกาแฟ", "ทราบ", "orange", "fruit", "sour", "sweet"]
);

// Variants/Sizes (should come from product data)
const productVariants = computed(() =>
  product.value.variants || [
    { size: "1กรัม", price: 20 },
    { size: "10กรัม", price: 180 },
    { size: "50กรัม", price: 800 },
    { size: "100กรัม", price: 1400 },
  ]
);

const selectedVariant = ref(productVariants.value[0]);

// Get related products from the same category
const related = computed(() =>
  getRelatedProducts(product.value.id, product.value.category, 4)
);

// Get category label
const categoryData = categories.find((cat) => cat.value === category);
const categoryTitle = categoryData ? categoryData.label : category;

// breadcrumb
const breadcrumbs = computed(() => [
  { title: "หน้าหลัก", to: "/", disabled: false, href: "/" },
  { title: categoryTitle, to: `/products/${category}`, disabled: false, href: `/products/${category}` },
  { title: product.value.name, disabled: true },
]);

// Use cart composable
const { addToCart } = useCart();

function handleAddToCart() {
  addToCart(product.value, 1);
}

useHead({
  title: `${product.value.name} | ${categoryTitle}`,
  meta: [{ name: "description", content: product.value.description }],
});
</script>

<style lang="scss" scoped>
.product-detail-page {
  padding: 40px 20px 80px;
}

.product-content {
  margin-bottom: 60px;
}

// Left Column - Gallery
.product-gallery {
  .main-image {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
    background: #f5f5f5;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .thumbnail-gallery {
    display: flex;
    gap: 12px;
    overflow-x: auto;

    .thumbnail {
      width: 80px;
      height: 80px;
      flex-shrink: 0;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.3s ease;

      &:hover,
      &.active {
        border-color: #d49f4d;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

// Right Column - Info
.product-info {
  .product-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #000;
  }

  .product-meta {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    .sku {
      font-size: 14px;
      color: #666;
    }

    .stock {
      font-size: 14px;
      color: #4caf50;
      font-weight: 600;
    }
  }

  .product-description {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .product-tags {
    margin-bottom: 24px;

    .tags-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #000;
    }

    .tags-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .tag-btn {
        background-color: #f5f5f5;
        color: #666;
        text-transform: none;
        font-size: 12px;
        border-radius: 4px;
        padding: 4px 12px;
        height: auto;
        min-height: 28px;

        :deep(.v-btn__content) {
          color: #666;
        }

        &:hover {
          background-color: #e0e0e0;
        }
      }
    }
  }

  .product-variants {
    margin-bottom: 24px;

    .variants-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #000;
    }

    .variant-options {
      display: flex;
      flex-direction: column;
      gap: 12px;

      .variant-option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        background-color: #f8f8f8;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid #e0e0e0;

        &:hover {
          background-color: #f0f0f0;
          border-color: #d0d0d0;
        }

        &.active {
          border-color: #d49f4d;
          background-color: #fff;
        }

        .variant-size {
          font-size: 16px;
          color: #000;
          font-weight: 500;
        }

        .variant-price {
          font-size: 18px;
          color: #000;
          font-weight: 600;
        }
      }
    }
  }

  .add-cart-btn {
    margin-bottom: 16px;
    background: linear-gradient(135deg, #0066ff 0%, #0052cc 100%) !important;
    color: #fff;
    text-transform: none;
    font-size: 16px;
    font-weight: 600;
    height: 56px;
    box-shadow: 0 2px 8px rgba(0, 102, 255, 0.3);

    :deep(.v-btn__content) {
      color: #fff;
    }

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 102, 255, 0.4);
    }
  }

  .action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    .action-btn {
      text-transform: none;
      font-size: 14px;
      font-weight: 500;
      height: 48px;
      background-color: #f5f5f5;
      border: 1px solid #e0e0e0;

      :deep(.v-btn__content) {
        color: #666;
      }

      &:hover {
        background-color: #e8e8e8;
      }
    }
  }
}

// Related Products
.related-products {
  padding-top: 40px;
  border-top: 1px solid #e0e0e0;

  .section-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media (max-width: 960px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
