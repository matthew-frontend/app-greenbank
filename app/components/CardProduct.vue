<template>
  <NuxtLink
    :to="productUrl"
    class="boxProduct"
    :aria-label="props.product.name"
  >
    <div class="imageProduct">
      <img :src="productImage" :alt="props.product.name" />
      <div v-if="props.product.discount" class="productTag">
        {{ props.product.discount }}%
      </div>
      <div class="addCartProduct" @click.stop.prevent="handleAddToCart">
        <VIcon icon="mdi-cart-outline" size="20" color="#000" />
      </div>
    </div>
    <div class="detailProduct">
      <div class="nameProduct">{{ props.product.name }}</div>
      <div class="priceProduct" :class="{ hasDiscount }">
        <div class="realPrice">
          <span class="unit">฿ </span>
          {{ formatCurrency(props.product.realPrice) }}
        </div>
        <div v-if="hasDiscount" class="fullPrice">
          <span class="unit">฿ </span>
          {{ formatCurrency(props.product.fullPrice) }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const currencyFormatter = new Intl.NumberFormat("th-TH", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// Get product image - use first image from images array if available, otherwise use image field
const productImage = computed(() => {
  const { images, image } = props.product;
  // If images array exists and has items, use the first one
  if (images && Array.isArray(images) && images.length > 0) {
    return images[0];
  }
  // Otherwise use the image field
  return image;
});

// Generate product URL from category and slug
const productUrl = computed(() => {
  const { category, slug, href } = props.product;
  // Support both old href format and new category/slug format
  if (href) return href;
  if (category && slug) return `/products/${category}/${slug}`;
  return "/";
});

const hasDiscount = computed(() => {
  const { realPrice, fullPrice } = props.product;
  if (fullPrice == null || realPrice == null) return false;
  return Number(fullPrice) > Number(realPrice);
});

const formatCurrency = (value) => {
  if (value == null || value === "") return "";
  return currencyFormatter.format(Number(value));
};

// Use cart composable
const { addToCart } = useCart();

// Handle add to cart
const handleAddToCart = (event) => {
  // ป้องกันไม่ให้ไปที่หน้าสินค้า
  event.preventDefault();
  event.stopPropagation();

  addToCart(props.product, 1);
};
</script>

<style scoped lang="scss">
.boxProduct {
  transition: all 0.5s ease;
  &:hover {
    .imageProduct {
      img {
        transform: scale(1.05);
        filter: brightness(85%);
      }
    }
    .addCartProduct {
      opacity: 1 !important;
    }
  }
  .imageProduct {
    position: relative;
    display: block;
    border-radius: 4px;
    padding-top: 133.33%;
    overflow: hidden;
    img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 1s, filter 0.5s ease, -webkit-transform 1s,
        -webkit-filter 0.5s ease;
    }
    .productTag {
      position: absolute;
      top: 10px;
      right: 10px;
      min-width: 32px;
      height: 20px;
      background-color: #c91f28;
      color: #fff;
      font-size: 11px;
      line-height: 20px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .addCartProduct {
      width: 54px;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      position: absolute;
      bottom: 10px;
      right: 10px;
      border-radius: 50%;
      transition: all 0.5s ease;
      opacity: 0;
      cursor: pointer;

      &:hover {
        background-color: #d49f4d;
        :deep(.v-icon) {
          color: #fff !important;
        }
      }
    }
  }

  .detailProduct {
    padding: 12px 0;
    .nameProduct {
      font-size: 14px;
    }
    .priceProduct {
      padding: 5px 0;
      .realPrice {
        font-size: 18px;
        color: #000;
        font-weight: 500;
        .unit {
          color: #000;
        }
        @media (max-width: 767px) {
          font-size: 16px;
        }
      }
      &.hasDiscount {
        display: flex;
        align-items: center;
        gap: 8px;
        .realPrice {
          color: #d49f4d;
          .unit {
            color: #d49f4d;
          }
        }
        .fullPrice {
          font-size: 13px;
          color: rgb(179, 179, 179);
          text-decoration: line-through;
          font-weight: 400;
          .unit {
            color: rgb(179, 179, 179);
          }
          @media (max-width: 767px) {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
