<template>
  <VContainer max-width="1240" class="product-detail-page">
    <BreadCrumbs :items="breadcrumbs" />

    <v-row class="product-content">
      <!-- Left Column - Image Gallery & Details -->
      <v-col cols="12" md="6" class="product-gallery-col">
        <div class="product-gallery">
          <!-- Main Swiper -->
          <Swiper
            :modules="modules"
            :loop="true"
            :spaceBetween="10"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper }"
            class="main-swiper"
          >
            <SwiperSlide v-for="(img, index) in productImages" :key="index">
              <div class="main-image">
                <img :src="img" :alt="`${product.name} ${index + 1}`" />
              </div>
            </SwiperSlide>
          </Swiper>

          <!-- Thumbs Swiper -->
          <Swiper
            :modules="modules"
            :loop="true"
            :spaceBetween="12"
            :slidesPerView="5"
            :watchSlidesProgress="true"
            :freeMode="true"
            @swiper="setThumbsSwiper"
            class="thumbs-swiper"
          >
            <SwiperSlide v-for="(img, index) in productImages" :key="index">
              <div class="thumbnail">
                <img :src="img" :alt="`${product.name} ${index + 1}`" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <!-- Collapse Sections -->
        <VExpansionPanels class="product-details-accordion" variant="accordion">
          <VExpansionPanel>
            <VExpansionPanelTitle class="accordion-title">
              รายละเอียด
              <template v-slot:actions="{ expanded }">
                <VIcon
                  :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                />
              </template>
            </VExpansionPanelTitle>
            <VExpansionPanelText class="accordion-content">
              <!-- เนื้อหารายละเอียด - จะใส่ภายหลัง -->
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle class="accordion-title">
              วิธีจัดส่ง
              <template v-slot:actions="{ expanded }">
                <VIcon
                  :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                />
              </template>
            </VExpansionPanelTitle>
            <VExpansionPanelText class="accordion-content">
              <!-- เนื้อหาวิธีจัดส่ง - จะใส่ภายหลัง -->
            </VExpansionPanelText>
          </VExpansionPanel>

          <VExpansionPanel>
            <VExpansionPanelTitle class="accordion-title">
              วิธีสั่งซื้อ
              <template v-slot:actions="{ expanded }">
                <VIcon
                  :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                />
              </template>
            </VExpansionPanelTitle>
            <VExpansionPanelText class="accordion-content">
              <!-- เนื้อหาวิธีสั่งซื้อ - จะใส่ภายหลัง -->
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
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
              <span class="variant-price"
                >฿{{ variant.price.toLocaleString() }}</span
              >
            </div>
          </div>
        </div>

        <!-- Add to Cart Button -->
        <VBtn
          color="primary"
          size="x-large"
          block
          class="add-cart-btn"
          @click="handleAddToCart"
        >
          <VIcon icon="mdi-cart-outline" start color="#fff" />
          เพิ่มใส่ตะกร้า ฿{{
            selectedVariant?.price.toLocaleString() ||
            product.realPrice.toLocaleString()
          }}
        </VBtn>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <VBtn
            size="large"
            variant="outlined"
            class="action-btn continue-btn"
            @click="continueShopping"
          >
            ช็อปปิ้งต่อ
          </VBtn>
          <VBtn size="large" class="action-btn buy-now-btn" @click="buyNow">
            ซื้อเลย
          </VBtn>
        </div>
      </v-col>
    </v-row>

    <!-- Related Products Section -->
    <div class="related-products">
      <h2 class="section-title">สินค้าแนะนำ</h2>
      <div class="related-grid">
        <CardProduct v-for="item in related" :key="item.id" :product="item" />
      </div>
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import {
  getProductBySlug,
  getRelatedProducts,
  categories,
} from "~/data/products.js";

const route = useRoute();
const router = useRouter();
const category = route.params.category as string;
const slug = route.params.slug as string;

// Swiper modules
const modules = [Navigation, Thumbs, FreeMode];
const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

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

