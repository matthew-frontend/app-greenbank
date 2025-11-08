<template>
  <VContainer max-width="1240" class="cart-page">
    <v-row class="cart-header-row">
      <!-- Left: Back Link -->
      <v-col cols="12" md="7">
        <div class="back-link" @click="$router.push('/')">
          <VIcon icon="mdi-chevron-left" size="small" color="#0066ff" />
          เลือกซื้อสินค้าต่อเติม
        </div>
      </v-col>

      <!-- Right: Title -->
      <v-col cols="12" md="5">
        <div class="cart-title-section">
          <h1 class="page-title">ตะกร้าของฉัน</h1>
          <p class="item-count">{{ cartCount }} รายการ</p>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <!-- Left Column - Cart Items -->
      <v-col cols="12" md="7">
        <!-- Empty Cart -->
        <div v-if="cartItems.length === 0" class="empty-cart">
          <VIcon icon="mdi-cart-outline" size="100" color="grey" />
          <p>ตะกร้าสินค้าว่างเปล่า</p>
          <VBtn color="primary" class="btn-shop" @click="$router.push('/')">
            เลือกซื้อสินค้า
          </VBtn>
        </div>

        <!-- Cart Items -->
        <div v-else class="cart-items-list">
          <div
            v-for="item in cartItems"
            :key="item.product.id"
            class="cart-item-row"
          >
            <div class="item-info">
              <img
                :src="item.product.image"
                :alt="item.product.name"
                class="item-image"
              />
              <div class="item-text">
                <h3 class="item-name">{{ item.product.name }}</h3>
                <div class="item-price">
                  ฿{{ item.product.realPrice.toLocaleString() }}
                </div>
              </div>
            </div>

            <div class="item-actions">
              <VSelect
                :model-value="item.quantity"
                :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                density="compact"
                variant="outlined"
                hide-details
                class="quantity-select"
                @update:model-value="
                  (val) => updateQuantity(item.product.id, val)
                "
              />

              <div class="item-total">
                ฿{{ (item.product.realPrice * item.quantity).toLocaleString() }}
              </div>

              <VBtn
                variant="text"
                size="small"
                class="remove-btn"
                @click="removeFromCart(item.product.id)"
              >
                ลบออก
              </VBtn>
            </div>
          </div>
        </div>

        <!-- Discount Code -->
        <div v-if="cartItems.length > 0" class="discount-section">
          <VTextField
            v-model="discountCode"
            placeholder="กรอก โค้ดส่วนลด (ถ้ามี)"
            variant="outlined"
            density="comfortable"
            hide-details
          >
            <template v-slot:append-inner class="py-0">
              <VIcon icon="mdi-arrow-right" class="py-0" />
            </template>
          </VTextField>
        </div>
      </v-col>

      <!-- Right Column - Summary -->
      <v-col cols="12" md="5">
        <div v-if="cartItems.length > 0" class="summary-card">
          <div class="summary-header">
            <h2 class="summary-title">
              ราคาสุทธิ ฿{{ grandTotal.toLocaleString() }}
            </h2>
            <p class="vat-note">รวมภาษีมูลค่า</p>
          </div>
          <div class="summary-details">
            <div class="summary-row">
              <span>รวมราคาสินค้า</span>
              <span>฿{{ cartTotal.toLocaleString() }}</span>
            </div>
            <div class="summary-row">
              <span>ค่าส่งสินค้า</span>
              <span>฿{{ shippingFee.toLocaleString() }}</span>
            </div>
            <div class="summary-row total-row">
              <span>ราคาสุทธิ</span>
              <span>฿{{ grandTotal.toLocaleString() }}</span>
            </div>
          </div>

          <VTextarea
            v-model="note"
            placeholder="เพิ่มข้อความถึงร้านค้า"
            variant="outlined"
            rows="3"
            hide-details
            class="note-textarea"
          />

          <!-- <div class="continue-link" @click="$router.push('/')">
            <VIcon icon="mdi-chevron-left" size="small" />
            เลือกซื้อสินค้าต่อเติม
          </div> -->

          <VBtn
            color="primary"
            size="x-large"
            block
            class="checkout-btn-bottom"
            @click="goToCheckout"
          >
            เริ่มสั่งซื้อ
          </VBtn>
        </div>
      </v-col>
    </v-row>
  </VContainer>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart } =
  useCart();

