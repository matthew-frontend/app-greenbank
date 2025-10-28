<template>
  <VNavigationDrawer
    :model-value="isOpen"
    @update:model-value="(val) => $emit('update:isOpen', val)"
    temporary
    location="right"
    class="drawerCart"
    width="480"
    :style="{
      zIndex: 1009,
      height: '100%',
      top: '0',
      backgroundColor: '#fff',
      boxShadow: 'none',
    }"
  >
    <div class="cart-container">
      <!-- Header -->
      <div class="cart-header">
        <h2>สินค้าในตะกร้า ({{ cartCount }}) รายการ</h2>
        <VBtn icon variant="text" @click="$emit('update:isOpen', false)">
          <VIcon icon="mdi-close" />
        </VBtn>
      </div>

      <!-- Cart Items -->
      <div class="cart-items" v-if="cartItems.length > 0">
        <!-- Receipt Button -->
        <div class="receipt-section">
          <VBtn variant="outlined" class="receipt-btn">
            <VIcon icon="mdi-file-document-outline" start size="small" />
            ขอใบเสร็จ / ใบกำกับภาษีได้
          </VBtn>
        </div>

        <!-- Product List -->
        <div v-for="item in cartItems" :key="item.product.id" class="cart-item">
          <img
            :src="item.product.image"
            :alt="item.product.name"
            class="cart-item-image"
          />
          <div class="cart-item-details">
            <h4 class="cart-item-name">{{ item.product.name }}</h4>

            <div class="cart-item-price-row">
              <div class="price-info">
                <span class="current-price"
                  >{{ item.product.realPrice.toLocaleString() }} บาท</span
                >
                <span v-if="item.product.fullPrice" class="original-price">
                  {{ item.product.fullPrice.toLocaleString() }} บาท
                </span>
              </div>
              <div class="cart-item-quantity">
                <VBtn
                  size="small"
                  variant="text"
                  class="qty-btn"
                  @click="
                    item.quantity === 1
                      ? removeFromCart(item.product.id)
                      : updateQuantity(item.product.id, item.quantity - 1)
                  "
                >
                  <VIcon
                    v-if="item.quantity === 1"
                    icon="mdi-delete-outline"
                    size="14"
                  />
                  <span v-else>-</span>
                </VBtn>
                <span class="quantity-text">{{ item.quantity }}</span>
                <VBtn
                  size="small"
                  variant="text"
                  class="qty-btn"
                  @click="updateQuantity(item.product.id, item.quantity + 1)"
                >
                  +
                </VBtn>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="cart-empty">
        <VIcon icon="mdi-cart-outline" size="80" color="grey" />
        <p>ตะกร้าสินค้าว่างเปล่า</p>
      </div>

      <!-- Footer -->
      <div class="cart-footer" v-if="cartItems.length > 0">
        <div class="cart-summary">
          <div class="summary-row">
            <div class="summary-label">
              <span>รวมราคาสินค้า</span>
              <span class="item-count">{{ cartCount }} รายการ</span>
            </div>
            <div>
              <span class="summary-price"
                >฿ {{ cartTotal.toLocaleString() }}</span
              >
              <p class="summary-note">ราคาไม่รวมค่าจัดส่ง</p>
              <p class="summary-note">รวมภาษีมูลค่าเพิ่มแล้ว</p>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-button">
        <div class="action-buttons">
          <VBtn
            variant="black"
            size="large"
            class="checkout-btn"
            @click="goToCart"
          >
            ดูสินค้าในตะกร้า
          </VBtn>
          <VBtn
            color="black"
            size="large"
            class="checkout-btn"
            @click="goToCheckout"
          >
            เริ่มการสั่งซื้อ
          </VBtn>
        </div>

        <div class="continue-shopping" @click="$emit('update:isOpen', false)">
          <VIcon icon="mdi-chevron-left" start size="small" />
          เลือกสินค้าต่อ
        </div>
      </div>
    </div>
  </VNavigationDrawer>
</template>

<script setup>
// Props
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

// Emits
const emit = defineEmits(["update:isOpen"]);

// Router
const router = useRouter();

// Use cart composable
const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart } =
  useCart();

// Navigate to cart page
const goToCart = () => {
  emit("update:isOpen", false);
  router.push("/cart");
};

// Navigate to checkout page (can implement later)
const goToCheckout = () => {
  emit("update:isOpen", false);
  router.push("/checkout");
};
</script>

<style lang="scss" scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
  }
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.receipt-section {
  margin-bottom: 20px;

  .receipt-btn {
    border: 1px solid #000;
    border-radius: 24px;
    text-transform: none;
    font-size: 14px;
    color: #000;
    padding: 0 20px;
  }
}

.cart-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  .cart-item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .cart-item-details {
    flex: 1;
    display: flex;
    flex-direction: column;

    .cart-item-name {
      font-size: 16px;
      font-weight: 500;
      color: #000;
      margin-bottom: 10px;
    }

    .cart-item-price-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .price-info {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .current-price {
          font-size: 18px;
          font-weight: 500;
          color: #d49f4d;
        }

        .original-price {
          font-size: 12px;
          color: #999;
          text-decoration: line-through;
        }
      }
    }

    .cart-item-quantity {
      display: flex;
      align-items: center;
      gap: 4px;

      .qty-btn {
        min-width: 30px;
        width: 30px;
        height: 30px;
        background-color: #f5f5f5;
        border-radius: 50%;
        font-size: 12px;
        font-weight: 300;

        &:hover {
          background-color: #e0e0e0;
        }
      }

      .quantity-text {
        min-width: 30px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}

.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px;
  text-align: center;

  p {
    margin-top: 16px;
    font-size: 16px;
    color: #666;
  }
}

.cart-footer {
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding: 12px 20px;
  background-color: #fff;

  .cart-summary {
    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .summary-label {
        display: flex;
        flex-direction: column;
        font-size: 16px;
        font-weight: 700;

        .item-count {
          font-size: 12px;
          font-weight: 400;
          color: #666;
        }
      }

      .summary-price {
        font-size: 24px;
        font-weight: 700;
        color: #000;
      }
    }

    .summary-note {
      font-size: 11px;
      color: #999;
      margin: 0;
      text-align: right;
    }
  }
}

.cart-button {
  padding: 20px;

  .action-buttons {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;

    .checkout-btn {
      background-color: #000;
      text-transform: none;
      font-size: 16px;
      font-weight: 500;
      border-radius: 24px;
      flex-basis: 47.5%;
      :deep(span.v-btn__content) {
        color: #fff;
        &:hover {
          color: $primary;
        }
      }
    }
  }

  .continue-shopping {
    width: 100%;
    text-transform: none;
    font-size: 16px;
    font-weight: 600;
    color: #000;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    :deep(.v-btn__content) {
      justify-content: center;
    }
    i {
      transition: all 0.3s ease;
    }
    &:hover {
      color: $primary;
      i {
        color: $primary;
      }
    }
  }
}
</style>

<style lang="scss">
.v-navigation-drawer.drawerCart {
  @media (max-width: 999px) {
    width: 360px !important;
  }
}
</style>