// Mock data for demo (should come from product data)
const productSku = computed(() => product.value.sku || "E14");
const productStock = computed(() => product.value.stock || 1000);
const productTags = computed(
  () =>
    product.value.tags || [
      "สีน้ำ",
      "ผลไม้",
      "เมล็ดกาแฟ",
      "ทราบ",
      "orange",
      "fruit",
      "sour",
      "sweet",
    ]
);

// Variants/Sizes (should come from product data)
const productVariants = computed(
  () =>
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
  {
    title: categoryTitle,
    to: `/products/${category}`,
    disabled: false,
    href: `/products/${category}`,
  },
  { title: product.value.name, disabled: true },
]);

// Use cart composable
const { addToCart } = useCart();

function handleAddToCart() {
  addToCart(product.value, 1);
}

function continueShopping() {
  router.push("/");
}

function buyNow() {
  // Add to cart first, then go to checkout
  addToCart(product.value, 1);
  router.push("/checkout");
}

useHead({
  title: `${product.value.name} | ${categoryTitle}`,
  meta: [{ name: "description", content: product.value.description }],
});
</script>

<style lang="scss" scoped>
.main-swiper {
  .main-image {
    height: 500px;
    margin-bottom: 25px;
    @media (max-width: 767px) {
      height: 450px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 20px !important;
    height: 20px !important;
  }
}
.product-detail-page {
  padding: 40px 20px 80px;
}

.product-content {
  margin-bottom: 60px;
}

// Left Column - Gallery & Details
.product-gallery-col {
  @media (min-width: 960px) {
    overflow-y: auto;
  }
}

.product-gallery {
  margin-bottom: 30px;
}

.product-details-accordion {
  margin-bottom: 30px;
  :deep(.v-expansion-panel__shadow) {
    box-shadow: none;
  }
  :deep(.v-expansion-panel) {
    background-color: #fff;
    border-bottom: 1px solid #e0e0e0;
    border-bottom: 0;
    border-radius: 0;
    &:first-child {
      border-top: 1px solid #e0e0e0;
    }
  }

  :deep(.v-expansion-panel-title) {
    font-size: 18px;
    font-weight: 500;
    color: #000;
    padding: 30px 0;
    min-height: auto;

    &:hover {
      background-color: unset !important;
      .v-expansion-panel-title__overlay {
        opacity: unset !important;
        background-color: unset !important;
      }
    }
  }

  :deep(.v-expansion-panel-text__wrapper) {
    padding: 20px 24px;
    color: #666;
    font-size: 14px;
    line-height: 1.6;
  }

  :deep(.v-expansion-panel-title__icon) {
    color: #d49f4d;
  }
}

// Right Column - Info
.product-info {
  position: sticky;
  top: 0;
  align-self: flex-start;

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
    max-width: 220px;
    width: 100%;
    background-color: $primary;
    text-transform: none;
    font-size: 16px;
    font-weight: 500;
    height: 48px !important;
    box-shadow: none;
    margin-bottom: 20px;
    :deep(span.v-btn__content) {
      color: #fff;
    }
  }

  .action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    .action-btn {
      width: 100%;
      text-transform: none;
      font-size: 16px;
      font-weight: 500;
      height: 48px !important;
      transition: all 0.3s ease;
    }

    .continue-btn {
      background-color: #fff !important;
      border: 1px solid #d49f4d !important;
      :deep(span.v-btn__content) {
        color: #d49f4d;
      }

      &:hover {
        background-color: #fffbf5 !important;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(212, 159, 77, 0.2);
      }
    }

    .buy-now-btn {
      background: linear-gradient(135deg, #102e19 0%, #0a1f11 100%) !important;
      box-shadow: 0 2px 8px rgba(16, 46, 25, 0.3);
      :deep(span.v-btn__content) {
        color: #fff;
      }

      &:hover {
        box-shadow: 0 4px 12px rgba(16, 46, 25, 0.4);
        transform: translateY(-1px);
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
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    .boxProduct {
      flex-basis: calc(25% - 20px);
      @media (max-width: 991px) {
        flex-basis: calc(33.333333% - 20px);
      }
      @media (max-width: 767px) {
        flex-basis: calc(50% - 20px);
      }
    }
  }
}
</style>