const discountCode = ref("");
const note = ref("");
const shippingFee = ref(50);

const grandTotal = computed(() => {
  return cartTotal.value + shippingFee.value;
});

const goToCheckout = () => {
  router.push("/checkout");
};

useHead({
  title: "ตะกร้าสินค้า",
});
</script>

<style lang="scss" scoped>
.cart-page {
  padding: 40px 20px;
  max-width: 1240px;
}

.cart-header-row {
  margin-bottom: 20px;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #0066ff;
  font-size: 14px;
  cursor: pointer;
  width: fit-content;
}

.cart-title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .page-title {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }

  .item-count {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;

  p {
    margin: 20px 0;
    font-size: 18px;
    color: #666;
  }
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cart-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;

  .item-info {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;

    .item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
      flex-shrink: 0;
    }

    .item-text {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .item-name {
        font-size: 16px;
        font-weight: 400;
        margin: 0;
        color: #000;
      }

      .item-price {
        font-size: 16px;
        font-weight: 500;
        color: #000;
      }

      .item-extra {
        font-size: 12px;
        color: #0066ff;
        cursor: pointer;
      }
    }
  }

  .item-actions {
    display: flex;
    align-items: center;
    gap: 16px;

    .quantity-select {
      width: 100px;

      :deep(.v-input__control) {
        min-height: 40px;
      }

      :deep(.v-field) {
        border-radius: 12px;
      }

      :deep(.v-field__input) {
        padding: 8px 12px;
      }
    }

    .item-total {
      font-size: 16px;
      font-weight: 500;
      min-width: 100px;
      text-align: right;
    }

    .remove-btn {
      color: #0066ff;
      text-transform: none;
      font-size: 14px;
      min-width: auto;
      padding: 0 8px;
    }
  }
}

.discount-section {
  padding-top: 32px;

  :deep(.v-field) {
    border-radius: 4px;
  }
}

.summary-card {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 24px;
  position: sticky;
  top: 100px;

  .summary-header {
    margin-bottom: 20px;

    .summary-title {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 4px 0;
      color: #000;
    }

    .vat-note {
      font-size: 12px;
      color: #666;
      margin: 0;
    }
  }

  .summary-details {
    padding: 20px 0;
    margin-bottom: 20px;

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 14px;
      color: #666;

      &.total-row {
        font-size: 16px;
        font-weight: 600;
        color: #000;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #e0e0e0;
        margin-bottom: 0;
      }
    }
  }

  .note-textarea {
    margin-bottom: 20px;

    :deep(.v-field) {
      border-radius: 4px;
      background: #fff;
    }
  }

  .continue-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: #0066ff;
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 16px;
    padding: 8px;
  }

  .checkout-btn-bottom {
    background-color: $green;
    text-transform: none;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 24px;
    height: 48px !important;
    box-shadow: none;
    &:hover {
    }
    :deep(span.v-btn__content) {
      color: #fff;
    }
  }
}
.btn-shop {
  max-width: 220px;
  width: 100%;
  background: linear-gradient(135deg, #0066ff 0%, #0052cc 100%) !important;
  text-transform: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;
  height: 48px !important;
  box-shadow: 0 2px 8px rgba(0, 102, 255, 0.3);

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 102, 255, 0.4);
  }
  :deep(span.v-btn__content) {
    color: #fff;
  }
}

@media (max-width: 960px) {
  .cart-title-section {
    margin-top: 16px;
  }

  .cart-item-row {
    flex-direction: column;
    gap: 16px;

    .item-actions {
      width: 100%;
      justify-content: space-between;
    }
  }
}
</style>
