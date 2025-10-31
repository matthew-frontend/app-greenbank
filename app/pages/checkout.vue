<template>
  <div class="checkout-page">
    <VContainer max-width="1240">
      <div class="checkout-layout">
        <v-row>
          <v-col cols="12" md="7">
            <!-- Left Column - Steps -->
            <div class="checkout-steps">
              <!-- Step 1: Contact Information -->
              <div class="checkout-step">
                <div class="step-header" @click="toggleStep(1)">
                  <div class="step-number">1</div>
                  <h2 class="step-title">การติดต่อ</h2>
                  <VIcon
                    :icon="
                      activeStep === 1 ? 'mdi-chevron-up' : 'mdi-chevron-down'
                    "
                    class="toggle-icon"
                  />
                </div>

                <div v-show="activeStep === 1" class="step-content">
                  <p class="step-description">
                    กรอกข้อมูลส่งการยืนยันแจ้งยังยังขึ้นเอก
                  </p>

                  <div class="login-link">
                    <VIcon icon="mdi-login" size="20" />
                    <NuxtLink to="/login">เข้าสู่ระบบ</NuxtLink>
                  </div>

                  <v-row>
                    <v-col cols="12" md="6">
                      <VTextField
                        v-model="contact.phone"
                        label="เบอร์มือถือ"
                        variant="outlined"
                        density="comfortable"
                        hide-details
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <VTextField
                        v-model="contact.email"
                        label="อีเมล"
                        variant="outlined"
                        density="comfortable"
                        hide-details
                      />
                    </v-col>
                  </v-row>

                  <div class="step-actions">
                    <VBtn
                      variant="text"
                      class="back-btn"
                      @click="$router.push('/cart')"
                    >
                      <VIcon icon="mdi-chevron-left" start />
                      เลือกซื้อสินค้าเพิ่ม
                    </VBtn>
                    <VBtn size="large" class="next-btn" @click="nextStep">
                      ต่อไป
                    </VBtn>
                  </div>
                </div>
              </div>

              <!-- Step 2: Shipping -->
              <div class="checkout-step">
                <div class="step-header" @click="toggleStep(2)">
                  <div class="step-number">2</div>
                  <h2 class="step-title">การจัดส่ง</h2>
                  <VIcon
                    :icon="
                      activeStep === 2 ? 'mdi-chevron-up' : 'mdi-chevron-down'
                    "
                    class="toggle-icon"
                  />
                </div>

                <div v-show="activeStep === 2" class="step-content">
                  <VTextField
                    v-model="shipping.fullName"
                    label="ชื่อ-นามสกุล"
                    variant="outlined"
                    density="comfortable"
                    class="mb-4"
                  />

                  <VTextField
                    v-model="shipping.address"
                    label="ที่อยู่"
                    variant="outlined"
                    density="comfortable"
                    class="mb-4"
                  />

                  <v-row>
                    <v-col cols="12" md="6">
                      <VTextField
                        v-model="shipping.district"
                        label="ตำบล/แขวง"
                        variant="outlined"
                        density="comfortable"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <VTextField
                        v-model="shipping.amphoe"
                        label="อำเภอ/เขต"
                        variant="outlined"
                        density="comfortable"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="6">
                      <VTextField
                        v-model="shipping.province"
                        label="จังหวัด"
                        variant="outlined"
                        density="comfortable"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <VTextField
                        v-model="shipping.zipcode"
                        label="รหัสไปรษณีย์"
                        variant="outlined"
                        density="comfortable"
                      />
                    </v-col>
                  </v-row>

                  <VTextField
                    v-model="shipping.phone"
                    label="เบอร์โทรศัพท์"
                    variant="outlined"
                    density="comfortable"
                    class="mt-4"
                  />

                  <div class="step-actions">
                    <VBtn variant="text" class="back-btn" @click="prevStep">
                      <VIcon icon="mdi-chevron-left" start />
                      กลับ
                    </VBtn>
                    <VBtn size="large" class="next-btn" @click="nextStep">
                      ต่อไป
                    </VBtn>
                  </div>
                </div>
              </div>

              <!-- Step 3: Payment -->
              <div class="checkout-step">
                <div class="step-header" @click="toggleStep(3)">
                  <div class="step-number">3</div>
                  <h2 class="step-title">การชำระเงิน</h2>
                  <VIcon
                    :icon="
                      activeStep === 3 ? 'mdi-chevron-up' : 'mdi-chevron-down'
                    "
                    class="toggle-icon"
                  />
                </div>

                <div v-show="activeStep === 3" class="step-content">
                  <VRadioGroup v-model="payment.method">
                    <VRadio value="transfer" label="โอนเงินผ่านธนาคาร" />
                    <VRadio value="cod" label="เก็บเงินปลายทาง (COD)" />
                    <VRadio value="promptpay" label="พร้อมเพย์" />
                  </VRadioGroup>

                  <div class="step-actions">
                    <VBtn variant="text" class="back-btn" @click="prevStep">
                      <VIcon icon="mdi-chevron-left" start />
                      กลับ
                    </VBtn>
                    <VBtn
                      color="primary"
                      size="large"
                      class="submit-btn"
                      @click="submitOrder"
                    >
                      ยืนยันการสั่งซื้อ
                    </VBtn>
                  </div>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="5">
            <!-- Right Column - Order Summary -->
            <div class="order-summary">
              <div class="summary-header">
                <VBtn
                  variant="text"
                  size="small"
                  @click="$router.push('/cart')"
                >
                  <VIcon icon="mdi-chevron-left" start size="small" />
                  ตะกร้า
                </VBtn>
                <VBtn
                  variant="text"
                  size="small"
                  color="blue"
                  @click="$router.push('/')"
                >
                  เลือกซื้อเพิ่ม
                </VBtn>
              </div>

              <div class="summary-items">
                <div
                  v-for="item in cartItems"
                  :key="item.product.id"
                  class="summary-item"
                >
                  <div class="item-image">
                    <img :src="item.product.image" :alt="item.product.name" />
                  </div>
                  <div class="item-details">
                    <h4 class="item-name">{{ item.product.name }}</h4>
                    <NuxtLink
                      :to="`/products/${item.product.category}/${item.product.slug}`"
                      class="item-link"
                    >
                      หมายเหตุสินค้า
                    </NuxtLink>
                    <div class="item-footer">
                      <VSelect
                        :model-value="item.quantity"
                        :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                        variant="outlined"
                        density="compact"
                        hide-details
                        class="quantity-select"
                        @update:model-value="
                          (val) => updateQuantity(item.product.id, val)
                        "
                      />
                      <span class="item-price"
                        >฿{{
                          (
                            item.product.realPrice * item.quantity
                          ).toLocaleString()
                        }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="discount-section">
                <VTextField
                  v-model="discountCode"
                  placeholder="กรอก โค้ดส่วนลด (ถ้ามี)"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                >
                  <template v-slot:append-inner>
                    <VIcon icon="mdi-arrow-right" />
                  </template>
                </VTextField>
              </div>

              <div class="summary-totals">
                <div class="total-row">
                  <span>รวมราคาสินค้า</span>
                  <span>฿{{ cartTotal.toLocaleString() }}</span>
                </div>
                <div class="total-row">
                  <span>ค่าส่งสินค้า</span>
                  <span>฿{{ shippingFee.toLocaleString() }}</span>
                </div>
                <div class="total-row grand-total">
                  <span>ราคาสุทธิ</span>
                  <span>฿{{ grandTotal.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </VContainer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const { cartItems, cartTotal, updateQuantity } = useCart();

const activeStep = ref(1);
const discountCode = ref("");
const shippingFee = ref(50);

const contact = ref({
  phone: "",
  email: "",
  subscribe: false,
});

const shipping = ref({
  fullName: "",
  address: "",
  district: "",
  amphoe: "",
  province: "",
  zipcode: "",
  phone: "",
});

const payment = ref({
  method: "transfer",
});

const grandTotal = computed(() => {
  return cartTotal.value + shippingFee.value;
});

const toggleStep = (step) => {
  activeStep.value = activeStep.value === step ? 0 : step;
};

const nextStep = () => {
  if (activeStep.value < 3) {
    activeStep.value++;
  }
};

const prevStep = () => {
  if (activeStep.value > 1) {
    activeStep.value--;
  }
};

const submitOrder = () => {
  console.log("Order submitted", { contact, shipping, payment });
  alert("ยืนยันการสั่งซื้อเรียบร้อย");
};

useHead({
  title: "ชำระเงิน - Checkout",
});
</script>

<style lang="scss" scoped>
.checkout-page {
  background-color: #fff;
  min-height: 100vh;
  padding: 40px 0;
}

.checkout-steps {
  .brand-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;

    .brand-logo {
      width: 40px;
      height: 40px;
    }

    .brand-name {
      font-size: 18px;
      font-weight: 600;
    }
  }
}

.checkout-step {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;

  .step-header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    cursor: pointer;
    background-color: #fff;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f8f8f8;
    }

    .step-number {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #000;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      flex-shrink: 0;
    }

    .step-title {
      font-size: 18px;
      font-weight: 600;
      flex: 1;
      margin: 0;
    }

    .toggle-icon {
      color: #666;
    }
  }

  .step-content {
    padding: 20px;
    border-top: 1px solid #e0e0e0;

    .step-description {
      font-size: 14px;
      color: #666;
      margin-bottom: 16px;
    }

    .login-link {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      color: #0066ff;
      font-size: 14px;

      a {
        color: #0066ff;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .checkbox-label {
      display: flex;
      align-items: center;
    }

    .step-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
      gap: 16px;

      .back-btn {
        text-transform: none;
        color: #0066ff;
        font-size: 14px;
      }

      .next-btn,
      .submit-btn {
        max-width: 220px;
        width: 100%;
        background: linear-gradient(
          135deg,
          #0066ff 0%,
          #0052cc 100%
        ) !important;
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

      .submit-btn {
        background: linear-gradient(
          135deg,
          #0066ff 0%,
          #0052cc 100%
        ) !important;
        box-shadow: 0 2px 8px rgba(0, 102, 255, 0.3);

        :deep(.v-btn__content) {
          color: #fff;
        }
      }
    }
  }
}

.order-summary {
  background-color: #f8f8f8;
  border-radius: 12px;
  padding: 20px;
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;

  @media (max-width: 1024px) {
    position: relative;
    top: 0;
    max-height: none;
  }

  .summary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e0e0e0;

    button {
      text-transform: none;
      font-size: 14px;
    }
  }

  .summary-items {
    margin-bottom: 20px;

    .summary-item {
      display: flex;
      gap: 12px;
      padding: 16px 0;
      border-bottom: 1px solid #e0e0e0;

      &:last-child {
        border-bottom: none;
      }

      .item-image {
        width: 80px;
        height: 80px;
        flex-shrink: 0;
        border-radius: 12px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .item-details {
        flex: 1;

        .item-name {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
          color: #000;
        }

        .item-link {
          font-size: 12px;
          color: #0066ff;
          text-decoration: none;
          display: block;
          margin-bottom: 8px;

          &:hover {
            text-decoration: underline;
          }
        }

        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .quantity-select {
            max-width: 100px;

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

          .item-price {
            font-size: 16px;
            font-weight: 600;
            color: #000;
          }
        }
      }
    }
  }

  .discount-section {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;

    :deep(.v-field) {
      border-radius: 12px;
      background: #fff;
    }
  }

  .summary-totals {
    margin-bottom: 16px;

    .total-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 14px;
      color: #666;

      &.grand-total {
        font-size: 20px;
        font-weight: 700;
        color: #000;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #e0e0e0;
      }
    }
  }
}
</style>
